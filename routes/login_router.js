var Users = require('../app/models/users');
var express = require('express');
var bodyParser = require('body-parser')
var LoginRouter = express.Router();

LoginRouter.use(bodyParser.json());
LoginRouter.route('/login')
.post((req,res,next)=>{
    var user = new Users(); // create a new instance of the student model
    // user.author = req.body.author; // set the student name (comes from the request)
    // user.rating = req.body.rating;
    // user.subject = req.body.subject;
    // user.comments = req.body.comments;
    // user.reviewee = req.body.reviewee;
    Users.find({"email":req.body.email,"password":req.body.password},
    (err,ans)=>{
        if(err)
        {
            console.error("/api/users/login",err);
        }
        console.log("RESPONSE",ans);
        res.json(ans);
    });
    console.log("/api/users/login",req.method,200)
});

LoginRouter.route('/signup')
.post((req,res,next)=>{
    next();
})

module.exports = LoginRouter;