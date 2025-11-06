// const express = require('express')
// const app = express();

// // packages
// const fileUpload = require('express-fileupload');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// require('dotenv').config();

// // connection to DB and cloudinary
// const { connectDB } = require('./config/database');
// const { cloudinaryConnect } = require('./config/cloudinary');

// // routes
// const userRoutes = require('./routes/user');
// const profileRoutes = require('./routes/profile');
// const paymentRoutes = require('./routes/payments');
// const courseRoutes = require('./routes/course');


// // middleware 
// app.use(express.json()); // to parse json body
// app.use(cookieParser());
// app.use(
//     cors({
//         origin: 'http://localhost:5173', // frontend link
//        // origin: "*",
//         credentials: true
//     })
// );
// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: '/tmp'
//     })
// )


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server Started on PORT ${PORT}`);
// });

// // connections
// connectDB();
// cloudinaryConnect();

// // mount route
// app.use('/api/v1/auth', userRoutes);
// app.use('/api/v1/profile', profileRoutes);
// app.use('/api/v1/payment', paymentRoutes);
// app.use('/api/v1/course', courseRoutes);




// // Default Route
// app.get('/', (req, res) => {
//     // console.log('Your server is up and running..!');
//     res.send(`<div>
//     This is Default Route  
//     <p>Everything is OK</p>
//     </div>`);
// })
require('dotenv').config(); // must be first line
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// DB & Cloudinary connections
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

// Routes
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payments');
const courseRoutes = require('./routes/course');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));

// Connect to DB and Cloudinary
connectDB();
cloudinaryConnect();

// Mount routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);

// Default route
app.get('/', (req, res) => {
    res.send(`
        <div>
            <h2>Backend Server is running!</h2>
            <p>Everything is OK</p>
        </div>
    `);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});
