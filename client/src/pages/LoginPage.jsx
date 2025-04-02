import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'

function LoginPage() {
  const [pass, setpass] = useState('')
  const [email, setemail] = useState('')
  const [redirect, setredirect] = useState(false)
  const {setuser}=useContext(UserContext)

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const {data}=await axios.post('/login', { email, pass })
      setuser(data);
      alert('login successful')
      setredirect(true)
      
    } catch {
      alert('login failed')
    }
    
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="m-auto flex items-center justify-center">
      <div className="mb-40 flex flex-col gap-3 w-80">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="flex flex-col gap-3" onSubmit={handlesubmit}>
          <input type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setemail(e.target.value)} />
          <input type="password"
            placeholder="password"
            value={pass}
            onChange={e => setpass(e.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to={'/register'} className='font-bold'> Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage