var mongoose = require('mongoose');

// define our students model
// module.exports allows us to pass this to other files when it is called
var AppraisalSchema = new mongoose.Schema({
   author : {
      type : String, 
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
   rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
   },
   subject: {
      type: String,
      required: true
   },
   comments: {
      type: String,
      default: ''
   },
   reviewee: {
      type : String, 
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   }
});



module.exports = mongoose.model('Appraisal', AppraisalSchema);
