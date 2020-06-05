// modules =================================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var createError = require('http-errors');
const AppraisalRouter = express.Router();
var mongoose = require('mongoose');
// set our port
const port = 3000;
// configuration ===========================================

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

app.get('/', (req, res) => {
    res.send('WTA Project');
    console.log("/",req.method,200)
    
});

app.use('/api/appraisals',require('./routes/appraisal_router'));
app.use(function(req, res, next) {
    next(createError(404));
});

app.listen(port, () => console.log(`Beautiful things happening on ${port}!`));
//https://www.tutorialspoint.com/meanjs/meanjs_building_single_page_with_angular.htm