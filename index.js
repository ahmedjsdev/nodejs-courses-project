
require('dotenv').config()
const express = require('express');
const path = require('path');

const cors = require('cors');


const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const mongoose = require('mongoose');

const httpStatusText = require('./utils/httpStatusText');


const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log('mongodb server started')
})

app.use(cors())
app.use(express.json());

const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');


app.use('/api/courses', coursesRouter) // /api/courses

app.use('/api/users', usersRouter) // /api/users

// global middleware for not found router
app.all('*', (req, res, next)=> {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available'})
})

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})






app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port: 4000');
});
