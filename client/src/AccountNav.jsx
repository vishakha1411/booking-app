import React from 'react';
import { NavLink} from 'react-router-dom';

function AccountNav() {

  return (
    <div>
      <nav className='flex justify-center mt-4 gap-3'>
        <NavLink
          to='/account/profile'
          className={({ isActive }) =>
            isActive
              ? 'py-2 px-6 rounded-full bg-red-500 text-white'
              : 'py-2 px-6 rounded-full'
          }
        >
          My Profile
        </NavLink>
        <NavLink
          to='/account/bookings'
          className={({ isActive }) =>
            isActive
              ? 'py-2 px-6 rounded-full bg-red-500 text-white'
              : 'py-2 px-6 rounded-full'
          }
        >
          My Bookings
        </NavLink>
        <NavLink
          to='/account/places'
          className={({ isActive }) =>
            isActive
              ? 'py-2 px-6 rounded-full bg-red-500 text-white'
              : 'py-2 px-6 rounded-full'
          }
        >
          My Accommodations
        </NavLink>
      </nav>
    </div>
  );
}

export default AccountNav