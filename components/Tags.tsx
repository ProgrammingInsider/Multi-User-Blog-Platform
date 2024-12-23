interface Tag {
    id: string;
    name: string;
}
interface BlogTag {
    id: string;
    tagId: string;
    blogId: string;
    tag: Tag;
}

const Tags = ({tags}:{tags:BlogTag[]}) => {
    return (
        <div className="tags">
            {tags?.map((blogTag, index) => (
                <span key={index} className="tag">
                {blogTag?.tag?.name}
                </span>
            ))}
        </div>
    )
}

export default Tags