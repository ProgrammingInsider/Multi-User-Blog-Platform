'use server';
import z, { ZodError } from 'zod';
import cloudinary from '@/utils/cloudinary';
import prisma from './db';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';


type BlogType = {
    message: string | null;
    isCreated: boolean;
    errors?: Record<string, string[] | undefined>;
};

export const CreatePost = async (state: BlogType, formData: FormData): Promise<BlogType> => {
    const action = formData.get('action') as string;

    const BlogValidation = z.object({
        blogCover: z
            .instanceof(Blob, { message: "Blog Cover Image is required." })
            .refine((file) => file.size > 0, "Blog Cover Image cannot be empty.")
            .refine(
                (file) => ["image/jpeg", "image/png"].includes(file.type),
                "Only JPEG or PNG images are allowed."
            ),
        blogName: z.string()
            .max(150, "Blog name must not exceed 150 characters.")
            .nonempty("Blog Name is required."),
        hook: z.string()
            .max(150, "Blog hook must not exceed 150 characters.")
            .nonempty("Hook is required."),
        desc: z.string()
            .max(6000, "Blog description must not exceed 6000 characters.")
            .nonempty("Blog Description is required."),
        tags: z.array(z.string()).nonempty("At least one tag should be selected."),
    });

    const inputValues = {
        blogCover: formData.get('blogCover') as File,
        blogName: formData.get('blogName') as string,
        hook: formData.get('hook') as string,
        desc: formData.get('desc') as string,
        tags: JSON.parse(formData.get('tags') as string),
    };
    
    try {
        BlogValidation.parse(inputValues);
        // Upload blog cover to Cloudinary
        let uploadedImageUrl: string | null = null;
        let blogCoverPublicId: string | null = null;

        if (inputValues.blogCover) {
            const arrayBuffer = await inputValues.blogCover.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
    
            try {

                // Upload the image to Cloudinary and get the response
                const result = await new Promise<any>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: "blog_posts" },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    uploadStream.end(buffer);
                });

                // Extract the URL and public_id from the result
                uploadedImageUrl = result.secure_url;
                blogCoverPublicId = result.public_id;

            } catch (error) {
                return {
                    message: '',
                    isCreated: false,
                    errors: { root: ["Upload failed. Please try again!"] },
                };
            }
        }
        
        let id: string | null = null;

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        if(!accessToken){
            return {
                message: '',
                isCreated: false,
                errors: { root: ["Please Login First."] },
            };
        }

        if (process.env.ACCESS_TOKEN) {
            try {
                const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as JwtPayload;
                id = decoded.id; // Ensure decoded id is correct
            } catch (error) {
                console.error("JWT Decode Error:", error);
                return {
                    message: '',
                    isCreated: false,
                    errors: { root: ["Invalid or expired token. Please log in again."] },
                };
            }
        }
        
        if(uploadedImageUrl && blogCoverPublicId){
              // Upsert tags
        const tagIds = await Promise.all(
            inputValues.tags.map(async (tag: string) => {
            const tagEntry = await prisma.tag.upsert({
                where: { name: tag },
                update: {},
                create: { name: tag },
            });
            return tagEntry.id;
            })
        );

        // Create blog
        const blog = await prisma.blog.create({
            data: {
            blogName: inputValues.blogName,
            hook: inputValues.hook,
            blogCover: uploadedImageUrl || "",
            blogCoverPublicId: blogCoverPublicId,
            desc: inputValues.desc,
            status: action === "publish",
            user: {
                connect: { id: id || "" },
            },
            },
        });

        // Link tags to blog
        await Promise.all(
            tagIds.map(async (tagId) => {
            await prisma.blogTag.create({
                data: {
                blogId: blog.id,
                tagId: tagId,
                },
            });
            })
        );

            return {
                message: (action === 'publish') ? 'Blog published successfully!' : 'Blog drafted successfully!',
                isCreated: true,
            };
        }else{
            return {
                message: '',
                isCreated: false,
                errors: { root: ["Upload failed. Please try again!"] },
            };
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                message: '',
                isCreated: false,
                errors: error.flatten().fieldErrors,
            };
        }
        console.error("Unexpected Error:", error);
        return {
            message: '',
            isCreated: false,
            errors: { root: ["Something went wrong. Please try again!"] },
        };
    }
};

interface User {
    firstName: string;
    lastName: string;
}

interface Tag {
    id: string;
    name: string;
}

interface BlogTag {
    id: string;
    tagId: string;
    blogId: string;
    tag: Tag;
}

interface Blog {
    id: string;
    blogName: string;
    hook: string;
    blogCover: string;
    blogCoverPublicId?: string | null;
    desc: string;
    status: boolean;
    createdAt: Date;
    updatedAt?: Date;
    userId: string;
    user: User;
    blogTags: BlogTag[];
}

