var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var session = {};
var User = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/Login', function(req, res, next) {
  res.render('index', { title: 'Login', status: "F" });
});

router.get('/Login/Checking', function(req, res, next) {
  res.render('index', { title: 'Login', status: "F" });
});

router.get('/Register', function(req, res, next) {
  res.render('index', { title: 'Register' });
});

router.get('/Home', function(req, res, next) {
  res.render('index', { title: 'Home', user: session });
});

router.post('/Login/Checking', function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    session.email = email;

    User.findOne({email: email, password: password}, function(err, user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            console.log("User Not Found");
            return res.render('index', { title: "Login", status: "NF" });
        }
        return res.redirect('../Home');
    });
});


router.post('/Register/Saving', function(req, res){
    var newuser = new User();
    newuser.fullname = req.body.fullname;
    newuser.email = req.body.email;
    newuser.password = req.body.password;

    newuser.save(function(err, savedUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        return res.redirect('../Login');
    });
});



module.exports = router;
