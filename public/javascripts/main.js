var width = $(document).width();
$(document).ready(function() {
  ready();
  browserwidth();
});
$(window).resize(function() {
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
