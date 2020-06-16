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
    console.log("PROPS",req.body._id,req.body);
    Appraisals.findByIdAndUpdate(req.body._id,
        req.body,
        {upsert: false},
        (err,ans) => {
        if(err)
        {
            return console.error("ERROR",err);
        }
        res.statusCode = 200;
        console.log("PUTDATA",ans);
        res.json(ans);
    });
})
.delete((req,res,next)=>{
    console.log("DELETE",req.body,req.query,req.params)
    Appraisals.find(req.params._id,(err,ans)=>{
        if(err)
        {
            console.error("ERR",err);
        }
        console.log("ANSWER",ans,ans[0].revieweeEmail)
        Users.findOneAndUpdate({"email":ans[0].revieweeEmail},
            { $set: { "commentexist" : false } },
            {new: true},(err,ans2)=>{
                if(err)
                {
                    console.error("ERR",err);
                }
                else{
                    console.log("RESPONSE",ans2);
                }
        }).then(()=>{
            Appraisals.deleteOne(req.params._id,(err,ans3)=>{
                if(err) return console.error("ERR",err);
                console.log("RESULT",ans3);
                res.json(ans3);
            })
        });
    });
})

module.exports = AppraisalRouter;