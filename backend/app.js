require('dotenv').config()
const express = require("express");
const db = require('./db/db')

const cookieParser = require("cookie-parser");
const session = require('express-session')
const postsRoute = require('./controller/postcontrol');
const publicRoute = require('./controller/publiccontrol');
const userPostsRoute = require('./controller/userControl');
const MongoStore = require('connect-mongo');

const app = express();

const PORT = 8080
const cors = require('cors')



app.use(express.json());
app.use(cookieParser())
app.use(session({
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 1800000 },
  secret: process.env.SECRET,
  cookieName: 'session',
  cookie: { secure: false },
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    ttl: 14 * 24 * 60 * 60
  })
}))
db();
app.use(cors())
app.use('/public', publicRoute);
app.use('/postIt', postsRoute);
app.use('/user', userPostsRoute);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Page not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});


// 09/08

// Posts
// 1-  Get All public Posts
// 2- Get All private Posts





// Comments
//  1-  Get All public Comments
// 2- Get All private Comments
// 4- Make Comments
// 3- Edit Comments
// 4- Delete Comments


// Users
//  1-  Get All Users
// 4-Create a Users
// 3- Edit Users
// 4- Delete Users


// Admin
// 1- Make Admin
// 2- Edit Admin
// 3- Delete Admin