interface FetchBlogResponse {
    message?: string;
    errors?: { root: string[] };
    data?: Blog[];
    length?: number;
}

export const FetchBlog = async (): Promise<FetchBlogResponse> => {
  let userId: string | null = null;

  // Fetch access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      message: "Please login first.",
      errors: { root: ["Please login first."] },
    };
  }

  // Decode token to extract user ID
  if (process.env.ACCESS_TOKEN) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as JwtPayload;
      userId = decoded.id;
    } catch (error) {
      return {
        message: "Invalid or expired token.",
        errors: { root: ["Authentication failed."] },
      };
    }
  }

  if (userId) {
    try {
      // Fetch blogs for the user
    //   const fetchedBlogs = await prisma.blog.findMany({
    //     where: { userId },
    //     include: { user: true, blogTags:true },
    //     orderBy: { createdAt: "desc" },
    //   });
        const fetchedBlogs = await prisma.blog.findMany({
            where: { userId },
            include: {
            user: {
                select: { firstName: true, lastName: true },
            },
            blogTags: { 
                include: {
                    tag: true, 
                },
            },
            },
            orderBy: { createdAt: "desc" },
        });      

      return {
        data: fetchedBlogs,
        length: fetchedBlogs.length,
      };
    } catch (error) {
      return {
        message: "Something went wrong. Please try again!",
        errors: { root: ["Database query failed."] },
      };
    }
  }

  return {
    message: "User ID not found.",
    errors: { root: ["User not authenticated."] },
  };
};

export const FetchPublicBlog = async (): Promise<FetchBlogResponse> => {

    try {

        const fetchedBlogs = await prisma.blog.findMany({
            where: { status:true },
            include: {
            user: {
                select: { firstName: true, lastName: true },
            },
            blogTags: { 
                include: {
                    tag: true, 
                },
            },
            },
            orderBy: { createdAt: "desc" },
        });      

    return {
        data: fetchedBlogs,
        length: fetchedBlogs.length,
    };
    } catch (error) {
    return {
        message: "Something went wrong. Please try again!",
        errors: { root: ["Database query failed."] },
    };
    }
};

export const UpdatePost = async (state: BlogType, formData: FormData): Promise<BlogType> => {
    const action = formData.get('action') as string;
    const blogId = formData.get('blogid') as string;
    const blogCover = formData.get('blogCover') as File;

    const BlogValidation = z.object({
        blogName: z.string().max(150).nonempty("Blog Name is required."),
        hook: z.string().max(150).nonempty("Hook is required."),
        desc: z.string().max(2500).nonempty("Description is required."),
        tags: z.array(z.string()).nonempty("At least one tag is required."),
    });

    const inputValues = {
        blogName: formData.get('blogName') as string,
        hook: formData.get('hook') as string,
        desc: formData.get('desc') as string,
        tags: formData.get('tags') ? JSON.parse(formData.get('tags') as string) : [],
        ...(blogCover && blogCover.size > 0 ? { blogCover } : {}),
    };

    try {
        BlogValidation.parse(inputValues);

        let uploadedImageUrl: string | null = null;
        let blogCoverPublicId: string | null = null;

        if (blogCover && blogCover.size > 0) {
            const arrayBuffer = await blogCover.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            try {
                const result = await new Promise<any>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: "blog_posts" },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    uploadStream.end(buffer);
                });

                uploadedImageUrl = result.secure_url;
                blogCoverPublicId = result.public_id;
            } catch (error) {
                console.error("Image upload failed:", error);
                throw new Error("Upload failed. Please try again.");
            }
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        if (!accessToken) {
            throw new Error("Please log in first.");
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN!) as JwtPayload;
        const id = decoded.id;

        const tagConnections = inputValues.tags.map((tagId:string) => ({ id: tagId }));

        const blogData = {
            blogName: inputValues.blogName,
            hook: inputValues.hook,
            desc: inputValues.desc,
            status: action === "publish",
            user: { connect: { id } },
            ...(uploadedImageUrl ? { blogCover: uploadedImageUrl } : {}),
            ...(blogCoverPublicId ? { blogCoverPublicId } : {}),
            blogTags: {
                connect: tagConnections,
            },
        }

        const updatedBlog = await prisma.blog.update({
            where: { id: blogId },
            data: blogData,
        });

        return {
            message: action === "publish" ? "Blog updated successfully!" : "Blog drafted successfully!",
            isCreated: true,
        };
    } catch (error) {
        console.error("UpdatePost error:", error);
        return {
            message: '',
            isCreated: false,
            errors: { root: ["Something went wrong."] },
        };
    }
};

