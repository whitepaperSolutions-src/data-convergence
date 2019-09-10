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
