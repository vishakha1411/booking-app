import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { differenceInCalendarDays } from "date-fns"
import Images from '../Images.jsx'

const PlacePage = () => {
  const { id } = useParams()
  const [place, setplace] = useState([])
  const [showall, setshowall] = useState(false)
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setredirect] = useState('')

  let noofnights = 0;
  if (checkIn && checkOut) {
    noofnights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  }
  useEffect(() => {
    if (!id) return;
    axios.get('/places/' + id).then(response => {
      setplace(response.data)
    })
  }, [id]);

  const booknow = async (e) => {
    e.preventDefault();
    const response = await axios.post('/booking', {
      place: place._id, checkIn, checkOut, numberOfGuests, name, phone,
      price: noofnights * place.price
    })
    const bookid = response._id;
    setredirect('/account/bookings/' + bookid)
  }
  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className='mt-4 bg-gray-100 2xl:w-[80vw] 2xl:m-auto'>
      <div className="m-10">
        <h1 className="text-2xl ">{place.title}</h1>
        <div className='flex gap-2 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <a className="flex gap-1 font-semibold underline my-2" target="_blank" href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
        </div>
        <Images place={place} />
      </div>
      <div className="px-10 my-6 flex gap-4">

        <div>
          <div className="mb-4">
            <h2 className="font-semibold text-xl">Description</h2>
            {place.description}
          </div><div>
            <span className="font-semibold"> Check-in: </span>{place.checkIn}<br />
            <span className="font-semibold"> Check-Out: </span> {place.checkOut}<br />
            <span className="font-semibold"> Max-Guests: </span> {place.maxGuests}</div></div>
        <div className="book flex flex-col bg-white rounded-2xl py-4 px-6 shadow-md">
          <div className="text-lg text-center mb-4 font-bold">
            Price: ${place.price} / per night
          </div>
          <div className='flex border border-gray-200 p-2 gap-2 rounded-t-xl'>
            <div className='flex flex-col border-r border-r-gray-200 pr-2'>
              <label htmlFor="" className='font-semibold text-sm'>CheckIn:</label>
              <input type="date" name="" id="" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='font-semibold text-sm' >CheckOut:</label>
              <input type="date" name="" id="" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
          </div>
          <div className={`flex flex-col gap-1 p-2 border border-gray-200 ${noofnights > 0 ? '' : 'rounded-b-2xl'}`}>
            <label htmlFor="" className='font-semibold text-sm'>No. of Guests:</label>
            <input type="number" name="" id="" className='border border-black p-2 rounded-xl' onChange={(e) => setNumberOfGuests(e.target.value)} value={numberOfGuests} />
          </div>
          {noofnights > 0 && <div>
            <div className='flex flex-col gap-1 p-2 border border-gray-200'>
              <label htmlFor="" className='font-semibold text-sm'>Name:</label>
              <input type="text" name="" id="" className='border border-black rounded-2xl p-2' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1 p-2 border border-gray-200 rounded-b-2xl'>
              <label htmlFor="" className='font-semibold text-sm'>Contact Number:</label>
              <input type='tel' name="" id="" className='border border-black rounded-2xl p-2' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>}
          <button onClick={booknow} className='mt-4 rounded-2xl bg-red-500 text-white text-center px-4 py-2'>Book Now
            {noofnights > 0 && <div className='flex justify-center gap-2'><span className="font-semibold">Total: </span>${noofnights * place.price}</div>}</button>
        </div>

      </div>
      <div className="px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl px-8">Extra info</h2>
        </div>
        <div className="px-8 mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
      </div>
    </div>
  )
}

export default PlacePage
