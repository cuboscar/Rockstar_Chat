var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.user) {
        res.render('profile', { appTitle: "Profile", title: 'profile', user: req.user });
    } else {
        res.redirect('/login');
    }
});
router.post('/', function (req, res, next) {
    res.render('profile', { appTitle: "Profile", title: 'profile', user: "Lucas" });
});

module.exports = router;
