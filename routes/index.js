var express = require('express'),
    router = express.Router(),
    open = require('open'),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var session = {};
var DB = require('../models/db');
var User = require('../models/users');
var Bill = require('../models/bill');
var Medicine = require('../models/medicine');

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

router.get('/Report', function(req, res, next) {
  res.render('index', { title: 'Report', user: session, sub: "root" });
});

router.get('/Report/:billId?', function(req, res, next) {
  var billId = req.params.billId;
  Bill.findById(billId, function(err, bill) {
    if (err) throw err;
    bill = JSON.parse(JSON.stringify(bill).replace('TAX%', "TAXP"));
    res.render('index', { title: 'Bill Report', user: session, sub: "root", bill: bill });
  });
});

router.get('/Billing', function(req, res, next) {
  var invoice = 0;
  Bill.find({}, function(err, bills) {
    if (err) throw err;
    invoice = bills.length;
    res.render('index', { title: 'Billing', date: getCurrentDate(), invoice: invoice + 1 });
  });
});

router.get('/Inventory/Edit', function(req, res, next) {
  res.render('index', { title: 'Inventory', user: session, sub: "Edit" });
});

router.get('/Print/:billId', function(req, res){
  var id = req.params.billId;
  Bill.findById(id, function(err, bill) {
    if (err) throw err;
    bill = JSON.parse(JSON.stringify(bill).replace("TAX%", "TAXP"));
    res.render('print', { title: 'Print Bill', bill: bill });
  });
});

router.get('/MedicineList', function(req, res){
  var meds = {};
  Medicine.find({}, function(err, medicines) {
    if (err) throw err;
    res.send(medicines);
  });
});

router.get('/PatientList', function(req, res){
  var patients = [];
  Bill.find({}, function(err, bills) {
    if (err) throw err;
    bills.forEach(function(bill){
      patients.push(bill.patient);
    });
    res.send(patients);
  });
});

router.get('/DoctorList', function(req, res){
  var doctors = [];
  Bill.find({}, function(err, bills) {
    if (err) throw err;
    bills.forEach(function(bill){
      doctors.push(bill.doctor);
    });
    res.send(doctors);
  });
});

router.post('/GetBills', function(req, res){
  var mydate = new Date(req.body.date);
  var month = mydate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var cdate = mydate.getDate() + "/" + month + "/" + mydate.getFullYear();
  Bill.find({ date: cdate }, function(err, users) {
    if (err) throw err;
    res.send(users);
  });
});

router.post('/GetQuantity', function(req, res){
  var id = req.body.id;
  var qty = req.body.qty;
  Medicine.findById(id, function(err, med) {
    if (err) throw err;
    if (med.qty < qty) {
      res.send(med.qty + "");
    } else {
      res.send("Cool");
    }
  });
});

router.post('/DeleteMed/:medID?', function(req, res){
  Medicine.findById(req.params.medID, function(err, med) {
    if (err) throw err;
    med.remove(function(err) {
      if (err) throw err;
      res.redirect('/Inventory/Edit');
    });
  });
});

router.post('/UpdateMed/:medID?', function(req, res){
  Medicine.findByIdAndUpdate(req.params.medID, {
    qty: req.body.quantity,
    rate: req.body.rate,
    exp: req.body.expdate,
    mfg: req.body.mfgdate,
    batch: req.body.batchnum,
    medicineName: req.body.name
  },
  function(err, med) {
    if (err) throw err;
    res.redirect('/Inventory/Edit');
  });
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

router.post('/AddMed', function(req, res){
  var medicine = new Medicine();
  medicine.medicineName = req.body.name;
  medicine.batch = req.body.batchnum;
  medicine.mfg = req.body.mfgdate;
  medicine.exp = req.body.expdate;
  medicine.rate = req.body.rate;
  medicine.qty = req.body.quantity;

  medicine.save(function(err, medicine){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    return res.redirect('../Inventory/Edit');
  });
});

router.post('/Billing', function(req, res){
  var bill = new Bill();
  var data = req.body;
  bill.date = data.date;
  bill.patient = data.patient;
  bill.invoice = data.invoice;
  bill.doctor = data.doctor;
  bill.supplies = data.supplies;
  bill.netTotal = data.netTotal;
  bill.supplies.forEach(function(elem){
    Medicine.findById(elem.ID, function(err, medicine) {
      if (err) throw err;
      var med = JSON.parse(JSON.stringify(elem));
      medicine.qty = medicine.qty - med.QTY;
      medicine.save(function(err) {
        if (err) throw err;
      });
    });
  });
  bill.save(function(err, bill){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    open('http://localhost:3000/Print/' + bill._id, function(err){
      if(err) throw err;
    });
    res.redirect('/Billing');
  });
});
module.exports = router;
