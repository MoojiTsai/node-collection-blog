const express = require("express");
const router = express.Router();
const authencation = require('../middleware/check').authencation
 
router.get("/",authencation, function(req, res) {
  let data = {
    title: "Admin",
    msg : req.flash('success')
  }
  return res.render('admin/',data);
});
router.use("/signup", require("./signup"));
router.use("/signin", require("./signin"));
router.use("/signout", require("./signout"));
router.use("/works", require("./posts"));

module.exports = router;
