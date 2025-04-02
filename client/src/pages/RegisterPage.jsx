import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

function RegisterPage() {
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [pass,setpass]=useState('')

  const handlesubmit= async (e)=>{
    e.preventDefault()
    //axios.get('/test')
    try {
      await axios.post('/register', {
        name,
        email,
        pass,
      });
      alert('Registration successful. Now you can log in');
    } catch (ev) {
      alert('Registration failed. Please try again later');
    }
    setname('')
    setemail('')
    setpass('')
  }

  return (
    <div className="m-auto flex items-center justify-center">
      <div className=" mb-40 flex flex-col gap-3 w-80">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={handlesubmit}>
          <input type="text"
                 placeholder="Name"
                 value={name}
                 onChange={e=>setname(e.target.value)}/>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={e=>setemail(e.target.value)}/>
          <input type="password"
                 placeholder="password"
                 value={pass}
                 onChange={e=>setpass(e.target.value)}/>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account? 
            <Link to={'/login'} className='font-bold'> Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage