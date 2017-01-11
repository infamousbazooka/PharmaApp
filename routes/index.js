var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var session = {};
var User = require('../models/users');
var Bill = require('../models/bill');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login', status: "F" });
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

router.get('/Inventory', function(req, res, next) {
  res.render('index', { title: 'Inventory', user: session, sub: "root" });
});

router.get('/Billing', function(req, res, next) {
  res.render('index', { title: 'Billing', date: getCurrentDate() });
});

router.get('/Inventory/Edit', function(req, res, next) {
  res.render('index', { title: 'Inventory', user: session, sub: "Edit" });
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

function getCurrentDate(){
    var date = new Date();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "/" + month + "/" + year;
}

module.exports = router;
