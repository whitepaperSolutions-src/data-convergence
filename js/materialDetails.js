$(document).ready(function () {
    var newDate, longText = "";
    $("input").attr("disabled", true);
    $("textArea").attr("disabled", true);
    var materialNumber = sessionStorage.getItem("materialNumber");
    var materialPlant = sessionStorage.getItem("materialPlant");
    var plantList = JSON.parse(sessionStorage.getItem("plantList"));

    $("#plantTableBody").empty();
    for (i = 0; i < plantList.d.results.length; i++) {
        html = "<tr><td>" + plantList.d.results[i].PlantText + "</td><td>" + plantList.d.results[i].SlocationText + "</td><td>" + plantList.d.results[i].Werks + "</td><td>" + plantList.d.results[i].Slocation + "</td></tr>";

        $("#plantTableBody").append(html);
    }
    plantDataTable = $('#plantTable').DataTable({
        "paging": false,
        "ordering": false,
        "info": false,
        "searching": false,
        scrollY: '400px',
        "columnDefs": [
            {
                "targets": [2],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [3],
                "visible": false,
                "searchable": false
            }
        ]
    });

    $.ajax({
        type: "GET",
        url: "http://13.126.33.197:8000/sap/opu/odata/sap/ZMASTER_MANAGEMENT_MATERIAL_SRV/es_material_details?$filter=IvMatnr eq '" + materialNumber + "' &$format=json&$expand=material_characterstics,material_long_text",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("wp_abap" + ":" + "sap@123"));
        },
        success: function (data) {
            newDate = new Date(parseInt(data.d.results[0].es_material_details.LastUpdateOn.substr(6, 13)));
            console.log(data.d.results[0].es_material_details.LastUpdateOn.substr(6, 13));
            console.log(newDate);
            $("#name").val(data.d.results[0].es_material_details.MaterialText);
            $("#storageLocation").val(data.d.results[0].es_material_details.SlocationText);
            $("#number").val(data.d.results[0].es_material_details.Matnr);
            $("#plant").val(materialPlant);
            // $("#text").val();
            $("#unitOfMeasure").val(data.d.results[0].es_material_details.Uom);
            $("#groupText").val(data.d.results[0].es_material_details.PgroupText);
            $("#purchaseGroup").val(data.d.results[0].es_material_details.Pgroup);
            $("#storagePeriod").val(data.d.results[0].es_material_details.StoragePeriod);
            $("#shelfLife").val(data.d.results[0].es_material_details.ShelfLife);
            $("#movingPrice").val(data.d.results[0].es_material_details.MovingPrice + " " + data.d.results[0].es_material_details.Currency);
            $("#totalValue").val(data.d.results[0].es_material_details.TotalValue + " " + data.d.results[0].es_material_details.Currency);
            $("#standardPrice").val(data.d.results[0].es_material_details.StandardPrice + " " + data.d.results[0].es_material_details.Currency);
            $("#lastPriceUpdate").val(newDate.getDate() + " / " + newDate.getMonth() + " / " + newDate.getFullYear());
            $("#Unrestricted").val(data.d.results[0].es_material_stock.Unrestricted);
            $("#RestrictedUse").val(data.d.results[0].es_material_stock.Restricted);
            $("#Blocked").val(data.d.results[0].es_material_stock.Blocked);
            $("#Returns").val(data.d.results[0].es_material_stock.Returns);
            $("#StockinTransfer").val(data.d.results[0].es_material_stock.InTransfer);
            $("#InQualityInspection").val(data.d.results[0].es_material_stock.InQuality);
            $("#InTransfer").val(data.d.results[0].es_material_stock.StockTransfer);
            $("#RestrictedConsignment").val(data.d.results[0].es_material_stock.ResConsi);
            $("#StockinTransit").val(data.d.results[0].es_material_stock.InTransit);
            $("#Consignmentininspetion").val(data.d.results[0].es_material_stock.ConsInsp);
            $("#BlockedConsignment").val(data.d.results[0].es_material_stock.BlockedCons);
            $("#UnrestrictedConsignment").val(data.d.results[0].es_material_stock.UnresCons);

            for (i = 0; i < data.d.results[0].material_long_text.results.length; i++) {
                if (data.d.results[0].material_long_text.results[i].Tdformat === "*") {
                    longText = longText + data.d.results[0].material_long_text.results[i].Tdline;
                }
                if (data.d.results[0].material_long_text.results[i].Tdformat === "/") {
                    longText = longText + "\n" + data.d.results[0].material_long_text.results[i].Tdline;
                }
            }
            $("#longText").val(longText);

        },
        error: function (e) {
            console.log(e);
        }
    });

    $("body").on("keyup", function (e) {
        if (e.keyCode == 27) {
            $("#extendMaterialTable").css('display', 'none');
            $('#plantTable tbody tr').removeClass('plantSelct');
        }
    });

    $("#extendMaterial").on("click", function () {
        $("#extendMaterialTable").css('display', 'flex');
        plantDataTable.draw(false);
    });

    $('#plantTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('plantSelct');
    });

    $("#selectAll").on("click", function () {
        $('#plantTable tbody tr').addClass('plantSelct');
    });

    $("#unselectAll").on("click", function () {
        $('#plantTable tbody tr').removeClass('plantSelct');
    });

    // extend material
    $("#ExtendToSelected").on("click", function () {
        // read selected data from Plant data table
        extWerks = plantDataTable.rows('.plantSelct').data()[0][1];
        extLgort = plantDataTable.rows('.plantSelct').data()[0][2];

        extData = {
            "EvType": "",
            "EvMessage": "",
            "Matnr": materialNumber,
            "Werks": extWerks,
            "Lgort": extLgort
        };
        console.log(extData);


        // ajax post call for extend material 
        $.ajax({
            url: "http://13.126.33.197:8000/sap/opu/odata/sap/ZMASTER_MANAGEMENT_MATERIAL_SRV/",
            type: "GET",
            beforeSend: function (xhr) {
                // xhr.setRequestHeader("Authorization", "Basic " + btoa("wp_abap" + ":" + "sap@123"));
                xhr.setRequestHeader("X-CSRF-Token", "Fetch");
            },

            complete: function (xhr) {
                token = xhr.getResponseHeader("X-CSRF-Token");

                $.ajax({
                    url: "http://13.126.33.197:8000/sap/opu/odata/sap/ZMASTER_MANAGEMENT_MATERIAL_SRV/es_material_extend",
                    data: JSON.stringify(extData),
                    type: "POST",
                    dataType: "json",
                    contentType: "Application/json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-CSRF-Token', token);
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("wp_abap" + ":" + "sap@123"));
                    },
                    success: function (result) {
                        $("#extendMaterialTable").css('display', 'none');
                        alert(result.d.EvMessage);
                        $('#plantTable tbody tr').removeClass('plantSelct');
                    },
                    error: function (xhr, status, err) {
                        alert("material extending failed. \n Server Error");
                        console.log(err);
                    }
                });
            }
        });
    });

});