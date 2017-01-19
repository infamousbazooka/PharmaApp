$('#selector').on('change', function(event) {
    $('#tbody').html("");
    $.ajax('/GetBills', {
        type: "POST",
        data: { date: $('#selector').val() },
        success: function(data){
            for (var i = 0; i < data.length; i++) {
                $('#tbody').append('<tr onclick = "openl(\'' + data[i]._id + '\')"><td>' + data[i].invoice + '</td><td>' + data[i].doctor + '</td><td>' + data[i].patient + '</td><td>' + data[i].netTotal + '</td>>');
            }
        }
    });
});


function openl(link){
    console.log(link);
    window.document.location = "http://localhost:3000/Report/" + link;
}
