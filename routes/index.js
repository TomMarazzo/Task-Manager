//link to the express package
var express = require('express');
//instanciates a new express route to handle http requests
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Task Manager' });
});

/* GET About page. */
router.get('/about', (req, res, next)=> {
   res.render('about', { message: 'Content from the controller goes here'})
});
//exposes this file as public
module.exports = router;
