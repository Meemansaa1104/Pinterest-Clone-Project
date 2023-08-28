import React from 'react';
import Image from 'next/image';
import { signOut,useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

const UserInfo = ({userInfo}) => {
    console.log(userInfo);
    const router = useRouter();
    const {data:session} = useSession();
    const onLogoutClick = () => {
      signOut();
      router.push('/');
    }
  return (
    <div className='flex flex-col items-center'>
        <Image src = {userInfo.userImage}
        alt = "userImage"
        width={80}
        height={80}
        className = "rounded-full"/>

        <h2 className='text-[30px]
        font-semibold'>{userInfo.userName}</h2>

        <h2 className='text-gray-500 mt-4'>{userInfo.email}</h2>

        <div className='flex gap-4'>
          <button className = 'bg-gray-600 p-2 px-3 font-semibold mt-5 rounded-full'>Share</button>
          {session?.user.email==userInfo.email?
            <button className = 'bg-gray-600 p-2 px-3 font-semibold mt-5 rounded-full'
            onClick={()=>onLogoutClick()}>Logout</button>
          :null}
        </div>
    </div>
  )
}

export default UserInfo