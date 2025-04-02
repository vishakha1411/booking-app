import React, { useState, useRef, useEffect } from 'react'
import AccountNav from '../AccountNav'
import { Navigate, useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';

function PlacesformPage() {
    const [photoLink, setPhotoLink] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setredirect] = useState(false)

    const { id } = useParams()
    useEffect(() => {
        if (!id) return;
        console.log(id)
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function preInput(header, text) {
        return (
            <>
                <h2 className="text-2xl mt-4">{header}</h2>
                <p className="text-gray-500 text-sm">{text}</p>
            </>
        );
    }
    const addphotobylink = async (e) => {
        e.preventDefault();
        console.log('hello')
        try {
            // Correctly handle the response from axios
            const response = await axios.post('/upload-link', { link: photoLink }); // E
            const filename = await response.data; // Assuming the API returns the filename directly in the data

            console.log(filename); // Log the filename to check if it is received correctly

            // Update the state with the new photo
            setAddedPhotos(prev => [...prev, filename]);
            setPhotoLink(''); // Clear the input after adding
        } catch (error) {
            console.error("Error uploading photo by link:", error); // Handle errors
        }
    };
    const uploadimg = async (e) => {
        const files = e.target.files;
        console.log(files)
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        await axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        })
    }
    const addnewplace = async (e) => {
        e.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price,
        };
        if (id) {
            axios.put('/places/' + id, { id, ...placeData })
        }
        else {

            const { data } = await axios.post('/places', placeData)
        }
        setredirect(true)
    }
    const deletephoto = (e, link) => {
        e.preventDefault();
        setAddedPhotos([...addedPhotos.filter(item => item !== link)])
    }
    const makemain=(e,link)=>{
        e.preventDefault();
        const newphotos=addedPhotos.filter(item => item !== link);
        setAddedPhotos([link,...newphotos])
    }
    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div>
            <AccountNav />
            <form className='m-4 p-4 flex flex-col gap-3 2xl:w-[80vw] 2xl:m-auto' onSubmit={addnewplace}>
                {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                <input type="text" name="" id="" placeholder='title' value={title} onChange={e => setTitle(e.target.value)} />
                {preInput('Address', 'Address to this place')}
                <input type="text" name="" id="" placeholder='address' value={address} onChange={e => setAddress(e.target.value)} />
                {preInput('Photos', 'more = better')}
                <div className='flex gap-2'>
                    <input type="text" name="" id="" placeholder='upload using link...jpg' className='rounded-full bg-gray-100 w-7/12' value={photoLink}
                        onChange={ev => setPhotoLink(ev.target.value)} />
                    <button className=' bg-red-500 text-white py-1 px-6 rounded-full w-2/12' onClick={addphotobylink}>Add</button>
                </div>
                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {addedPhotos.length > 0 && addedPhotos.map(link => {
                        return (
                            <div key={link} className='h-32 flex relative'>
                                <img src={'https://gfkpzeerthdjbecovwuu.supabase.co/storage/v1/object/public/airbnb//' + link} alt="" className="rounded-2xl w-full object-cover" />
                                <button className="cursor-pointer absolute top-24 right-1 text-white bg-black bg-opacity-50 rounded-2xl p-2" onClick={(e) => deletephoto(e, link)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                                <button className="cursor-pointer absolute top-24 left-1 text-white bg-black bg-opacity-50 rounded-2xl p-2" onClick={(e) => makemain(e, link)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={link===addedPhotos[0]?"white":"none"} className="w-4 h-4" strokeWidth={1.5} stroke="currentColor">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
                <label className='bg-gray-200 w-36 flex gap-2 h-16 items-center justify-center rounded-lg border-gray-400 border'>
                    <input type="file" multiple className='hidden' onChange={uploadimg} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Upload
                </label>
                {preInput('Description', 'description of the place')}
                <textarea name="" placeholder='description' className='rounded-lg border border-gray-400 px-3 py-2 my-2 h-36' value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Perks', 'select all the perks of your place')}
                <Perks selected={perks} onChange={setPerks} />
                {preInput('Extra info', 'house rules, etc')}
                <textarea name="" id="" className='border border-gray-400 rounded-lg p-2' value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3>Check in time</h3>
                        <input type="text" name="" id="" className='border border-gray-300 px-2' value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder="14" />
                    </div>
                    <div>
                        <h3>Check Out time</h3>
                        <input type="text" name="" id="" className='border border-gray-300 px-2' value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder="11" />
                    </div>
                    <div>
                        <h3>Max number of guests</h3>
                        <input type="number" name="" id="" className='border border-gray-300 rounded-full p-2' value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3>price per night</h3>
                        <input type="number" name="" id="" className='border border-gray-300 rounded-full p-2' value={price}
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <button className=' bg-red-500 text-white py-2 px-6 mt-4 rounded-full' onClick={addnewplace}>Save</button>
            </form>
        </div>
    )
}

export default PlacesformPage