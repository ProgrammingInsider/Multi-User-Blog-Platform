import Link from "next/link";
const EditBlogBtn = ({id}:{id:string}) => {
    console.log(id);
    
  return (
    <form>
        <input type='hidden' name='id' value={id}/>
        <Link href={`/create-post/${id}`} className='p-2 hover:font-bold text-sm primaryBtn primaryBtnTxt'>Edit</Link>
    </form>
  )
}

export default EditBlogBtn