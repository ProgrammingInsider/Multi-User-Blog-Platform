import { getBlog } from '@/utils/getBlog';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";

interface ReadBlogProps {
  params: Promise<{
    id: string;
  }>
}

export async function generateMetadata({ params }: ReadBlogProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);

  // Default metadata
  if (!blog?.result) {
    return {
      title: 'Blogger | Discover and Share Blogs',
      description: 'Explore a wide range of blogs on Blogger, the platform where users can create, share, and engage with diverse content from all over the world.',
    };
  }

  // Dynamic metadata based on blog content
  return {
    title: blog.result.blogName || 'Blogger | Discover and Share Blogs',
    description: blog.result.hook || 'Explore a wide range of blogs on Blogger.',
  };
}

const ReadBlog = async ({ params }: ReadBlogProps) => {
  const {id} = await params;
  const blog = await getBlog(id);
  
  if(!blog.result?.blogCover){
    notFound();
  }

  return <>
    <main className="w-10/12 max-w-4xl mx-auto mt-8 mb-20">
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold">{blog?.result?.blogName}</h1>
      <p className="mt-3">{blog?.result?.hook}</p>
      <div className="tags mt-3 items-center">
        Tags:&nbsp;
        {blog?.result?.blogTags.map((blogTag, index) => (
              <span key={index} className="tag">
                {blogTag.tag.name}
              </span>
        ))}
      </div>
      <div className="w-full mt-3">
        <Image
          src={`${blog?.result?.blogCover}`}
          alt="Blog Cover Image"
          className="w-full h-96 object-cover"
          width={700}
          height={300}
          priority
        />
      </div>
    </div>
    {/* Body of Blog */}
    <div className="w-full max-w-5xl mx-auto mt-5">
      <div
        className="desc-content"
        dangerouslySetInnerHTML={{ __html: blog?.result?.desc || '' }}
      />
    </div>
</main>

  </>
}

export default ReadBlog