import React, { useState,useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContext } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesformPage from './pages/PlacesformPage';
import MainPage from './pages/MainPage';
import PlacePage from './pages/PlacePage';
import BookingPage from './pages/BookingPage';
import BookingsPage from './pages/BookingsPage';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  const [user,setuser]=useState('')
  const [ready,setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({data}) => {
        setuser(data);
        setReady(true);
      });
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/account/profile',
          element: <ProfilePage />,
          
        },
        {
          path: '/account/bookings',
          element: <BookingsPage />,
        },
        {
          path: '/account/bookings/:id',
          element: <BookingPage />,
        },
        {
          path: '/account/places',
          element: <PlacesPage />,
        },
        {
          path: '/account/places/new',
          element: <PlacesformPage />,
        },
        {
          path: '/account/places/:id',
          element: <PlacesformPage />,
        },
        {
          path: '/place/:id',
          element: <PlacePage/>,
        },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={{user,setuser,ready}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
