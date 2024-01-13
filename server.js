const express = require('express');
const mongoose = require('mongoose');
const registerRouter=require('./routes/user');
const path = require('path');
const staticRouter=require("./routes/staticRouter");
const cookieparser=require('cookie-parser');
const checkAuth=require('./middleware/authentication');
const studentRouter=require('./routes/student');


const app = express();

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieparser());
app.use(checkAuth());


//routes
app.use('/',staticRouter);
app.use('/',registerRouter);
app.use('/',studentRouter);


mongoose.connect("mongodb://127.0.0.1:27017/auth");
app.listen(3000,console.log('start your server'));