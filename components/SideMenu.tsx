'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";

const SideMenu = () => {
    const[isMenuHide, setIsMenuHide] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setIsMenuHide(true);
            } else {
                setIsMenuHide(false);
            }
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    

  return (
    <nav className={`h-full flex flex-col absolute sm:relative background ${isMenuHide ? 'items-center w-14 px-0' :'w-60 max-w-60 px-3'}`}>
        <header 
        className={`flex items-center mb-1 heading font-bold text-lg py-2 px-3 rounded-lg cursor-pointer hover:secondaryBtnText ${isMenuHide ? 'justify-center' :'justify-end'}`} onClick={()=>setIsMenuHide(!isMenuHide)}>
            <FaBarsStaggered />
        </header>
        <Link 
        href={'/dashboard'} 
        className={`sideMenuLink ${isMenuHide ? 'justify-center  py-1 px-1' :'justify-normal'}`}>
            <LuLayoutDashboard />
            <span className={`${isMenuHide ? 'hidden' :'block'}`}>Dashboard</span>
        </Link>
        <Link 
            href={'/create-post'} 
            className={`sideMenuLink ${isMenuHide ? 'justify-center  py-1 px-1' :'justify-normal'}`}>
            <MdAdd />
            <span className={`${isMenuHide ? 'hidden' :'block'}`}>Create Blog</span>
        </Link>
        <Link 
            href={'/subscribers'} 
            className={`sideMenuLink ${isMenuHide ? 'justify-center  py-1 px-1' :'justify-normal'}`}>
            <IoPersonAdd />
            <span className={`${isMenuHide ? 'hidden' :'block'}`}>Subscribers</span>
        </Link>
    </nav>
  )
}

export default SideMenu