import SingleCard from "./SingleCard"
import { Blog } from "@/utils/types";

const MainCard = ({blog}:{blog:Blog}) => {
    return <>
        <div className="w-full md:h-full">
            <SingleCard blog={blog}/>
        </div>
    </>
}

export default MainCard