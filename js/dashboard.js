$(document).ready(function () {

    var userProfile = localStorage.getItem("userProfile");
    userProfile = JSON.parse(userProfile);
    $(".card").hide();
    if (userProfile.AuthorizationErrro === "X" || userProfile.AuthorizationErrro === "x") {
        alert("You are not authorized to access any of the features");
    }
    if (userProfile.MaterialVisible === "X" || userProfile.MaterialVisible === "x") {
        $("#material").show();
    }
    if (userProfile.CustomerVisible === "X" || userProfile.CustomerVisible === "x") {
        $("#Customer").show();
    }
    if (userProfile.VendorVisible === "X" || userProfile.VendorVisible === "x") {
        $("#Vendor").show();
    }
    if (userProfile.AssetsVisible === "X" || userProfile.AssetsVisible === "x") {
        $("#Assets").show();
    }
    if (userProfile.CatalogVisible === "X" || userProfile.CatalogVisible === "x") {
        $("#Catalog").show();
    }
    if (userProfile.ReportsVisible === "X" || userProfile.ReportsVisible === "x") {
        $("#Reports").show();
    }
    if (userProfile.TasksVisible === "X" || userProfile.TasksVisible === "x") {
        $("#myTasks").show();
    }

    $("#material p").text(userProfile.MaterialCount);
    $("#Customer p").text(userProfile.CustomerCount);
    $("#Vendor p").text(userProfile.VendorCount);
    $("#Assets p").text(userProfile.AssetsCount);
    $("#myTasks p").text(userProfile.TasksCount);

    // add items 
    $("#addMaterial").click(function () {
        $("#addMenu").hide(200);
    });

    $("#addCustomer").click(function () {
        $("#addMenu").hide(200);
    });

    $("#addVendor").click(function () {
        $("#addMenu").hide(200);
    });

    $("#addAssets").click(function () {
        $("#addMenu").hide(200);
    });

    $("#addCatalog").click(function () {
        $("#addMenu").hide(200);
    });

    $("#addReport").click(function () {
        $("#addMenu").hide(200);
    });

    // navigation links
    $("#material").click(function () {
        location.href = './material.html';
    });
    $("#Customer").click(function () {
        location.href = './customer.html';
    });
    $("#Vendor").click(function () {
        location.href = './Vendor.html';
    });

});