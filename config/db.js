var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("Connecting with Mongoose!")
})
.then(msg=>{
    console.log("Succesful Connection");
})
.catch(err=>{
    console.error("ERROR",err);
}); //Mongoose connection created
