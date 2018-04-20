var express = require("express");
var router = express.Router();
 

router.use("/signup", require("./signup"));
router.use("/signin", require("./signin"));
router.use("/signout", require("./signout"));

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("admin", { title: "Admin" });
});

router.use("/works", require("./posts"));

module.exports = router;
