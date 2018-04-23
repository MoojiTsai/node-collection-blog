const express = require('express')
const router = express.Router()


// GET /signout 登出
router.get('/', function (req, res, next) {

  req.logout();
  req.session.destroy();
  res.redirect('/admin/signin');
})

module.exports = router
