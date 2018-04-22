var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', { title: '縮小檢視工作室' });
});


module.exports = router;
