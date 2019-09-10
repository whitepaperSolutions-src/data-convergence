$(document).ready(function () {
    var newDate, longText = "";
    $("input").attr("disabled", true);
    $("textArea").attr("disabled", true);
    var materialNumber = sessionStorage.getItem("materialNumber");
    var materialPlant = sessionStorage.getItem("materialPlant");

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

});