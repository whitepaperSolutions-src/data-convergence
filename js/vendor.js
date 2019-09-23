$(document).ready(function () {
    $("body").LoadingOverlay("show");
    // var table = $('#materialTable').DataTable({ paging: false });

    $.ajax({
        type: "GET",
        url: "http://13.126.33.197:8000/sap/opu/odata/sap/ZMASTER_MANAGEMENT_MATERIAL_SRV/es_vendor_master/?$format=json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("wp_abap" + ":" + "sap@123"));
        },
        success: function (data) {
            vendorList = data;
            console.log(parseInt(vendorList.d.results[0].MaterialNo));

            $("#vendorTableBody").empty();
            for (i = 0; i < vendorList.d.results.length; i++) {
                html = "<tr><td>" + vendorList.d.results[i].VendorNumber + "</td><td> " + vendorList.d.results[i].VendorName + "</td><td>" + vendorList.d.results[i].VendorCategory + " </td><td>" + vendorList.d.results[i].VendorCity + "</td><td>" + vendorList.d.results[i].VendorCountry + "</td><td>" + vendorList.d.results[i].VendorContactName + "</td><td>" + vendorList.d.results[i].VendorEmail + "</td><td>" + vendorList.d.results[i].VendorPhone + "</td></tr>";

                $("#vendorTableBody").append(html);

            }
            vendorDataTable = $('#vendorTable').DataTable({
                "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
                "columnDefs": [
                    {
                        "targets": [6],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [7],
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
    $('#vendorTable tbody').on('click', 'tr', function () {
        if ($('#selectRow').is(":checked") === true) {
            $(this).toggleClass('selected');

        } else {
            var data = vendorDataTable.row(this).data();
            alert('You clicked on ' + data[0] + '\'s row');
        }
    });

    // select enable and disable
    $("#selectRow").click(function () {
        if ($('#selectRow').is(":checked") === false) {
            $('#vendorTable tbody tr').removeClass('selected');
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