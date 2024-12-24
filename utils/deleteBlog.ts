'use server';

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import cloudinary from "./cloudinary";

export const DeleteBlog = async (formData: FormData): Promise<void> => {
  const id: string = formData.get("id") as string;
  
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken")?.value;

    if (accessToken && process.env.ACCESS_TOKEN) {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as JwtPayload;

      if (decoded?.id) {
        const blog = await prisma.blog.findUnique({
          where: {
            id_userId: {
              id,
              userId: decoded.id,
            },
          },
        });

        if (blog?.blogCoverPublicId) {
          // Delete the image from Cloudinary
          await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(blog.blogCoverPublicId!, (error, result) => {
              if (error) return reject(error);
              console.log("Cloudinary image deleted:", result);
              resolve(result);
            });
          });
        } else {
          console.error("No blogCoverPublicId found for this blog.");
        }

        await prisma.blog.delete({
          where: {
            id_userId: {
              id,
              userId: decoded.id, 
            },
          },
          include: {
            blogTags: true, 
          },
        });

        // Revalidate cache
        revalidatePath('/dashboard');
        console.log("Blog deleted successfully");
      } else {
        console.error("Invalid user ID in token");
      }
    } else {
      console.error("Invalid access token");
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};
