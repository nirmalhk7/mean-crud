var mongoose = require('mongoose');

const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];

// define our students model
// module.exports allows us to pass this to other files when it is called
var AppraisalSchema = new mongoose.Schema({
   author : {
      type : String, 
      required: true
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
      required: true
   }
});
var AppraisalsModel = mongoose.model('Appraisal', AppraisalSchema);


module.exports = AppraisalsModel