//link to the express package
var express = require('express');
//instanciates a new express route to handle http requests
var router = express.Router();

//Reference the Task model
const Task = require('../models/task')

/* GET Task Index View. */
router.get('/', function (req, res, next) {

   //use the task model to fetch a list of tasks and pass these to the view for display
   //If an error occurs, the err parameter will filled
   //if not, the tasks parameter will be filled with the query result
   Task.find((err, tasks) => {
      if (err) {
         console.log(err)
         res.end(err)
      }
      else {
         res.render('tasks/index',
            {
               tasks: tasks
            })
      }
   })
})
//GET tasks add view
router.get('/add', (req, res, next) => {
   res.render('tasks/add')
})

//POST tasks / add form submission
router.post('/add', (req, res, next) => {
   //use MONGOOSE to try to save a new task object
   Task.create({
      name: req.body.name,
      priority: req.body.priority
   }, (err, task) => {
      if (err) {
         console.log(err)
         res.end(err)
      }
      else {
         res.redirect('/tasks')
      }
   })
})

//GET tasks/delete/ - colon in teh path represents a URL parameter
router.get('/delete/:_id', (req, res, next) => {
   //stoire the selected id in a local variable
   var _id = req.params._id;
   //Use Mongoose to delete the selected document from the DB
   Task.remove({ _id: _id }, (err) => {
      if (err) {
         console.log(err)
         res.end(err)
      }
      else {
         res.redirect('/tasks')
      }
   })
})

//Get tasks/edit/....  populate edit for  with my existing task values
router.get('/edit/:_id', (req, res, next) => {
   //stoire the selected id in a local variable
   var _id = req.params._id;
   //use the selectedf id to look up the matching document
   Task.findById(_id, (err, tasks) => {
      if (err) {
         console.log(err)
         res.end(err)
      }
      else {
         res.render('tasks/edit',
            {
               tasks: tasks
            })
      }
   })
})

//exposes this file as public
module.exports = router;