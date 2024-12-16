import React from 'react'
import { FaImage } from "react-icons/fa";

const CreateBlog = () => {
  return (
    <div className='background p-6 rounded-lg max-w-4xl'>
      <h1 className='text-xl font-bold mb-8'>Create a new blog</h1>
      <form>
        <p className='label mb-3'>Upload blog cover&nbsp;<span className='asterik'>*</span></p>
        <label htmlFor="blogCover" className='border-2 border-dashed rounded-lg h-40 flex flex-col gap-2 justify-center items-center cursor-pointer mb-5 secondaryBg'>
          <FaImage className='label text-3xl'/>
          <p className='text-xs'>Upload Blog Cover Image</p>
          <p className='text-xs'>click to browse</p>
          <input type='file' name='blogCover' id='blogCover' className='hidden'/>
        </label>
        <div className="flex flex-col mb-5">
            <label className="label" htmlFor="blogName">Blog Name <span className="asterik">*</span></label>
            <input 
              type="text" 
              name="blogName" 
              className="input value w-full mt-2" 
              id="blogName" 
              required
              placeholder='Eg. Next.js 15 is know released.'
            />
            {/* {state.errors && state.errors.email && (
                    <p className="error-message">{state.errors.email}</p>
            )} */}
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
            />
            {/* {state.errors && state.errors.email && (
                    <p className="error-message">{state.errors.email}</p>
            )} */}
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
          />
          {/* {state.errors?.desc && (
              <p className="error-message">{state.errors.desc}</p>
          )} */}
        </div>
        <p className='label mb-3'>Tags&nbsp;<span className='asterik'>*</span></p>
        <div className='myBorder rounded-lg h-24 p-3 gap-2 items-center cursor-pointer mb-5 flex flex-wrap justify-start'>
          <span className='tag cursor-pointer hover:tagSelected'>Design</span>
          <span className='tag cursor-pointer hover:tagSelected'>Research</span>
          <span className='tag cursor-pointer hover:tagSelected'>Technology</span>
          <span className='tag cursor-pointer hover:tagSelected'>Polotics</span>
        </div>
        <div className='flex justify-between mt-10'>
          <button className='transparentBtn'>Cancel</button>
          <div className='flex gap-7'>
            <button className='secondaryBtn'>Save as Draft</button>
            <button className='primaryBtn'>Publish</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default CreateBlog