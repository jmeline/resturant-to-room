var express = require('express');
var router = express.Router();
var userService = require('../services/user-services');
var passport = require('passport');
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
                error: err
            };
            delete vm.input.password;
            return res.render('users/create', vm);
        }
        req.login(req.body, function(){
            res.redirect('/orders');
        });
    });
});


router.post('/login', passport.authenticate('local'), function(req, res, next){
    res.redirect('/orders');
});
module.exports = router;
