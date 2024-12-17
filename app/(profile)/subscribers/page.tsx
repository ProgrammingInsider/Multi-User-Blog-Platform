'use client'
import {useState} from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import Link from 'next/link';

const Subscribers = () => {
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
      <h1 className="text-xl font-bold mb-8">Subscribers</h1>

      <div className="overflow-x-auto w-full custom-scrollbar rounded-lg ">
        <table className="border-collapse w-full para">
          <thead className='secondaryBg'>
            <tr>
              <th className="tableBorder px-4 py-2 w-1/6 font-extrabold text-left">SI No:</th>
              <th className="tableBorder px-4 py-2 w-4/6 font-extrabold text-left">Subscriber&apos;s email</th>
              <th className="tableBorder px-4 py-2 w-1/4 font-extrabold text-left">Subscribed Date</th>
              <th className="tableBorder px-4 py-2 w-1/4 font-extrabold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tableBorder px-4 py-2">01</td>
              <td className="tableBorder px-4 py-2">
                  amanuelabera46@gmail.com
              </td>
              <td className="tableBorder px-4 py-2">20 Jan 2024</td>
              <td className="tableBorder px-4 py-2 relative">
                <div className='h-full w-full flex justify-center items-center rounded-lg hover:secondaryBg' onClick={()=>{handleOptions(1)}}>
                  <HiDotsHorizontal className='heading text-2xl cursor-pointer' />
                </div>
                {
                  (optionsNumber == 1) && (
                    <div className='absolute primaryBg primaryBtnText flex flex-col gap-1 bottom-1/4 right-2/3 rounded-lg'>
                      <Link href={''} className='p-2 hover:font-bold'>Delete</Link>
                    </div>
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="tableBorder px-4 py-2">02</td>
              <td className="tableBorder px-4 py-2">
                  roby4739@gmail.com
              </td>
              <td className="tableBorder px-4 py-2">20 Dec 2024</td>
              <td className="tableBorder px-4 py-2 relative">
                <div className='h-full w-full flex justify-center items-center rounded-lg hover:secondaryBg' onClick={()=>{handleOptions(2)}}>
                  <HiDotsHorizontal className='heading text-2xl cursor-pointer' />
                </div>
                {
                  (optionsNumber == 2) && (
                    <div className='absolute primaryBg primaryBtnText flex flex-col gap-1 bottom-1/4 right-2/3 rounded-lg'>
                      <Link href={''} className='p-2 hover:font-bold'>Delete</Link>
                    </div>
                  )
                }
              </td>
            </tr>
            <tr>
              <td className="tableBorder px-4 py-2">03</td>
              <td className="tableBorder px-4 py-2">
                  aberakd@gmail.com
              </td>
              <td className="tableBorder px-4 py-2">14 Apr 2024</td>
              <td className="tableBorder px-4 py-2 relative">
                <div className='h-full w-full flex justify-center items-center rounded-lg hover:secondaryBg relative' onClick={()=>{handleOptions(3)}}>
                  <HiDotsHorizontal className='heading text-2xl cursor-pointer' />
                </div>
                {
                  (optionsNumber == 3) && (
                    <div className='absolute primaryBg primaryBtnText flex flex-col gap-1 bottom-1/4 right-2/3 rounded-lg z-30'>
                      <Link href={''} className='p-2 hover:font-bold'>Delete</Link>
                    </div>
                  )
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Subscribers