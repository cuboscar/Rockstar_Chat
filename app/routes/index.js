var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user) {
    res.render('index', { title: "Rockstars", user: req.user });
  } else {
    res.render('index', { title: "Rockstars" });
  }
});
router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect("/");
});
module.exports = router;
