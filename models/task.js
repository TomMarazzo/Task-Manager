// add Mongoose
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
   {
      name:      {
         type: String,
         required: 'Name is Required',
         trim: true
      },
      complete: {
         type: Boolean,
         default: false
      },
      priority: Number
   })

//make this public
module.exports = mongoose.model('Task', taskSchema)