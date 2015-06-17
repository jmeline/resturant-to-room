var express = require('express');
var router = express.Router();
var userService = require('../services/user-services');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* Create View */
router.get('/create', function(req, res, next) {
    var vm = {
        title: "Create Account"
    }
    res.render('users/create', vm);
});

router.post('/create', function(req, res, next) {
    userService.addUser(req.body, function(err) {
        if (err) {
            var vm = {
                title: "Create Account",
                input: req.body,
                error: "Something went wrong"
            };
            delete vm.input.password;
            return res.render('users/create', vm);
        }
        res.redirect('/orders');
    });
});

module.exports = router;
