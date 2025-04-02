import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
    const [places, setplaces] = useState([])
    useEffect(() => {
        axios.get('/allplaces').then(response => {
            setplaces(response.data);
        })
    }, [])
    return (
        <div className='grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 mt-6 gap-4 m-auto'>
            {places.length > 0 && places.map(place => (
                <Link to={'/place/'+place._id} className='flex flex-col p-4'>
                    {place.photos.length > 0 && (
                        <div className='flex rounded-2xl mb-2 '>
                            <img src={'https://gfkpzeerthdjbecovwuu.supabase.co/storage/v1/object/public/airbnb//' + place.photos[0]} alt="" className='object-cover rounded-2xl aspect-square' />
                        </div>)}
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-sm text-gray-500">{place.title}</h3>
                    <div className="mt-1">
                        <span className="font-bold">${place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default MainPage