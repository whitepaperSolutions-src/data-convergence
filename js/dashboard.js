$(document).ready(function () {
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