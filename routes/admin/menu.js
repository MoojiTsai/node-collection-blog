const express = require("express");
const router = express.Router();
const authencation = require('./../../middleware/check').authencation

router.get("/", authencation, function (req, res) {
    let data = {
        title: "導航管理",
    }
    return res.render('admin/menu', data);
});

module.exports = router;
