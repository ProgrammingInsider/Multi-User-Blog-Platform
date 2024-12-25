import SideMenu from "@/components/SideMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogger | Create a New Blog Post",
  description: "Start sharing your ideas on Blogger by creating a new blog post. Express yourself and connect with a global audience today.",
};


const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main className='flex overflow-x-hidden'>
        <SideMenu/>
        <section className="sectionBg p-4 ml-14 sm:ml-0 w-[95%] min-h-screen sm:w-screen">
          {children}
        </section>
    </main>
  )
}

export default layout