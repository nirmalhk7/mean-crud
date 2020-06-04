// modules =================================================
const express = require('express');
const app = express();
const router = express.Router();
var mongoose = require('mongoose');
// set our port
const port = 3000;
// configuration ===========================================

// config files
var db = require('./config/db');
console.log("connecting--",db);

mongoose.connect(db.url,{ useNewUrlParser: true, useUnifiedTopology: true}); //Mongoose connection created

app.get('/', (req, res) => res.send('WTA Project'));


var Appraisals = require('./app/models/appraisals');

router.route('/api/appraisals')
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
    var student = new Appraisals(); // create a new instance of the student model
    student.name = req.body.name; // set the student name (comes from the request)
    student.save(function(err) {
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

router.route('/api/appraisals/:aprid')
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));