const express = require("express");
const router = express.Router();
const authencation = require('./../../middleware/check').authencation
 
router.get("/",authencation, function(req, res) {
  let data = {
    title: "後台首頁",
    msg : req.flash('success')
  }
  return res.render('admin/index',data);
});
router.use("/signup", require("./signup"));
router.use("/signin", require("./signin"));
router.use("/signout", require("./signout"));
router.use("/portfolios", require("./portfolios"));
router.use("/menu", require("./menu"));

module.exports = router;
