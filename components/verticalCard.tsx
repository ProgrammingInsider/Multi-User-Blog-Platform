import Link from "next/link"
import Tags from "@/components/Tags"
import { format, isValid } from "date-fns";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Blog } from "@/utils/types";

const VerticalCard = ({blog}:{blog:Blog}) => {
    const createdAt = new Date(blog?.createdAt);
  const formattedDate = isValid(createdAt)
    ? format(createdAt, "dd MMM yyyy")
    : "Invalid Date"; 

    const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
    };

    const imageSrc = isValidUrl(blog?.blogCover) ? blog?.blogCover : "";
  return (
    <div className="w-full">
    <Link href={`/blog/${blog?.id}`} className="w-full grid grid-cols-6 gap-2 h-40">
        <div className="w-full overflow-y-hidden mb-4 col-span-2">
            <img 
                src={imageSrc} 
                className="w-full h-full object-cover" 
                width={800} 
                height={300} 
                alt={`${blog?.blogName}`}
            />
        </div>
        <div className="col-span-4">
            <p className="para text-xs">
                {blog?.user?.firstName}&nbsp;{blog?.user?.lastName}+{formattedDate}
            </p>
            <div className="flex justify-between my-2">
                <h1 className="truncate text-xl font-bold w-4/5" title={`${blog?.blogName}`}>{blog?.blogName}</h1>
                <span className="text-2xl font-extrabold"><MdOutlineArrowOutward /></span>
            </div>
            <p className="text-xs cardPara mb-2">{blog?.hook}</p>
            <Tags tags={blog?.blogTags} />

        </div>
    </Link>
</div>
  )
}

export default VerticalCard