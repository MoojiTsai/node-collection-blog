const express = require('express')
const router = express.Router()
const UserModel = require('../models/users');
const checkNotLogin = require('../middleware/check').checkNotLogin

// GET /signin 登录页
router.get('/', function (req, res, next) {
  let data = {
    title:'登入',
    form_action:'/admin/signin',
    msg:''
  }
  res.render('admin/signin',data);
})

// POST /signin 用户登录
router.post('/', function (req, res) {
  let account =req.fields.account; 
  let password = req.fields.password; 
  let result = UserModel.getUserByName(account);
  console.log('result: ', result);
  
  if(result.length===0){
    // console.log('user: null')
    let msg='找不到使用者'
    res.redirect('/admin/signin',msg);
  }else{
    res.redirect('/admin/');
  }
  
})

module.exports = router
