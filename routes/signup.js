const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middleware/check').checkNotLogin


// GET /signup 注册页
router.get('/', function (req, res, next) {
  res.render('signup')
});


// POST /signup 用户注册
router.post('/', function (req, res, next) {
  console.log(req.fields);
  res.redirect('/');
});

module.exports = router
