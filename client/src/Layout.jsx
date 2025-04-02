import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="px-2 flex flex-col min-h-screen max-w-full mx-auto">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout