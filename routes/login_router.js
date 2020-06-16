var Users = require('../app/models/users');
var express = require('express');
var bodyParser = require('body-parser')
var LoginRouter = express.Router();
var sha256 = require('js-sha256');

LoginRouter.use(bodyParser.json());

LoginRouter.route('/')
.get((req,res,next)=>{
    Users.find(req.query,(err,ans)=>{
        if(err)
        {
            console.error("ERROR",err);
        }
        else{
            console.log("RESPONSE Getting all Employees",ans.length);
            res.json(ans);
        }
    });
    console.log("/api/users/",req.method,200)
});

LoginRouter.route('/login')
.post((req,res,next)=>{
    var user = new Users(); // create a new instance of the student model
    console.log({"email":req.body.email,"password":sha256(req.body.password)})
    Users.find({"email":req.body.email,"password":sha256(req.body.password)},
    (err,ans)=>{
        if(err)
        {
            console.error("/api/users/login",err);
        }
        console.log("RESPONSE",ans);
        res.json(ans);
    });
    console.log("/api/users/login",req.method,200);
});

LoginRouter.route('/signup')
.post((req,res,next)=>{
    next();
})

module.exports = LoginRouter;