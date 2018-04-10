const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middleware/check').checkNotLogin

// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
  res.send('註冊頁面')
})

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
  res.send('註冊')
})

module.exports = router
