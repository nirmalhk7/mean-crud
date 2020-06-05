var mongoose = require('mongoose');

// define our students model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Appraisal', {
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
   comments: {
      type: String,
      default: ''
   },
   reviewee: {
      type : String, 
      required: true
   }
});