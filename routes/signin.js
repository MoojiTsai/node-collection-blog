const express = require('express')
const router = express.Router()
const UserModel = require('../models/users');
const checkNotLogin = require('../middleware/check').checkNotLogin
const passport = require('../middleware/passport');
const bcrypt = require('bcrypt');

// GET /signin 登录页
router.get('/', function (req, res) {
  let data = {
    title: '登入',
    form_action: '/admin/signin',
    err: req.flash('error'), 
    register_success:req.flash('register_success'),
    requiresignin:req.flash('requiresignin')
  }
  return res.render('admin/signin', data);
})

// POST /signin 用户登录
router.post('/', passport.authenticate('local',
  { failureRedirect: '/admin/signin',
    failureFlash: 'Invalid username or password!!',
    successFlash: 'Welcome!' }
  ),function(req,res){
    res.redirect('/admin');
  });



module.exports = router;
