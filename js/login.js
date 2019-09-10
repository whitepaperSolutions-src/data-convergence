$(document).ready(function () {
    $("#login").click(login);

    $('#password').on("keyup", function (e) {
        if (e.keyCode == 13) {
            login();
        }
    });
    $('#userName').on("keyup", function (e) {
        if (e.keyCode == 13) {
            $('#password').focus();
        }
    });

    function login() {

        var userName = $("#userName").val();
        var password = $("#password").val();

        if (userName === "admin" && password === "login") {
            $("#error").hide();
            location.href = './dashboard.html';
        } else {
            $("#error").show();
            $("#password").val("");
        }
    }
});