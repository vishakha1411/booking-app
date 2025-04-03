const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const Place = require('./models/Places.js');
const Booking = require('./models/Bookings.js');

const app = express();
const port = process.env.PORT || 3000;
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || 'fasefraw4r5r3wq45wdfgw34twdfg';

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL || 'https://booking-app-clone-alsaycanb-vishakha-agrawals-projects.vercel.app',
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Helper function to verify JWT
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

// Routes
app.get('/api/getplaces', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Access Denied: No token provided' });

    const userData = await verifyToken(token);
    const places = await Place.find({ owner: userData.id });
    res.json(places);
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

app.put('/api/places/:id', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const userData = await verifyToken(token);
    const placeDoc = await Place.findById(req.params.id);

    if (!placeDoc) return res.status(404).json({ message: 'Place not found' });
    if (placeDoc.owner.toString() !== userData.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, address, addedPhotos, description, price, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;
    
    placeDoc.set({
      title, address, photos: addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests, price,
    });
    
    await placeDoc.save();
    res.json('ok');
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/places', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const userData = await verifyToken(token);
    const place = new Place({
      owner: userData.id,
      ...req.body
    });

    await place.save();
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/upload-link', async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) return res.status(400).json({ error: 'Link is required' });

    const response = await fetch(link);
    if (!response.ok) throw new Error('Failed to fetch image');

    const imageBuffer = await response.arrayBuffer();
    const fileName = `photo-${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from('airbnb')
      .upload(fileName, Buffer.from(imageBuffer), {
        contentType: 'image/jpeg',
      });

    if (error) throw error;
    res.json(fileName);
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.post('/api/booking', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const userData = await verifyToken(token);
    const booking = new Booking({
      user: userData.id,
      ...req.body
    });

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/booking', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const userData = await verifyToken(token);
    const bookings = await Booking.find({ user: userData.id }).populate('place');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload', upload.array('photos', 50), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const fileName = `photo-${Date.now()}-${file.originalname}`;
        const { error } = await supabase.storage
          .from('airbnb')
          .upload(fileName, file.buffer, { contentType: file.mimetype });

        if (error) throw error;
        return fileName;
      })
    );

    res.json(uploadedFiles);
  } catch (err) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

app.get('/api/places/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/booking/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('place');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, pass } = req.body;
    if (!email || !pass) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const passOk = bcrypt.compareSync(pass, user.password);
    if (!passOk) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      jwtSecret,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 86400000 // 1 day
    }).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    if (!name || !email || !pass) return res.status(400).json({ message: 'All fields are required' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(pass, bcryptSalt)
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json(null);

    const userData = await verifyToken(token);
    res.json(userData);
  } catch (error) {
    res.status(403).json(null);
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  }).json({ message: 'Logged out successfully' });
});

app.get('/api/allplaces', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
