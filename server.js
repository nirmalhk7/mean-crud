// modules =================================================
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser')
var createError = require('http-errors');
const AppraisalRouter = express.Router();
var mongoose = require('mongoose');
// set our port
const port = 3000;
// configuration ===========================================

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// config files
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("Connecting with Mongoose!")
})
.then(msg=>{
    console.log("Succesful Connection");
})
.catch(err=>{
    console.error("ERROR",err);
}); //Mongoose connection created

app.use('/api/appraisals',require('./routes/appraisal_router'));
app.use('/api/users',require('./routes/login_router'));
app.get('*', function(req, res) {
    const allowed = [
        '.js',
        '.css',
        '.png',
        '.jpg',
        '.ts',
        '.html'
    ];
    if (allowed.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`public/${req.url}`));
        console.log(`public/${req.url}`,req.method,200);
     } else {
        res.sendFile(path.join(__dirname, 'public/index.html'));
        console.log("/",req.method,200);
     } // load our public/index.html file
    
});


app.use(function(req, res, next) {
    next(createError(404));
});

app.listen(port, () => console.log(`Beautiful things happening on ${port}!`));
//https://www.tutorialspoint.com/meanjs/meanjs_building_single_page_with_angular.htm
