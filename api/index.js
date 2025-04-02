// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// require('dotenv').config()
// const { default: mongoose } = require('mongoose')
// const User = require('./models/User.js');
// const download = require('image-downloader');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const cookieparser = require('cookie-parser')
// const path = require('path');
// const multer = require('multer')
// const fs = require('fs')
// const app = express()
// const port = 3000
// const bcryptSalt = bcrypt.genSaltSync(10)
// const Place = require('./models/Places.js')
// const Booking =require('./models/Bookings.js')

// app.use(cors({
//   credentials: true, 
//   origin: 'http://localhost:5173',
// }))
// app.use(bodyParser.json())
// app.use(cookieparser()) 
// app.use('/uploads', express.static(__dirname + '/uploads'));
// mongoose.connect("mongodb://localhost:27017/test")
// const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
// const photosMiddleware = multer({ dest: 'uploads/' })

// app.get('/getplaces', async (req, res) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied: No token provided' });
//   }

//   jwt.verify(token, jwtSecret, {}, async (err, data) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }

//     try {
//       const { id } = data; // Get the user ID from the decoded token
//       const places = await Place.find({ owner: id }); // Fetch places where owner matches the user ID
//       res.json(places); // Send the places as JSON response
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching places', error });
//     }
//   });
// });

// app.put('/places/:id', async (req,res)=>{
//   const {token}=req.cookies;
//   const {id,title, address, addedPhotos, description, price,
//     perks, extraInfo, checkIn, checkOut, maxGuests,}=req.body;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//       if (err) throw err;
//       const placeDoc = await Place.findById(id);
//       if(placeDoc.owner.toString()==userData.id){
//         placeDoc.set({
//           title:title,address:address,photos:addedPhotos,description:description,
//           perks:perks,extraInfo:extraInfo,checkIn:checkIn,checkOut:checkOut,maxGuests:maxGuests,price:price,
//         });
//         await placeDoc.save()
//         res.json('ok')
//       }
//   })
// })

// app.post('/places', (req, res) => {
//   const token = req.cookies.token;
//   const {
//     title, address, addedPhotos, description, price,
//     perks, extraInfo, checkIn, checkOut, maxGuests,
//   } = req.body;
//   jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
//     if (err) throw err;

//     let place = new Place({
//       owner: userdata.id,
//       title:title,address:address,photos:addedPhotos,description:description,
//           perks:perks,extraInfo:extraInfo,checkIn:checkIn,checkOut:checkOut,maxGuests:maxGuests,price:price,
//     })
//     place.save(); 
//   })
//   res.json('done')
// })

// app.post('/upload-link', async (req, res) => {
//   const { link } = req.body;
//   console.log('Received request to /upload-link');
//   // Construct a new file name
//   const newName = 'photo' + Date.now() + '.jpg';
//   const destPath = path.join(__dirname, 'uploads', newName); // Use path.join for correct path

//   const options = { 
//     url: link,
//     dest: destPath // Destination path where the image will be saved
//   };

//   try {
//     // Await the download to finish
//     const { filename } = await download.image(options);
//     console.log('Saved to', filename); // Log the filename where the image was saved

//     // Send the new filename back to the client
//     res.json('uploads/' + newName);
//   } catch (err) {
//     console.error('Error downloading image:', err); 
//     // Send a failure response to the client 
//     res.status(500).json({ error: 'Failed to download image' });
//   }
// });
 
// app.post('/booking',async (req,res)=>{
//   const {token}=req.cookies;
//   const {place,checkIn,checkOut,numberOfGuests,name,phone,price
//   }=req.body;
//   jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
//     if (err) throw err; 
//     let booking=new Booking({
//       place,checkIn,checkOut,numberOfGuests,name,phone,price,
//       user:userdata.id,
//     })
//     await booking.save()
//     res.json(booking)
//   })
// })

// app.get('/booking',(req,res)=>{
//   const {token}=req.cookies;
//   jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
//     if (err) throw err;
//     res.json(await Booking.find({user:userdata.id}).populate('place'))
//   })
// })

// app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
//   console.log(req.files)
//   const uploadedfiles = []
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname } = req.files[i]
//     const parts = originalname.split('.')
//     const newpath = path + '.' + parts[parts.length - 1]
//     fs.renameSync(path, newpath)
//     uploadedfiles.push(newpath)
//   }
//   console.log(uploadedfiles)
//   res.json(uploadedfiles)
// })

// app.get('/places/:id',async (req,res)=>{
//   const {id}=req.params;
//   res.json(await Place.findById(id))
// })
// app.get('/booking/:id',async (req,res)=>{
//   const {id}=req.params;
//   res.json(await Booking.findById(id).populate('place'))
// })

// app.post('/login', async (req, res) => {
//   const { email, pass } = req.body;
//   const doc = await User.findOne({ email: email })
//   if (doc) {
//     const passok = bcrypt.compareSync(pass, doc.password)
//     if (passok) {
//       jwt.sign({ email: doc.email, id: doc._id, name: doc.name }, jwtSecret, {}, (err, token) => {
//         if (err) throw err;
//         res.cookie('token', token).json(doc);
//       })
//     }
//     else res.status(422).json('pass not ok');
//   } else {
//     res.json('not found, register!')
//   }
// })

