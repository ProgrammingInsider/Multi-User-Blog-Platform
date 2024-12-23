import SingleCard from "./SingleCard"
import { Blog } from "@/utils/types";


const AllBlogs = ({allBlogs}:{allBlogs:Blog[]}) => {
  return (
    <div className="w-11/12 mx-auto max-w-7xl mt-16 mb-20 sm:mt-8">
        <h1 className="text-xl mb-4">All blog posts</h1>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {
                allBlogs.map((blog, index)=>{
                    return(
                    <div className="cols-span-1" key={index}>
                        <SingleCard blog={blog}/>
                    </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default AllBlogs