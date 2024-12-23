'use client';

import { useGlobalContext } from '@/context/context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineToggleOff } from "react-icons/md";
import { MdOutlineToggleOn } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { FaCircleUser } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";


const Header = () => {
    const [isDarkMode, setDarkMode] = useState<boolean>(false)
    const {userId, setUserId} = useGlobalContext();
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const route = useRouter();

    useEffect(() => {
        
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, []);

    // Toggle theme on button click
    const toggleTheme = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light'); 
        setDarkMode(false)
        } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark'); 
        setDarkMode(true)
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout');
            const data = await response.json();
    
            if (data.isLoggedOut) {
                console.log("User logged out successfully");
                setUserId(null); 
                setIsMenuVisible(false)
                route.push("/")
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
        <section className='h-16 flex items-center px-5 z-50'>
            <header className='max-w-7xl mx-auto flex justify-between items-center w-full'>
                <Link href={"/"} className='heading font-bold text-2xl'>blogger</Link>
                <nav className='flex items-center gap-3'>
                    <div className={`flex flex-col pt-24 items-center gap-3 text-base fixed top-0 left-0 bottom-0 background sm:bg-transparent w-full z-10 sm:flex-row sm:pt-0 sm:relative ${isMenuVisible ? 'flex' : 'hidden sm:flex'} `}>
                        <IoCloseSharp className='fixed right-4 top-4 text-2xl font-bold cursor-pointer sm:hidden' onClick={() => setIsMenuVisible(false)} />
                        <Link href={"/"} className={`font-semibold heading `} onClick={() => setIsMenuVisible(false)}>Home</Link>
                        <Link href={"#newsletter"} className='font-semibold heading' onClick={() => setIsMenuVisible(false)}>Newsletter</Link>
                        {
                            userId
                            ? (<Link href={"/create-post"} className='transparentBtn text-base flex items-center' onClick={() => setIsMenuVisible(false)}>
                                <IoCreateOutline className='heading text-base font-bold'/>&nbsp;
                                <span>Write Blog</span>
                            </Link>)
                            : (<Link href={"/login"} className='transparentBtn text-base' onClick={() => setIsMenuVisible(false)}>Login</Link>)
                        }
                        {
                            userId
                            ? (<button onClick={handleLogout} className='primaryBtn text-base outline-none' >Logout</button>)
                            : (<Link href={"/register"} className='primaryBtn text-base outline-none' onClick={() => setIsMenuVisible(false)}>Create account</Link>)
                        }
                        
                    </div>
                    <GiHamburgerMenu className='primary text-2xl cursor-pointer sm:hidden' onClick={() => setIsMenuVisible(true)} />
                    {userId && <Link title='dashboard' href={"/dashboard"}>
                        <FaCircleUser className='heading text-xl cursor-pointer' />
                    </Link>}
                    <div className='cursor-pointer'>
                    {
                        isDarkMode
                        ?(<MdOutlineToggleOff className='primary text-2xl' onClick={()=>{setDarkMode(false);toggleTheme()}} />)
                        :(<MdOutlineToggleOn className='primary text-2xl' onClick={()=>{setDarkMode(true);toggleTheme()}}/>)
                    }
                    </div>
                </nav>

            </header>
        </section>
        </>
    );
};

export default Header;