// app.post('/register', (req, res) => {
//   const { name, email, pass } = req.body;
//   let user = new User({
//     name,
//     email,
//     password: bcrypt.hashSync(pass, bcryptSalt)
//   })
//   user.save()
//   res.json(user)
// })

// app.get('/profile', (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, jwtSecret, {}, (err, data) => {
//       if (err) throw err;
//       res.json(data)
//     })
//   } else {
//     res.json(null)
//   }
// })

// app.post('/logout', (req, res) => {
//   res.cookie('token', '').json(true);
// })

// app.get('/allplaces',async (req,res)=>{
//   res.json(await Place.find())
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })  
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const User = require('./models/User.js');
const download = require('image-downloader');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const path = require('path');
const multer = require('multer')
const fs = require('fs')
const app = express()
const port = 3000
const bcryptSalt = bcrypt.genSaltSync(10)
const Place = require('./models/Places.js')
const Booking =require('./models/Bookings.js')
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


app.use(cors({ 
  credentials: true,
  origin: 'http://localhost:5173',
}))
app.use(bodyParser.json())
app.use(cookieparser()) 

const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


app.get('/api/getplaces', async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  jwt.verify(token, jwtSecret, {}, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    try {
      const { id } = data; // Get the user ID from the decoded token
      const places = await Place.find({ owner: id }); // Fetch places where owner matches the user ID
      res.json(places); // Send the places as JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error fetching places', error });
    }
  });
});

app.put('/api/places/:id', async (req,res)=>{
  mongoose.connect(process.env.MONGO_URL);
  const {token}=req.cookies;
  const {id,title, address, addedPhotos, description, price,
    perks, extraInfo, checkIn, checkOut, maxGuests,}=req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if(placeDoc.owner.toString()==userData.id){
        placeDoc.set({
          title:title,address:address,photos:addedPhotos,description:description,
          perks:perks,extraInfo:extraInfo,checkIn:checkIn,checkOut:checkOut,maxGuests:maxGuests,price:price,
        });
        await placeDoc.save()
        res.json('ok')
      }
  })
})

app.post('/api/places', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const token = req.cookies.token;
  const {
    title, address, addedPhotos, description, price,
    perks, extraInfo, checkIn, checkOut, maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
    if (err) throw err;

    let place = new Place({
      owner: userdata.id,
      title:title,address:address,photos:addedPhotos,description:description,
          perks:perks,extraInfo:extraInfo,checkIn:checkIn,checkOut:checkOut,maxGuests:maxGuests,price:price,
    })
    await place.save(); 
  })
  res.json('done')
})

app.post('/api/upload-link', async (req, res) => {
  const { link } = req.body;
  console.log('Uploading image to Supabase Storage...');

  try {
    const response = await fetch(link);
    const imageBuffer = await response.arrayBuffer();
    const fileName = `photo-${Date.now()}.jpg`;

    // Upload to Supabase Storage
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

 
app.post('/api/booking',async (req,res)=>{
  mongoose.connect(process.env.MONGO_URL);
  const {token}=req.cookies;
  const {place,checkIn,checkOut,numberOfGuests,name,phone,price
  }=req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
    if (err) throw err; 
    let booking=new Booking({
      place,checkIn,checkOut,numberOfGuests,name,phone,price,
      user:userdata.id,
    })
    await booking.save()
    res.json(booking)
  })
})

app.get('/api/booking',(req,res)=>{
  mongoose.connect(process.env.MONGO_URL);
  const {token}=req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
    if (err) throw err;
    res.json(await Booking.find({user:userdata.id}).populate('place'))
  })
})

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload', upload.array('photos', 50), async (req, res) => {
  try {
    const uploadedFiles = [];

    for (const file of req.files) {
      const fileName = `photo-${Date.now()}-${file.originalname}`;
      const { data, error } = await supabase.storage
        .from('airbnb')
        .upload(fileName, file.buffer, { contentType: file.mimetype });

      if (error) throw error;

      
      uploadedFiles.push(fileName);
    }

    console.log('Uploaded files:', uploadedFiles);
    res.json(uploadedFiles);

  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).json({ error: 'File upload failed' });
  }
});


app.get('/api/places/:id',async (req,res)=>{
  mongoose.connect(process.env.MONGO_URL);
  const {id}=req.params;
  res.json(await Place.findById(id))
})
app.get('/api/booking/:id',async (req,res)=>{
  mongoose.connect(process.env.MONGO_URL);
  const {id}=req.params;
  res.json(await Booking.findById(id).populate('place'))
})

app.post('/api/login', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, pass } = req.body;
  const doc = await User.findOne({ email: email })
  if (doc) {
    const passok = bcrypt.compareSync(pass, doc.password)
    if (passok) {
      jwt.sign({ email: doc.email, id: doc._id, name: doc.name }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(doc);
      })
    }
    else res.status(422).json('pass not ok');
  } else {
    res.json('not found, register!')
  }
})

app.post('/api/register', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, pass } = req.body;
  let user = new User({
    name,
    email,
    password: bcrypt.hashSync(pass, bcryptSalt)
  })
  user.save()
  res.json(user)
})

app.get('/api/profile', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, data) => {
      if (err) throw err;
      res.json(data)
    }) 
  } else {
    res.json(null)
  }
})

app.post('/api/logout', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.cookie('token', '').json(true);
})

app.get('/api/allplaces',async (req,res)=>{
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Place.find())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  
