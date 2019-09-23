$(document).ready(function () {

    $("body").LoadingOverlay("show");
    // var table = $('#materialTable').DataTable({ paging: false });

    $.ajax({
        type: "GET",
        url: "http://13.126.33.197:8000/sap/opu/odata/sap/ZMASTER_MANAGEMENT_MATERIAL_SRV/es_customer_master/?$format=json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("wp_abap" + ":" + "sap@123"));
        },
        success: function (data) {
            customerList = data;
            console.log(parseInt(customerList.d.results[0].MaterialNo));

            $("#customerTableBody").empty();
            for (i = 0; i < customerList.d.results.length; i++) {
                html = "<tr><td>" + customerList.d.results[i].CustomerNo + "</td><td>" + customerList.d.results[i].CustomerName + "</td><td>" + customerList.d.results[i].CustomerCity + " </td><td>" + customerList.d.results[i].CustomerCountry + "</td><td>" + customerList.d.results[i].CustomerCountryCode + "</td><td>" + customerList.d.results[i].ContactPersonName + "</td><td>" + customerList.d.results[i].ContactEmail + "</td><td>" + customerList.d.results[i].ContactNo + "</td><td>" + customerList.d.results[i].GroupCode + "</td><td>" + customerList.d.results[i].GroupName + "</td> </tr>";

                $("#customerTableBody").append(html);

            }
            customerDataTable = $('#customerTable').DataTable({
                "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
                "columnDefs": [
                    {
                        "targets": [9],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [8],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [7],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [6],
                        "visible": false,
                        "searchable": false
                    }
                ]
            });
            $("body").LoadingOverlay("hide");
        },
        error: function (e) {
            alert("SERVER ERROR: Please try after some time");
            // console.log(e.status);
            // console.log(e.statusText);
            $("body").LoadingOverlay("hide");
        }
    });

    // table events
    $('#customerTable tbody').on('click', 'tr', function () {
        if ($('#selectRow').is(":checked") === true) {
            $(this).toggleClass('selected');

        } else {
            var data = customerDataTable.row(this).data();
            alert('You clicked on ' + data[0] + '\'s row');
        }
    });

    // select enable and disable
    $("#selectRow").click(function () {
        if ($('#selectRow').is(":checked") === false) {
            $('#customerTable tbody tr').removeClass('selected');
        } else {

        }
    });

    // reading the selected items on read select click event
    // $('#readSelect').click(function () {
    //     console.log(table.rows('.selected').data());
    // });



    // click events


    $("#selectRow").click(function () {
        if ($('#selectRow').is(":checked") === false) {
            $('#materialTable tbody tr').removeClass('selected');
        }
    });

    $("#add").click(function () {
        $("#addMenu").toggle(200);
    });

    $("#createSingle").click(function () {
        $("#addMenu").hide(200);
    });

    $("#createMultiple").click(function () {
        $("#addMenu").hide(200);
    });

    $("#openNav").click(function () {
        $("#navbar").css("width", "200px");
    });

    $("#closeNav").click(function () {
        $("#navbar").css("width", "0");
    });

    $("#profileImage").click(function () {
        $("#profileMenu").toggle(200);
    });

    $("#viewProfile").click(function () {
        $("#profileMenu").hide(200);
    });

    $("#changePassword").click(function () {
        $("#profileMenu").hide(200);
    });

    $("#logOut").click(function () {
        $("#profileMenu").hide(200);
        location.href = './login.html';
    });


});