import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

function Navbar() {
    const {user}=useContext(UserContext)
    return (
        
        <div>
            <div className='pt-4 pb-2 flex justify-around'>
                <Link to={'/'} className='flex text-red-600 gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className='font-bold text-xl'>Airbnb</span>
                </Link>
                <div className="flex gap-3 border border-gray-300 p-2 rounded-full px-4 shadow-md">
                    <div className='border-r border-l-gray-500 px-2'>Anywhere</div>
                    <div className='border-r border-l-gray-500 px-2'>Any week</div>
                    <div>Add guests</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 26" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white rounded-full bg-red-500 p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                <Link to={user?'/account/profile':'/login'} className="flex gap-3 border border-gray-300 p-2 rounded-full shadow-md items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white size-7 rounded-full bg-slate-500 p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    {!!user && <div>{user.name}</div>}
                </Link>
                </div>
            </div>
        
    )
}

export default Navbar