import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import {Navigate, useParams } from 'react-router-dom'
import AccountNav from '../AccountNav';
import axios from 'axios';


function ProfilePage() {
    const { user,setuser } = useContext(UserContext);
    const [redirect,setredirect]=useState(false)
    const logout=async ()=>{
        await axios.post('/logout')
        setredirect(true)
        setuser({})
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <>
        <AccountNav/>
        <div className='flex flex-col justify-center items-center mt-20 gap-4'>
            Logged in as {user.name} ({user.email})
            <button className='rounded-full px-4 py-2 bg-red-500 text-white w-36' onClick={logout}>Logout</button>
        </div>
        </>
    )
}

export default ProfilePage