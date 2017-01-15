var mongoose = require('mongoose');
var medicineSchema = new mongoose.Schema({
  medicineName: String,
  batch: String,
  mfg: String,
  exp: String,
  rate: Number,
  qty: Number
});
var Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;
