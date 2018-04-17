var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.use('/signup', require('./signup'));
// router.use('/signin', require('./signin'));
// router.use('/signout', require('./signout'));



module.exports = router;
