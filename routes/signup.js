const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const UserModel = require('../models/users')
const checkNotLogin = require('../middleware/check').checkNotLogin


// GET /signup  
router.get('/', function (req, res) {
  let data = {
    title: '縮小檢視工作室',
    form_action: '/admin/signup'
  };
  res.render('admin/signup', data);
});


// POST /signup  
router.post('/', function (req, res) {

  let account = req.fields.account;
  let myPlaintextPassword = req.fields.password;
  let saltRounds = 10;

  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    if (err) console.log(err);
    let user = {
      account: account,
      password: hash
    }
    UserModel.create(user);

  });
  res.redirect('/admin/');
});

module.exports = router;
