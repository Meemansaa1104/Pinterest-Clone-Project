"use client"
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import app from '../Shared/firebaseConfig';
import UploadImage from './UploadImage';
import UserTag from './UserTag';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {doc, setDoc, getFirestore } from "firebase/firestore";

const Form = () => {

  const {data:session} = useSession();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [file, setFile] = useState();
  const [loading,setLoading]=useState(false);

  const router = useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const postId = Date.now().toString();

  const onSave = () => {
    setLoading(true);
    uploadFile();
  }

  const uploadFile = () => {
    const storageRef = ref(storage, 'pinterest/'+ file.name);
    uploadBytes(storageRef, file).then((snapshot)=>{
      console.log("File Uploaded");
    }).then(resp =>{
      getDownloadURL(storageRef).then(async(url)=>{
        console.log("DownloadURL",url);
        const postData = {
          title:title, 
          desc:desc,
          link:link,
          image:url,
          userName:session.user.name,
          email:session.user.email,
          userImage:session.user.image,
          id:postId
        }
        await setDoc(doc(db,'pinterest-post',postId),postData)
        .then(resp=>{
          console.log("Saved");
          setLoading(true);
          router.push('/'+session.user.email);
        })
      })
    })
  }


  return (
    <div className='bg-black p-1 rounded-2xl'>
        <div className='flex justify-end md-6 mb-9'>
            <button onClick={()=>onSave()} className='bg-blue-500 p-2 text-white font-semibold px-3 rounded-lg'>
              {loading? <Image src = '/loading.png.png'
              width = {30}
              height = {30}
              alt = 'loading'
              className = 'animate-spin'/>:
                <span>Save</span>}
            </button>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          <UploadImage setFile={(file)=>setFile(file)}/>
          <div className='col-span-2'>
            <div className='w-[100%]'>
              <input type='text' placeholder='Add your title'
              className='bg-black text-[35px] outline-none font-bold w-full
              border-b-[2px] border-gray-800 placeholder-gray-300'
              onChange={(e)=>setTitle(e.target.value)}/>
              <h2 className='text-[12px] w-full text-gray-400'>
                The first 40 characters are what usually show in feeds 
              </h2>
              <UserTag/>
              <textarea type='text' placeholder='Tell everyone what your pin is about'
              className='outline-none bg-gray-900 w-full pb-4 mt-8 text-[14px]'
              onChange={(e)=>setDesc(e.target.value)}/>

              <input type='text' placeholder='Add a destination link'
              className='outline-none w-full pb-4 mt-[90px] border-b-[2px]
              border-gray-300 bg-black placeholder-gray-300'
              onChange={(e)=>setLink(e.target.value)}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Form