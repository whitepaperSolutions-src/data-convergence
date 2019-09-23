$(document).ready(function () {
    var userProfile = JSON.parse(localStorage.getItem("userProfile"));
    console.log(userProfile);
    $("#navbar a").hide();
    $("#navbar a").eq(0).show();
    $("#navbar a").eq(1).show();


    if (userProfile.MaterialVisible === "X" || userProfile.MaterialVisible === "x") {
        $("#navbar a").eq(2).show();
    }
    if (userProfile.CustomerVisible === "X" || userProfile.CustomerVisible === "x") {
        $("#navbar a").eq(3).show();
    }
    if (userProfile.VendorVisible === "X" || userProfile.VendorVisible === "x") {
        $("#navbar a").eq(4).show();
    }
    if (userProfile.AssetsVisible === "X" || userProfile.AssetsVisible === "x") {
        $("#navbar a").eq(5).show();
    }
    if (userProfile.CatalogVisible === "X" || userProfile.CatalogVisible === "x") {
        $("#navbar a").eq(6).show();
    }
    if (userProfile.ReportsVisible === "X" || userProfile.ReportsVisible === "x") {
        $("#navbar a").eq(7).show();
    }
    if (userProfile.TasksVisible === "X" || userProfile.TasksVisible === "x") {
        $("#navbar a").eq(8).show();
    }


    // nav open and close
    $("#openNav").click(function () {
        $("#navbar").css("width", "200px");
    });

    $("#closeNav").click(function () {
        $("#profileMenu").hide(200);
        $("#navbar").css("width", "0");
    });

    // add material menu controls
    $("#add").click(function () {
        $("#addMenu").toggle(200);
    });

    // profile controls
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

