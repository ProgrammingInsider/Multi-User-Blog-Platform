export const dynamic = 'force-dynamic';

import AllBlogs from "@/components/AllBlogs";
import HeroPage from "@/components/HeroPage";
import RecentBlogs from "@/components/RecentBlogs";
import {FetchPublicBlog} from "@/utils/profileActions";
import { Blog } from "@/utils/types";
interface FetchAllBlogResponse {
  data?: Blog[];
  length?: number;
}

const Home = async() => {
  const response: FetchAllBlogResponse = await FetchPublicBlog();

    let blogLists: Blog[] = [];
    if (response?.data && Array.isArray(response.data)) {
      blogLists = response.data;
    }

    // Split the blogs
  const recentBlogs = blogLists.slice(0, 4);
  const allBlogs = blogLists.slice(4);
    
  
  return (
    <>
      <HeroPage/>
      <RecentBlogs recent={recentBlogs}/>
      <AllBlogs allBlogs={allBlogs}/>
    </>
  );
};

export default Home;
