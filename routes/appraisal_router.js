var Appraisals = require('../app/models/appraisals');
var express = require('express');
var bodyParser = require('body-parser')
var AppraisalRouter = express.Router();

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
        console.log("/api/appraisals",req.method,200)
    });
})
.post((req,res,next)=>{
    var appraisal = new Appraisals(); // create a new instance of the student model
    appraisal.author = req.body.author; // set the student name (comes from the request)
    appraisal.rating = req.body.rating;
    appraisal.subject = req.body.subject;
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
    console.log("/api/appraisals",req.method,200)
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
    console.log("/api/appraisals",req.method,200)
})

AppraisalRouter.route('/:aprid')
.get((req,res,next)=>{
    Appraisals.findById(req.params.aprid)
    .then((ans) => {
        res.statusCode = 200;
        res.json(ans);
    }, (err) => next(err))
    .catch((err) => next(err));
    console.log("/api/appraisals",req.method,200)
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
    console.log("/api/appraisals",req.method,200)
})
.delete((req,res,next)=>{
    Appraisals.findByIdAndRemove(req.params.aprid)
    .then((resp) => {
        res.statusCode = 200;
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    console.log("/api/appraisals",req.method,200)
})

module.exports = AppraisalRouter;