import BlogCard from "@/components/MainCard"
import VerticalCard from "@/components/verticalCard"
import { Blog } from "@/utils/types";


const RecentBlogs = ({recent}:{recent:Blog[]}) => {
  return <>
    <div className="w-full max-w-7xl mx-auto px-8 sm:px-8">
        <h1 className="text-xl mb-4">Recent blog posts</h1>
        <div className="w-full grid gap-5 md:grid-cols-6 md:h-screen mx-auto">
            <div  className="w-full col-span-3 mb-11 md:mb-0">
                <BlogCard blog={recent[0]}/>
            </div>
            <div className="col-span-3 w-full">
                <VerticalCard blog={recent[1]}/>
                <VerticalCard blog={recent[2]}/>
                <VerticalCard blog={recent[3]}/>
            </div>
        </div>
    </div>
  </>
}

export default RecentBlogs