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
var db = require('./config/db');
console.log("connecting--",db);

mongoose.connect(db.url,{ useNewUrlParser: true, useUnifiedTopology: true}); //Mongoose connection created

app.get('/', (req, res) => {
    res.send('WTA Project');
    console.log("/",req.method,req.statusCode)
});


var Appraisals = require('./app/models/appraisals');

AppraisalRouter.use(bodyParser.json());
AppraisalRouter.route('/')
.get((req,res,next)=>{
    Appraisals.find((err, ans)=> {
        if (err)
        {
            res.send(err);
            res.statusCode = 403;
        }
        res.json(ans); // return all students in JSON format
    });
})
.post((req,res,next)=>{
    var appraisal = new Appraisals(); // create a new instance of the student model
    appraisal.author = req.body.author; // set the student name (comes from the request)
    appraisal.rating = req.body.rating;
    appraisal.comments = req.body.comments;
    appraisal.reviewee = req.body.reviewee;
    appraisal.save(function(err) {
        if (err)
        {
            res.send(err);
            res.statusCode = 403;
        }
        res.json({ message: 'successful' });
    });
})
.put((req,res,next)=>{
    next();
})
.delete((req,res,next)=>{
    Appraisals.remove({})
    .then((ans) => {
        res.statusCode = 200;
        res.json(ans);
    }, (err) => next(err))
    .catch((err) => next(err));   
})

AppraisalRouter.route('/:aprid')
.get((req,res,next)=>{
    Appraisals.findById(req.params.aprid)
    .then((ans) => {
        res.statusCode = 200;
        res.json(ans);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=>{
    next();
})
.put((req,res,next)=>{
    Appraisals.findByIdAndUpdate(req.params.aprid, {
        $set: req.body
    }, { new: true })
    .then((ans) => {
        res.statusCode = 200;
        res.json(ans);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next)=>{
    Appraisals.findByIdAndRemove(req.params.aprid)
    .then((resp) => {
        res.statusCode = 200;
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

app.use('/api/appraisals',AppraisalRouter);
app.use(function(req, res, next) {
    next(createError(404));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//https://www.tutorialspoint.com/meanjs/meanjs_building_single_page_with_angular.htm