var width = $(document).width();
$(document).ready(function() {
  ready();
  browserwidth();
});
$(window).resize(function() {
  ready();
  browserwidth();
});

function browserwidth(){
  if ($(document).width() != width) {
    console.log("dcnfdn");
    ready();
  }
}

function ready(){
  $('select').material_select();
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  $(".button-collapse").sideNav();
  $('.main').css('width', $(window).width() - $('.side-nav').width());
  $('ul.tabs').tabs();
  $('.list_slider li').css('width', $('.main').width()/4);
  $('.list_slider ul').css('width', $('.main').width()*5 + 80);
  $('.button-collapse1').sideNav({
     menuWidth: 300, // Default is 240
     edge: 'right', // Choose the horizontal origin
     closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
     draggable: true // Choose whether you can drag to open on touch screens
   }
 );
}
var medicines = {};
var selectedMed = {};
function getMedicines(){
  var list = [];
  $.ajax('http://localhost:3000/MedicineList', {
    type: 'GET',
    success: function(data){
      medicines = data;
      for (var i = 0; i < data.length; i++) {
        list.push(data[i].medicineName);
      }
    },
    async: false
  });
  return list;
}
function getDoctors(){
  var list = [];
  $.ajax('http://localhost:3000/DoctorList', {
    type: 'GET',
    success: function(data){
      list = data;
    },
    async: false
  });
  return list;
}
function getPatients(){
  var list = [];
  $.ajax('http://localhost:3000/PatientList', {
    type: 'GET',
    success: function(data){
      list = data;
    },
    async: false
  });
  return list;
}
// var keys = ["id", "name", batch, exp, qty, mrp, disc, ]
// function html2json() {
//    var json = '{';
//    var otArr = [];
//    var tbl2 = $('#tableBody tr').each(function(i) {
//       x = $(this).children();
//       var itArr = [];
//       x.each(function() {
//          itArr.push('"' + $(this).text() + '"');
//       });
//       otArr.push('"' + i + '": [' + itArr.join(',') + ']');
//    })
//    json += otArr.join(",") + '}'
//
//    return json;
// }
