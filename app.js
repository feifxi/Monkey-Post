// Import dependencies and modules
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/authRoutes');
const postRotues = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// Connect to database
connectDB();

// Set View and Template engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret: 'mySecretKey555', 
    resave: false,
    saveUninitialized: false,
  }));  
app.use(flash());


// Routes
app.use(postRotues);
app.use(authRoutes);
app.use(userRoutes);

// Static File
app.use(express.static('./public'));

const port = process.env.PORT
app.listen(port,()=>{
    console.log('Server is running at http://localhost:'+port);
})
