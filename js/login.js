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

        $.ajax({
            type: "GET",
            url: "http://13.126.33.197:8000/sap/opu/odata/sap/ZMASTER_MANAGEMENT_MATERIAL_SRV/es_user_Profiles/?$format=json",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(userName + ":" + password));
            },
            success: function (data) {
                localStorage.setItem("userProfile", JSON.stringify(data.d.results[0]));
                $("#error").hide();
                location.href = './dashboard.html';
                // console.log(data.d.results[0].UserId);

            },
            error: function (e) {
                if (e.status == 0 || e.status == 401) {
                    $("#error").show();
                    $("#password").val("");
                    return;
                }
                alert("SERVER ERROR: Please try after some time");
                console.log(e);
                // console.log(e.status);
                // console.log(e.statusText);
            }
        });

        // if (userName === "admin" && password === "login") {
        //     $("#error").hide();
        //     location.href = './dashboard.html';
        // } else {
        //     $("#error").show();
        //     $("#password").val("");
        // }
    }
});