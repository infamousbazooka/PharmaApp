var mongoose = require('mongoose');
var billSchema = new mongoose.Schema({
  date: String,
  patient: String,
  invoice: String,
  doctor: String,
  supplies: Array
});
var Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
