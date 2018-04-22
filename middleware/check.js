
module.exports = {

  authencation: 
    function (req, res, next)  {
      console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
      if (req.isAuthenticated()) {

        return next();
      };
      req.flash('requiresignin','請先登入');
      res.redirect('/admin/signin');
    }
  
}

