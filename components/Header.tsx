'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineToggleOff } from "react-icons/md";
import { MdOutlineToggleOn } from "react-icons/md";


const Header = () => {
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

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

    return (
        <>
        <section className='h-16 flex items-center px-5'>
            <header className='max-w-7xl mx-auto flex justify-between items-center w-full'>
                <Link href={"/"} className='heading font-bold text-2xl'>blogger</Link>
                <nav className='flex items-center gap-3'>
                    <div className='hidden sm:flex items-center gap-3 text-base'>
                        <Link href={"/"} className='font-semibold heading'>Home</Link>
                        <Link href={"#"} className='font-semibold heading'>Newsletter</Link>
                        <Link href={"/login"} className='transparentBtn text-base'>Login</Link>
                        <Link href={"/register"} className='primaryBtn text-base outline-none'>Create account</Link>
                    </div>
                    <GiHamburgerMenu className='primary text-2xl cursor-pointer sm:hidden' />
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
