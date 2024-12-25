'use client'
import Link from "next/link"
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
import {startTransition, useActionState} from 'react'
import { Subscribe } from "@/utils/subscribe";

const initialState:{
    message:string,
    isSubscribed:boolean
} = {
    message: '',
    isSubscribed: false
}

const Footer = () => {
    const[state, formAction] = useActionState(Subscribe,initialState);

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        
        startTransition(() => {
          formAction(formData);
        });
      }

  return (
    <div className="mt-6 p-8 max-w-7xl mx-auto" id="newsletter">
        <div className="sm:flex gap-5 justify-between items-center pb-12 border-b border-b-gray-200">
            <div className="mb-5">
                <h1 className="heading font-bold text-2xl mb-1">Sign up to our newsletter</h1>
                <p>Stay up to date with the latest news, announcements, and articles.</p>
            </div>
            <div>
            <form onSubmit={handleSubmit} className="myBorder mt-3 rounded-lg p-1 flex">
                <input 
                    type="email"
                    name="email" 
                    className="input border-0 w-full" 
                    placeholder="Email address"
                    required
                />
                <input 
                    type="submit" 
                    value={"Subscribe"} 
                    className="primaryBtn primaryBtnText cursor-pointer" 
                />
            </form>
            {(state?.isSubscribed) && <>
                <div className="flex gap-2">
                    <p className="success-message text-green-500 mb-4 font-bold">
                        {state?.message}
                    </p>
                </div>
            </>}
            {(state?.isSubscribed) || <>
                <div className="flex gap-2">
                    <p className="error-message font-bold mb-4 text-sm">
                        {state?.message}
                    </p>
                </div>
            </>}
            </div>
        </div>  

        <div className="flex gap-5 justify-between items-center my-3">
            <p className="para text-sm">© 2025 developed by <Link href={"https://amanuelabera.vercel.app/"} target="_blank" className="hover:underline">Amanuel Abera</Link>. All rights reserved.</p>
            <div className="flex gap-3 items-center">
                <Link href={""} className="text-xl">
                    <FaXTwitter />
                </Link>
                <Link href={""} className="text-xl">
                    <FaLinkedin />
                </Link>
                <Link href={""} className="text-xl">
                    <FaFacebookF />
                </Link>
                <Link href={""} className="text-xl">
                    <FaGithub />
                </Link>
                <Link href={""} className="text-xl">
                    <FaDribbble />
                </Link>
            </div>
        </div>      
    </div>
)
}

export default Footer