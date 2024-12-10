'use client'

import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const Login = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const handleCheckboxToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-5 items-center gap-8 mx-5 md:gap-12 max-w-screen"  style={{ height: 'calc(100vh - 4rem)' }}>
    <form action="" method='POST' className="col-span-4 mt-16 sm:col-span-3 md:col-span-2">
        <h1 className="heading text-2xl font-bold">Welcome!</h1>
        <p className="para mb-5 mt-2">Log In your account.</p>
        <div className="flex flex-col mb-5">
            <label className="label" htmlFor="email">Email <span className="asterik">*</span></label>
            <input type="email" className="input value w-full mt-2" id="email" placeholder="Your Email" required/>
        </div>
        <div className="flex flex-col mb-5 relative">
            <label className="label" htmlFor="password">Password <span className="asterik">*</span></label>
            <input type={togglePassword ?"text" :"password"} className="input value w-full mt-2 pr-8" id="password" placeholder="Password" required/>
            <FaEye className="value absolute top-1/2 right-2 translate-x-0 translate-y-1/2 cursor-pointer z-10" onClick={()=>setTogglePassword(!togglePassword)}/>
        </div>
        <div className="flex justify-between items-center">
                <label className="label flex justify-between items-center gap-2 w-full">
                    <div className="label flex items-center gap-2">
                      {isChecked ? (
                          <IoCheckbox
                              className="primary border-0 text-xl"
                              onClick={handleCheckboxToggle}
                          />
                          ) : (
                          <MdCheckBoxOutlineBlank
                              className="primary border-0 text-xl"
                              onClick={handleCheckboxToggle}
                          />
                      )}
                      <input type="checkbox" hidden />
                      Remember me
                    </div>
                  <Link href={""} className="label">Forget Password?</Link>
                </label>
        </div>
        <button className="primaryBtn w-full mt-6">Login</button>
        <p className="para text-sm mt-4 text-center">Don't have any account? <Link href={'/register'} className="heading font-bold">SignUp</Link></p>
    </form>
    <div className="relative col-span-1 sm:col-span-2 md:col-span-3 h-full">
    <Image src="/images/sideImage1.jpg" fill className="w-full h-full object-cover" alt="Side Image" />
    {/* Text Overlay */}
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white px-4">
        <h2 className="hidden sm:flex text-xl font-bold sm:text-3xl md:text-4xl">Welcome Back!</h2>
        <p className="hidden sm:flex mt-4 text-center text-lg md:text-xl lg:text-2xl max-w-96">
            Join our community to share your stories and inspire others!
        </p>
    </div>
</div>

</div>
 
  )
}

export default Login