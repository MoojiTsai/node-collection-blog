
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const UserModel = require('../../models/users')



// GET /signup  
router.get('/', function (req, res) {
  let data = {
    title: '縮小檢視工作室',
    form_action: '/admin/signup',
  };
  res.render('admin/signup', data);
});


// POST /signup  
router.post('/', function (req, res) {


  req.checkBody('username', 'Username cant be empty!!').notEmpty();
  req.checkBody('username', 'Username must be  between 3-15 charactors long').len(3, 15);
  req.checkBody('password', 'password must be between 5-100 charactors long.').len(5, 100);
  req.checkBody('password-Match', 'password do not match, Try again.').equals(req.body.password);

  // req.checkBody('password-Match','');
  let errors = req.validationErrors();
  if (errors) {
    console.log(`errors:${JSON.stringify(errors)}  `);
    return res.render('admin/signup', {
      title: 'Registeration Error',
      form_action: '/admin/signup',
      errors: errors,
    });
  } else {

    let account = req.body.username;
    let myPlaintextPassword = req.body.password;
    let saltRounds = 10;

    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      if (err) console.log(err);
      let user = {
        account: account,
        password: hash
      }
      UserModel.create(user);
      req.flash('register_success', 'register successfully!')
      res.redirect('/admin/signin');
    });
  }

});

module.exports = router;
