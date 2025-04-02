import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PlacesPage = () => {
  const [places, setplaces] = useState([])
  useEffect(() => {
    axios.get('/getplaces').then(({ data }) => {
      setplaces(data)
    })
  }, [])
  return (
    <div>
      <AccountNav />
      <div className="text-center mt-7 xl:w-[70vw] xl:m-auto xl:mt-8">
        <Link className="inline-flex gap-1 bg-red-500 text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          Add new place
        </Link>
      </div>
      
      <div className="mt-4 xl:w-[70vw] xl:m-auto xl:mt-6">
      <div className='rounded-full text-white bg-red-500 px-3 py-2 inline-block mb-2'>My Places</div>
        {places.length > 0 && places.map(item => (
          <Link to={'/account/places/' + item._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl my-2">
            <div className="flex max-h-40 shrink-0">
              {item.photos && item.photos.length > 0 && 
                <img src={'https://gfkpzeerthdjbecovwuu.supabase.co/storage/v1/object/public/airbnb//' + item.photos[0]} alt='' className='object-cover rounded-xl' width={250}/>
            }
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-xl">{item.title}</h2>
              <p className="text-sm mt-2">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PlacesPage