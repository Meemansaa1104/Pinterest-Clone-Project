"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillBell } from "react-icons/ai";
import { HiChat } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react"
import {doc, setDoc, getFirestore } from "firebase/firestore";
import app from './../Shared/firebaseConfig';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const db = getFirestore(app);

  useEffect(()=>{
    saveUserInfo();
  },[session])

  
   const saveUserInfo=async() => {
    if(session?.user)
    {
      await setDoc(doc (db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image 
      });
      
    }
   }

   const onCreateClick = () => {
    if(session){
      router.push("/pin-builder")
    }
    else{
      signIn()
    }
   }


  return (
    <div className='flex gap-3 md:gap-2 items-center p-6'>
        <Image src="/pinterest-logo-png-1982.png" alt='logo' width={50} height={50}
        className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
        onClick = {()=>router.push('/')}/>
        <button className = 'bg-white text-black p-2 px-4 rounded-full hidden md:block'>
          Home
        </button>
        <button className = 'bg-black text-white font-semibold p-2 px-4 rounded-full'
        onClick={()=>onCreateClick()}>
          Create
        </button>
        <div className = 'bg-slate-600 p-3 w-full gap-3 items-center rounded-full hidden md:flex'>
            <AiOutlineSearch className='text-[25px] text-gray-300 font-semibold'/>
            <input type='text' placeholder='Search' className='bg-transparent outline-none' />
        </div>
        <AiOutlineSearch className='text-[25px] text-gray-300 md:hidden'/>
        < AiFillBell className = 'text-[40px] text-gray-300'/>
        < HiChat className = 'text-[40px] text-gray-300'/>
       {session?.user? <Image src={session.user.image} alt='person' width={50} height={50}
        className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
        onClick={()=>router.push('/'+session.user.email)}/>:
         <button onClick={() => signIn()} className = 'bg-black text-white font-semibold p-2 px-4 rounded-full'>
          Login
        </button>}
    </div>
  )
}

export default Header