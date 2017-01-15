var searchBox=$("#searchmain")[0];
new Awesomplete(searchBox, {
    list: getMedicines()
});

var patientBox=$("#patientname")[0];
new Awesomplete(patientBox, {
    list: getPatients()
});
$("#patientname").on('awesomplete-selectcomplete',function(){
    $('#doctorname').focus();
});

var doctorBox=$("#doctorname")[0];
new Awesomplete(doctorBox, {
    list: getDoctors()
});
$("#doctorname").on('awesomplete-selectcomplete',function(){
    $('#searchmain').focus();
});

var supplies = {};
$("#searchmain").on('awesomplete-selectcomplete',function(){
    for (var i = 0; i < medicines.length; i++) {
        if (medicines[i].medicineName) {
            selectedMed = medicines[i];
            $('#itemid').val(medicines[i]._id);
            $('#itemname').val(medicines[i].medicineName);
            $('#batch').val(medicines[i].batch);
            $('#exp').val(medicines[i].exp);
            $('#qty').val('1');
            $('#disc').val('0');
            $('#tax').val('14');
            $('#mrp').val(medicines[i].rate);
            $('#rate').val($('#mrp').val() - $('#disc').val());
            $('#amt').val($('#qty').val() * $('#rate').val());
            $('#footerForm label').addClass('active');
        }
    }
    $('#qty').focus();
});

var amount = 0;

$("#mrp").on("change paste keyup", function() {
    $('#rate').val($('#mrp').val() - $('#disc').val());
    $('#amt').val($('#qty').val() * $('#rate').val());
});

$("#disc").on("change paste keyup", function() {
    $('#rate').val($('#mrp').val() - $('#disc').val());
    $('#amt').val($('#qty').val() * $('#rate').val());
});

$("#qty").on("change paste keyup", function() {
    $('#amt').val($('#qty').val() * $('#rate').val());
});



$('#footerForm').on('submit', function(e){
    e.preventDefault();
    var added = false;
    $("#tableBody").find("tr").each(function() {
        var elem = $(this);
        var id = elem.find('td.id').text();
        if (id == $('#itemid').val()) {
            elem.find('td.qty').text(parseInt(elem.find('td.qty').text()) + 1);
            elem.find('td.discount').text(parseInt(elem.find('td.discount').text()) + parseInt($('#disc').val()));
            elem.find('td.rate').text(parseInt(elem.find('td.mrp').text()) - parseInt(elem.find('td.discount').text()));
            elem.find('td.amount').text(parseInt(elem.find('td.rate').text()) * parseInt(elem.find('td.qty').text()));
            added = true;
            $('#searchmain').val("");
            $('#searchmain').focus();
            return;
        }
    });
    if (!added) {
        $('#tableBody').append('<tr><td class="id">'
        + $('#itemid').val() + '</td><td>'
        + $('#itemname').val() + '</td><td>'
        + $('#batch').val() + '</td><td>'
        + $('#exp').val() + '</td><td class="qty">'
        + $('#qty').val() + '</td><td class="mrp">'
        + $('#mrp').val() + '</td><td class="discount">'
        + $('#disc').val() + '</td><td class="rate">'
        + $('#rate').val() + '</td><td class="amount">'
        + $('#amt').val() + '</td><td>'
        + $('#tax').val() + '</td><td class="taxp">'
        + ($('#tax').val() * $('#amt').val())/100 + '</td></tr>');
        $('#searchmain').val("");
        $('#searchmain').focus();
    }
});
$('#tax').keypress(function(e) {
    var total = discount = tax = 0;
    if (e.which == 13) {
        if ($('#itemid').val() == "") {
            Materialize.toast('Please complete the bill.', 4000);
        } else{
            $('#footerForm').submit();
            $("#tableBody").find("tr").each(function() {
                total += parseInt($(this).find('td.rate').text());
                $('#total').val(total);
                tax += parseInt($(this).find('td.taxp').text());
                $('#taxp').val(tax);
                discount += parseInt($(this).find('td.discount').text());
                $('#discount').val(discount);
                $('#net').val(total + tax - discount);
            });
            $('#totalForm label').addClass('active');
            $('#footerForm')[0].reset();
        }
    }
});

function kr(){
    var myRows = [];
    var $headers = $("th");
    var $rows = $("tbody tr").each(function(index) {
        $cells = $(this).find("td");
        myRows[index] = {};
        $cells.each(function(cellIndex) {
            myRows[index][$($headers[cellIndex]).html()] = $(this).html();
        });
    });
    myObj = {};
    myObj = myRows;
    return(myObj);
}

$('#printBtn').click(function(){
    if ($('#patientname').val().trim() == "" || $('#doctorname').val().trim() == "") {
        Materialize.toast('Please complete the bill.', 4000);
    } else{
        var bill = {};
        bill.date = $('#date').val();
        bill.patient = $('#patientname').val();
        bill.invoice = $('#invoice').val();
        bill.doctor = $('#doctorname').val();
        bill.netTotal = $('#net').val();
        bill.supplies = kr();
        $.ajax('/Billing',{
            type: "POST",
            data: JSON.stringify(bill),
            contentType: "application/json",
            success: function(data){
                location.reload();
            }
        });
    }
});
