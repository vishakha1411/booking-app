# 🏡 Airbnb Clone - Full-Stack Booking Platform

**Live Demo:** [https://vishakha-airbnb-clone.vercel.app/](https://vishakha-airbnb-clone.vercel.app/)

## 🌟 Key Features

### Property Management
- Browse all available accommodations
- View detailed property information (description, amenities, pricing)

### User System
- Secure registration with email/password
- JWT-based authentication
- User profile management
- Booking history tracking

### Host Functionality
- Add new accommodations with:
  - Title, description, and location details
  - Multiple photo uploads (via URL or local files)
  - Pricing and availability calendar
  - Amenities and house rules
- Edit/update existing listings
- View booking requests for owned properties

### Booking System
- Reserve available properties with specific dates
- Manage upcoming and past bookings
- View booking confirmation details

## 🛠 Tech Stack

**Frontend:**
- React.js with hooks
- Tailwind CSS for styling
- Context API for state management
- Axios for API calls

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT authentication
- Supabase Storage for image hosting

**Deployment:**
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## 🔧 Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/airbnb-clone.git
   cd airbnb-clone
   ```

2. **Backend setup**
   ```bash
   cd api
   npm install
   cp .env.example .env
   # Update .env with your credentials
   ```

3. **Frontend setup**
   ```bash
   cd ../client
   npm install
   ```

4. **Run development servers**
   - Backend: `node index.js` (from backend directory)
   - Frontend: `npm run dev` (from frontend directory)


## 🚀 Deployment

1. **Frontend:**
   - Build with `npm run build`
   - Deploy to Vercel

2. **Backend:**
   - Set environment variables in production
   - Deploy to Vercel

3. **Database:**
   - MongoDB Atlas cluster

