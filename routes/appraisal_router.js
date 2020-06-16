var Appraisals = require('../app/models/appraisals');
var Users = require('../app/models/users');
var express = require('express');
var bodyParser = require('body-parser')
var AppraisalRouter = express.Router();

AppraisalRouter.use(bodyParser.json());
AppraisalRouter.route('/')
.get((req,res,next)=>{
    Appraisals.find(req.query,(err, ans)=> {
        if (err)
        {
            res.send(err);
            res.statusCode = 403;
        }
        res.json(ans); // return all students in JSON format
        console.log("/api/appraisals",req.method,200);
        console.log(ans);
    });
})
.post((req,res,next)=>{
    Appraisals.create(req.body,(err,ans)=>{
        if(err)
        {
            return console.error("ERR",err);
        }
        console.log("AITHOREMAL",req.body.revieweeEmail);
        Users.updateOne({"email":req.body.revieweeEmail},{ $set: { "commentexist" : true } },(err,ans)=>{
            if(err)
            {
                console.error("ERR",err);
            }
            else{
                console.log("RESPONSE",ans);
                res.json(ans);
            }
        });
    })
})
.put((req,res,next)=>{
    Appraisals.findOneAndUpdate({"revieweeEmail":req.body.revieweeEmail},(err,ans)=>{
        if(err)
        {
            return console.error("ERR",err);
        }
        res.json(ans);
    })
})
.delete((req,res,next)=>{
    Users.updateOne({"email":req.body.revieweeEmail},{ $set: { "commentexist" : false } },(err,ans)=>{
        if(err)
        {
            console.error("ERR",err);
        }
        else{
            console.log("RESPONSE",ans);
            Appraisals.remove(req.body,(err,ans) => {
                if(err)
                {
                    return console.error("ERR",err);

                }
                res.json(ans);
                console.log("DELETED",ans);
            });  
            console.log("/api/appraisals",req.method,200)
        }
    });


})

module.exports = AppraisalRouter;