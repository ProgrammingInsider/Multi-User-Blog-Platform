export const dynamic = 'force-dynamic';

import { FetchBlog } from '@/utils/profileActions';
import { format } from 'date-fns';
import DeleteBlogBtn from '@/components/DeleteBlogBtn';
import EditBlogBtn from '@/components/EditBlogBtn';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogger | Your Dashboard",
  description: "Manage your blog posts effortlessly with Blogger's Dashboard. View, edit, or delete your blogs and track your content at a glance.",
};


interface Blog {
  id: string;
  blogName: string;
  hook: string;
  blogCover: string;
  desc: string;
  status:boolean;
  createdAt: Date;
  userId: string;
}

interface FetchBlogResponse {
  message?: string;
  isCreated?: boolean;
  errors?: { root: string[] };
  data?: Blog[];
  length?: number;
}

const Dashboard = async() => {
    const response: FetchBlogResponse = await FetchBlog();

    let blogLists: Blog[] = [];
    if (response?.data && Array.isArray(response.data)) {
      blogLists = response.data;
    }

  return (
    <div className="background p-6 rounded-lg w-10/12 min-h-screen mb-20 sm:w-full">
      <h1 className="text-xl font-bold mb-8">Blog lists</h1>
  
      <div className="overflow-x-auto w-full custom-scrollbar rounded-lg">
        <table className="border-collapse w-full para">
          <thead className='secondaryBg'>
            <tr>
              <th className="tableBorder px-4 py-2 w-6 font-extrabold text-left text-sm">SI No:</th>
              <th className="tableBorder px-4 py-2 w-2/4 font-extrabold text-left text-sm">Blog name</th>
              <th className="tableBorder px-4 py-6 w-full font-extrabold text-left text-sm">Release Date</th>
              <th className="tableBorder px-4 py-2 w-8 font-extrabold text-left text-sm">Status</th>
              <th className="tableBorder px-4 py-2 w-6 font-extrabold text-left text-sm">Edit</th>
              <th className="tableBorder px-4 py-2 w-6 font-extrabold text-left text-sm">Delete</th>
            </tr>
          </thead>
  
          <tbody>
            {blogLists.length > 0 ? (
              blogLists.map((blog, index) => (
                <tr key={blog.id}>
                  <td className="tableBorder px-4 py-2">{index + 1}</td>
                  <td className="tableBorder px-4 py-2">
                    <div className="flex gap-4 items-center text-sm">
                      <div className="w-8 h-8">
                        <Image
                          src={blog.blogCover}
                          alt="Blog Image"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                      <Link href={`/blog/${blog.id}`} className="truncate max-w-xs hover:underline">{blog.blogName}</Link>
                    </div>
                  </td>
                  <td className="tableBorder px-4 py-4 text-sm">
                    <div>{format(new Date(blog.createdAt), 'dd MMM yyyy')}</div>
                  </td>
                  <td className="tableBorder px-4 py-2">
                    <button className={`${blog.status ? 'active activeBorder' : 'draftBorder draft'} p-2 rounded-lg font-bold text-xs`}>
                      {blog.status ? ' PUBLISHED' : 'DRAFTED'}
                    </button>
                  </td>
                  <td className="tableBorder px-4 py-2 relative">
                        <EditBlogBtn id={blog.id.toString()}/>
                  </td>
                  <td className="tableBorder px-4 py-2 relative">
                        <DeleteBlogBtn id={blog.id.toString()}/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-sm font-bold">No blog posts available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Dashboard;