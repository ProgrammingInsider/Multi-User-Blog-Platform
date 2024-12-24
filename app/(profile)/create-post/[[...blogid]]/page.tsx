'use client'

import { CreatePost, UpdatePost } from '@/utils/profileActions';
import {startTransition, useActionState, useEffect, useState} from 'react'
import { FaImage } from "react-icons/fa";
import { getBlog } from '@/utils/getBlog';
import Image from 'next/image';

const initialState : {message: string | null, isCreated: boolean, errors?: Record<string, string[] | undefined>,} = {
  message: null,
  isCreated: false,
  errors:{},
}

type placeholderValuesType = {
  id:string,
  blogCover: string,
  blogName: string,
  hook?: string,
  desc: string,
  blogTags: string[]
}

const placeholderValues: placeholderValuesType = {
  id:'',
  blogCover: '',
  blogName: '',
  hook: '',
  desc: '',
  blogTags: []
}

type CreateBlogProps = {
  params: Promise<{
      blogid?: string | string[] | undefined;
  }>;
};

const CreateBlog = ({ params }: CreateBlogProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [action, setAction] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState<placeholderValuesType>(placeholderValues);

  // Use useEffect to fetch the blog id asynchronously
  const [blogid, setBlogid] = useState<string | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
        const resolvedParams = await params;
        const resolvedBlogId = Array.isArray(resolvedParams.blogid)
            ? resolvedParams.blogid[0]
            : resolvedParams.blogid;
        setBlogid(resolvedBlogId || null);
    };

    resolveParams();
  }, [params]); 
  
  const [state, formAction] = useActionState(blogid ? UpdatePost : CreatePost, initialState);
  
  useEffect(() => {
    const fetchBlog = async () => {
      if (blogid) {
        const blog = await getBlog(blogid);
        const { result } = blog;
  
        if (result) {
          const { id, blogCover, blogName, hook, desc, blogTags} = result;
          
          const tagNames = blogTags.map((tagObject: { tag: { name: string } }) => tagObject.tag.name);
  
          setPlaceholder({ id, blogCover, blogName, hook, desc, blogTags: tagNames });
          setSelectedTags(tagNames); 
        }
      }
    };
    fetchBlog();
  }, [blogid]);
  


  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formData.append('tags', JSON.stringify(selectedTags));
    formData.append('action', action);

    setLoading(true);
    startTransition(() => {
      formAction(formData);
      setLoading(false);
    });
  }

  useEffect(()=>{
    if (state?.isCreated) {
      setPlaceholder(placeholderValues);
      setPreviewImage(null);
      setSelectedTags([]);
    }
  },[state])
  
  return (
    <div className='background p-6 rounded-lg max-w-4xl mb-20'>
      <h1 className='text-xl font-bold mb-8'>Create a new blog</h1>
      {(state?.message) && <>
                <div className="flex gap-2">
                    <p className="success-message text-green-500 mb-4 font-bold">
                        {state?.message}
                    </p>
                </div>
            </>}
            {(state?.errors?.root) && <>
                <div className="flex gap-2">
                    <p className="error-message font-bold mb-4 text-sm">
                        {state?.errors?.root}
                    </p>
                </div>
            </>}
      <form onSubmit={handleSubmit} method='POST'>
        <p className='label mb-3'>Upload blog cover&nbsp;<span className='asterik'>*</span></p>
        <label htmlFor="blogCover" className='border-2 border-dashed rounded-lg h-40 flex flex-col gap-2 justify-center items-center cursor-pointer mb-5 secondaryBg'>
          <FaImage className='label text-3xl'/>
          <p className='text-xs'>Upload Blog Cover Image</p>
          <p className='text-xs'>click to browse</p>
          <input 
            type='file' 
            name='blogCover' 
            id='blogCover' 
            className='hidden'
            onChange={handleFileChange}
          />
        </label>
        <input 
          type="hidden" 
          name="blogId" 
          value={blogid || ''}
        />
        {placeholder.blogCover || previewImage ? (
          <div className="w-40 h-40 bg-gray-200 mb-5">
            <Image
              src={placeholder.blogCover || previewImage || ''}
              alt="Blog Cover Preview"
              className="w-full h-full object-cover rounded-lg"
              width={160} 
              height={160}
              priority
            />
          </div>
        ) : null}
        {state.errors && state.errors.blogCover && (
                    <p className="error-message mb-2">{state.errors.blogCover}</p>
        )}
        <div className="flex flex-col mb-5">
            <label className="label" htmlFor="blogName">Blog Name <span className="asterik">*</span></label>
            <input 
              type="text" 
              name="blogName" 
              className="input value w-full mt-2" 
              id="blogName" 
              required
              value={placeholder.blogName}
              placeholder='Eg. Next.js 15 is know released.'
              onChange={(e) => setPlaceholder((prev) => ({ ...prev, blogName: e.target.value }))}
            />
            {state.errors && state.errors.blogName && (
                    <p className="error-message">{state.errors.blogName}</p>
            )}
        </div>
        <div className="flex flex-col mb-5">
            <label className="label" htmlFor="hook">Hook <span className="asterik">*</span></label>
            <input 
              type="text" 
              name="hook" 
              className="input value w-full mt-2" 
              id="hook" 
              placeholder='Eg. Did you know why next.js is so important? I tell you why'
              required
              value={placeholder.hook}
              onChange={(e) => setPlaceholder((prev) => ({ ...prev, hook: e.target.value }))}
            />
            {state.errors && state.errors.hook && (
                    <p className="error-message">{state.errors.hook}</p>
            )}
        </div>
        <div className="flex flex-col mb-5">
          <label className="label" htmlFor="desc">
              Description <span className="asterik">*</span>
          </label>
          <textarea
              name="desc"
              id="desc"
              className="input value w-full mt-2"
              rows={10}
              required
              placeholder='Eg. <h1>What is Next.js.</h1>'
              value={placeholder.desc}
              onChange={(e) => setPlaceholder((prev) => ({ ...prev, desc: e.target.value }))}
          />
          {state.errors?.desc && (
              <p className="error-message">{state.errors.desc}</p>
          )}
        </div>
        <p className='label mb-3'>Tags&nbsp;<span className='asterik'>*</span></p>
        <div className="myBorder rounded-lg h-24 p-3 gap-2 items-center cursor-pointer mb-5 flex flex-wrap justify-start">
          {['Design', 'Research', 'Technology', 'Politics','Development'].map((tag) => (
            <span
              key={tag}
              className={`tag cursor-pointer ${
                selectedTags.includes(tag) ? 'tagSelected' : ''
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
        {state.errors?.tags && (
              <p className="error-message">{state.errors.tags}</p>
          )}

        {loading && (
          <div className="fixed top-0 left-0 w-full h-full inset-0 bg-black opacity-75 flex justify-center items-center z-10">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-blue-600 rounded-full"></div>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <button type="submit" onClick={() => setAction('cancel')} className="transparentBtn">
            Cancel
          </button>
          <div className="flex gap-7">
            <button type="submit" onClick={() => setAction('draft')} className="secondaryBtn">
              Save as Draft
            </button>
            <button type="submit" onClick={() => setAction('publish')} className="primaryBtn">
              {blogid ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default CreateBlog