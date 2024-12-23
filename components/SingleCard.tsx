// import Image from "next/image"
// import Link from "next/link"
// import Tags from "@/components/Tags"
// import { format } from 'date-fns';
// import { MdOutlineArrowOutward } from "react-icons/md";

// interface User {
//     firstName: string;
//     lastName: string;
//   }
  
//   interface Tag {
//     id: string;
//     name: string;
//   }
  
//   interface BlogTag {
//     id: string;
//     tagId: string;
//     blogId: string;
//     tag: Tag; // Add the nested tag structure
//   }
  
//   interface Blog {
//     id: string;
//     blogName: string;
//     hook: string;
//     blogCover: string;
//     blogCoverPublicId?: string | null;
//     desc: string;
//     status: boolean;
//     createdAt: Date;
//     updatedAt?: Date;
//     userId: string;
//     user: User;
//     blogTags: BlogTag[];
//   }

// const SingleCard = ({blog}:{blog:Blog}) => {
    
//   return (
//         <Link href={`/blog/${20}`}>
//             <div className="w-full mb-4">
//                 <Image src={`${blog?.blogCover}`} className="w-full h-full object-cover" width={800} height={300} alt="blog 1"/>
//             </div>
//             <div>
//                 <p className="para text-xs">{blog?.user?.firstName}&nbsp;{blog?.user?.lastName}+{format(new Date(blog?.createdAt), 'dd MMM yyyy')}</p>
//                 <div className="flex justify-between my-2">
//                     <h1 className="truncate text-xl font-bold w-4/5" title={`${blog?.blogName}`}>{blog?.blogName}</h1>
//                     <span className="text-2xl font-extrabold"><MdOutlineArrowOutward /></span>
//                 </div>
//                 <p className="text-xs cardPara mb-4">{blog?.hook}</p>
//                 <Tags tags={blog.blogTags} />

//             </div>
//         </Link>
//   )
// }

// export default SingleCard


import Image from "next/image";
import Link from "next/link";
import Tags from "@/components/Tags";
import { format, isValid } from "date-fns";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Blog } from "@/utils/types";

const SingleCard = ({ blog }: { blog: Blog }) => {
  const createdAt = new Date(blog?.createdAt);
  const formattedDate = isValid(createdAt)
    ? format(createdAt, "dd MMM yyyy")
    : "Invalid Date"; 

    const isValidUrl = (url: string) => {
    try {
        // Check if the URL is valid
        new URL(url);
        return true;
    } catch {
        return false;
    }
    };

    // Check if blogCover is a valid URL, otherwise use a fallback image
    const imageSrc = isValidUrl(blog?.blogCover) ? blog?.blogCover : "";

  return (
        <Link href={`/blog/${blog?.id}`} className="w-full grid grid-cols-6 gap-2 h-auto max-w-full">
        <div className="w-full overflow-hidden col-span-6">
            <Image
            src={imageSrc}
            className="w-full h-full object-cover"
            width={800}
            height={300}
            alt={`${blog?.blogName}`}
            />
        </div>
        <div className="col-span-6">
            <p className="para text-xs">
            {blog?.user?.firstName}&nbsp;{blog?.user?.lastName}+{formattedDate}
            </p>
            <div className="flex justify-between my-2">
            <h1
                className="truncate text-xl font-bold w-4/5"
                title={`${blog?.blogName}`}
            >
                {blog?.blogName}
            </h1>
            <span className="text-2xl font-extrabold">
                <MdOutlineArrowOutward />
            </span>
            </div>
            <p className="text-xs cardPara mb-4">{blog?.hook}</p>
            <Tags tags={blog?.blogTags} />
        </div>
        </Link>
    );
};

export default SingleCard;
