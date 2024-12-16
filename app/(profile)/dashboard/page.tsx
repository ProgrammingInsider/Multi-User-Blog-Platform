'use client'
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiDotsHorizontal } from "react-icons/hi";

const Dashboard = () => {
  const [optionsNumber, setOptionsNumber] = useState<number>(-1)

  const handleOptions = (num:number) => {
    if(num !== optionsNumber){
      setOptionsNumber(num);
    }else{
      setOptionsNumber(-1);
    }
  }
  return (
    <div className="background p-6 rounded-lg w-10/12 min-h-screen sm:w-full">
      <h1 className="text-xl font-bold mb-8">Blog lists</h1>

      <div className="overflow-x-auto w-full custom-scrollbar rounded-lg">
        <table className="border-collapse w-full para">
          <thead className='secondaryBg'>
            <tr>
              <th className="tableBorder px-4 py-2 w-1/6 font-extrabold text-left">SI No:</th>
              <th className="tableBorder px-4 py-2 w-4/6 font-extrabold text-left">Blog name</th>
              <th className="tableBorder px-4 py-2 w-1/4 font-extrabold text-left">Release Date</th>
              <th className="tableBorder px-4 py-2 w-1/6 font-extrabold text-left">Status</th>
              <th className="tableBorder px-4 py-2 w-1/4 font-extrabold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tableBorder px-4 py-2">01</td>
              <td className="tableBorder px-4 py-2">
                <div className='flex gap-4 items-center'>
                  <div className="w-8 h-8">
                    <Image src="/images/blog1.png" alt='Blog Image' width={40} height={40} className="w-full h-full object-cover" priority />
                  </div>
                  Conversation with London Makr & co.
                </div>
              </td>
              <td className="tableBorder px-4 py-2">20 Jan 2024</td>
              <td className="tableBorder px-4 py-2">
                <button className="active activeBorder p-2 rounded-lg font-bold">
                  PUBLISHED
                </button>
              </td>
              <td className="tableBorder px-4 py-2 relative">
                <div className='h-full w-full flex justify-center items-center rounded-lg hover:secondaryBg' onClick={()=>{handleOptions(1)}}>
                  <HiDotsHorizontal className='heading text-2xl cursor-pointer' />
                </div>
                {
                  (optionsNumber == 1) && (
                    <div className='absolute primaryBg primaryBtnText flex flex-col gap-1 bottom-1/4 right-2/3 rounded-lg z-30'>
                      <Link href={''} className='tableBorder p-2 hover:font-bold'>Edit</Link>
                      <Link href={''} className='p-2 hover:font-bold'>Delete</Link>
                    </div>
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="tableBorder px-4 py-2">02</td>
              <td className="tableBorder px-4 py-2">
                <div className='flex gap-4 items-center'>
                  <div className="w-8 h-8">
                    <Image src="/images/blog1.png" alt='Blog Image' width={40} height={40} className="w-full h-full object-cover" priority />
                  </div>
                  Conversation with London Makr & co.
                </div>
              </td>
              <td className="tableBorder px-4 py-2">20 Jan 2024</td>
              <td className="tableBorder px-4 py-2">
                <button className="active activeBorder p-2 rounded-lg font-bold draftBorder draft">
                  DRAFTED
                </button>
              </td>
              <td className="tableBorder px-4 py-2">
                <div className='h-full w-full flex justify-center items-center rounded-lg hover:secondaryBg'>
                  <HiDotsHorizontal className='heading text-2xl cursor-pointer' />
                </div>
              </td>
            </tr>
            <tr>
              <td className="tableBorder px-4 py-2">03</td>
              <td className="tableBorder px-4 py-2">
                <div className='flex gap-4 items-center'>
                  <div className="w-8 h-8">
                    <Image src="/images/blog1.png" alt='Blog Image' width={40} height={40} className="w-full h-full object-cover" priority />
                  </div>
                  Conversation with London Makr & co.
                </div>
              </td>
              <td className="tableBorder px-4 py-2">20 Jan 2024</td>
              <td className="tableBorder px-4 py-2">
                <button className="active activeBorder p-2 rounded-lg font-bold">
                  PUBLISHED
                </button>
              </td>
              <td className="tableBorder px-4 py-2">
                <div className='h-full w-full flex justify-center items-center rounded-lg hover:secondaryBg'>
                  <HiDotsHorizontal className='heading text-2xl cursor-pointer' />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
