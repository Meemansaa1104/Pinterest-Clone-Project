"use client"
import React, { useState } from 'react'
import { HiArrowUpCircle } from "react-icons/hi2";

const UploadImage = ({setFile}) => {
  
  const [selectedFile, setSelectedFile] = useState();

  return (
    <div className='h-[450px] bg-gray-300'>
        <label className='m-5 flex flex-col justify-center items-center
        cursor-pointer h-[90%] border-[2px] border-gray-400 border-dashed
        rounded-lg text-gray-600'>
            {!selectedFile?
              <div className='flex items-center flex-col'>
                <HiArrowUpCircle className='text-[22px]'/>
                <h2 className='font-semibold'>Click to Upload</h2>
            </div>
            :null}
            {selectedFile?
            <img src={window.URL.createObjectURL(selectedFile)}
            alt='selected-img'
            width={500}
            height={800}
            priority={true}
            className='object-contain h-[90%]'/>:null}
            <input id='dropzone-file' type='file' className="hidden"
            onChange={(e)=>{setFile(e.target.files[0]);
            setSelectedFile(e.target.files[0])}}/>
        </label>
    </div>
  )
}

export default UploadImage