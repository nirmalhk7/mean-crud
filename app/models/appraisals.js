var mongoose = require('mongoose');

// define our students model
// module.exports allows us to pass this to other files when it is called
var AppraisalSchema = new mongoose.Schema({
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
   authorEmail:{
      type: String,
      required: true
   },
   revieweeEmail: {
      type: String,
      required: true,
      unique: true
   }
});



module.exports = mongoose.model('Appraisal', AppraisalSchema);
