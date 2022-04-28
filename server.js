require('dotenv').config();
const express = require('express'); //import express
const app = express(); //define 
const path = require('path'); 
const cors = require('cors'); //Cross Origin Resource Sharing
const corsOptions = require('./config/corsOptions'); //import from Config
const { logger } = require('./middleware/logEvents'); //evnet logger
const errorHandler = require('./middleware/errorHandler'); //event handler
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500; //declare port

//connect to mongo
connectDB();

//custom middleware logger
app.use(logger);

//handle options credentials check BEFORE cors
//and fetch cookies credentials requirement
app.use(credentials);

//cross origin resource sharing
app.use(cors(corsOptions));

//builtin middleware to handle url encoded data. In other words, form data: 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false })); //app.use applies middleware routes

//builtin middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/update', require('./routes/update'));

app.use(verifyJWT);
app.use('/recipes', require('./routes/api/recipes'));

app.all('*', (req, res) => { //catchall 404
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({ error: "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler); //errorHandler method

mongoose.connection.once('open', () => {
    console.log('The motto of all the mongoose family is run and find out');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
