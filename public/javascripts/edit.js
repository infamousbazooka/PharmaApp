var updateBox=$("#updateBox")[0];
new Awesomplete(updateBox, {
 list: getMedicines()
});
$("#updateBox").on('awesomplete-selectcomplete',function(){
 for (var i = 0; i < medicines.length; i++) {
   if (medicines[i].medicineName) {
     selectedMed = medicines[i];
     $("#updateForm").attr("action", "/UpdateMed/" + selectedMed._id);
     $('#updateForm #batchnum').val(selectedMed.batch);
     $('#updateForm #mfgdate').val(selectedMed.mfg);
     $('#updateForm #expirydate').val(selectedMed.exp);
     $('#updateForm #rate').val(selectedMed.rate);
     $('#updateForm #quantity').val(selectedMed.qty);
     $('#updateForm label').addClass('active');
   }
 }
});

var searchBox=$("#searchBox")[0];
new Awesomplete(searchBox, {
 list: getMedicines()
});
$("#searchBox").on('awesomplete-selectcomplete',function(){
 for (var i = 0; i < medicines.length; i++) {
   if (medicines[i].medicineName) {
     selectedMed = medicines[i];
     $("#deleteForm").attr("action", "/DeleteMed/" + selectedMed._id);
     $('.display').html('<h6 class="batch">Batch Number: ' + medicines[i].batch
     + '</h6><h6 class="qty">Quantity: ' + medicines[i].qty
     + '</h6><h6 class="rate">Rate: ' + medicines[i].rate
     + '</h6><h6 class="mfg">Manufacturing Date: ' + medicines[i].mfg
     + '</h6><h6 class="exp">Expiry Date: ' + medicines[i].exp
     + '</h6>');
   }
 }
});
