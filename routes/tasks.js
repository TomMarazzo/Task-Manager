//link to the express package
var express = require('express');
//instanciates a new express route to handle http requests
var router = express.Router();

/* GET Task Index View. */
router.get('/', function (req, res, next) {
   res.render('tasks/index')
})
//exposes this file as public
module.exports = router;