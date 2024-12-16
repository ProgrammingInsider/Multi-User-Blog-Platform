'use client'

import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { FaEye } from "react-icons/fa";
import { startTransition } from "react";



// actions
import { createUser } from "@/utils/actions";

const initialState: { message: string | null; errors?: Record<string, string[] | undefined> } = {
    message: null,
    errors: {},
};

const Register = () => {
    const [togglePassword, setTogglePassword] = useState<boolean>(false);
    const [toggleConfirmPassword, setToggleConfirmPasword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [state,formAction] = useFormState(createUser,initialState)

  const handleSubmit = async (e:React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    startTransition(() => {
        formAction(formData);
        setLoading(false);
    });

    }

  return (
    <div className="grid grid-cols-5 gap-8 mx-5 md:gap-12 max-w-screen"  style={{ height: 'calc(100vh - 4rem)' }}>
        <form onSubmit={handleSubmit} action={formAction} method='POST' className="col-span-5 max-w-lg sm:max-w-4xl mt-8 sm:mt-16 sm:col-span-3 md:col-span-2">
            <h1 className="heading text-2xl font-bold">Register!</h1>
            <p className="para mb-5 mt-2">Create a new account.</p>
            
            {(state?.message) && <>
                <div className="flex gap-2">
                    <p className="success-message text-green-500 mb-4 font-bold">
                        {state?.message}
                    </p>
                    <Link href={"/login"} className="heading underline cursor-pointer font-bold text-xs">Login here</Link>
                </div>
            </>}
            {(state?.errors?.root) && <>
                <div className="flex gap-2">
                    <p className="error-message font-bold mb-4 text-sm">
                        {state?.errors?.root}
                    </p>
                </div>
            </>}
            <div className="flex flex-col mb-5">
                <label className="label" htmlFor="firstName">First Name <span className="asterik">*</span></label>
                <input type="text" name="firstName" className="input value w-full mt-2" id="firstName" placeholder="First Name" required/>
                {state.errors && state.errors.firstName && (
                    <p className="error-message">{state.errors.firstName}</p>
                )}
            </div>
            <div className="flex flex-col mb-5">
                <label className="label" htmlFor="lastName">Last Name <span className="asterik">*</span></label>
                <input type="text" name="lastName" className="input value w-full mt-2" id="lastName" placeholder="Last Name" required/>
                {state.errors && state.errors.lastName && (
                    <p className="error-message">{state.errors.lastName}</p>
                )}
            </div>
            <div className="flex flex-col mb-5">
                <label className="label" htmlFor="email">Email <span className="asterik">*</span></label>
                <input type="email" name="email" className="input value w-full mt-2" id="email" placeholder="Your Email" required/>
                {state.errors && state.errors.email && (
                    <p className="error-message">{state.errors.email}</p>
                )}
            </div>
            <div className="flex flex-col mb-5 relative z-0">
                <label className="label" htmlFor="password">Password <span className="asterik">*</span></label>
                <div className="flex mt-2 relative">
                <input type={togglePassword ?"text" :"password"} name="password" className="input value w-full pr-12" id="password" placeholder="Password" required/>
                <div className="flex justify-center items-center py-1 px-4 rounded-lg box-border  cursor-pointer absolute top-0 right-0 bottom-0" onClick={()=>setTogglePassword(!togglePassword)}>
                    <FaEye className="value"/>
                </div>
                </div>
                {state.errors && state.errors.password && (
                    <p className="error-message">{state.errors.password}</p>
                )}
                
            </div>
            <div className="flex flex-col mb-5 relative w-full">
                <label className="label" htmlFor="confirmPassword">Confirm Password <span className="asterik">*</span></label>
                <div className="flex mt-2 relative">
                    <input type={toggleConfirmPassword ?"text" :"password"} name="confirmPassword" className="input value w-full pr-12" id="confirmPassword" placeholder="Confirm Password" required />
                    <div className="flex justify-center items-center py-1 px-4 rounded-lg box-border  cursor-pointer absolute top-0 right-0 bottom-0" onClick={()=>setToggleConfirmPasword(!toggleConfirmPassword)}>
                    <FaEye className="value"/>
                    </div>
                </div>
                    {state.errors && state.errors.confirmPassword && (
                    <p className="error-message">{state.errors.confirmPassword}</p>
                    )}
            </div>
            {/* <div>
                <label className="label flex items-center gap-2">
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
                </label>
            </div> */}
            <button className="primaryBtn w-full mt-6" disabled={loading}>{loading ? "Processing...": "Register"}</button>

            <p className="para text-sm mt-4 text-center">Do you have an account? <Link href={'/login'} className="heading font-bold">SignIn</Link></p>
        </form>
        <div className="relative hidden sm:block col-span-1 sm:col-span-2 md:col-span-3 h-full">
        <Image src="/images/sideImage1.jpg" fill className="w-full h-full object-cover" alt="Side Image" priority />
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white px-4">
            <h2 className="hidden sm:flex text-white text-xl font-bold sm:text-3xl md:text-4xl">Welcome Back!</h2>
            <p className="hidden sm:flex mt-4 text-center text-lg md:text-xl lg:text-2xl max-w-96">
                Join our community to share your stories and inspire others!
            </p>
        </div>
    </div>

    </div>
  )
}

export default Register