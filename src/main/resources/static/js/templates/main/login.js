window.callback = function (res) {
    // showNoticeSucc("驗證成功");
    var username = $("#username").val();
    var password = $("#password").val();
    if (username == '') {
        swal("Error", "Username can't be empty!", "error");
        $("#username").focus();
        return false;
    }
    if (password == '') {
        swal("Error", "Password can't be empty!", "error");
        $("#password").focus();
        return false;
    }
    if (res.ret === 0) {
        var validate = res.ticket;
        var randstr = res.randstr;
        if (validate == '') {
            swal("Error", "Validate can't be empty!", "error");
            return false;
        }
        //showNoticeInfo("正在發出登錄請求...");
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/adminUser/login",
            type: "POST",
            dataType: "json",
            data: "username=" + username + "&password=" + hex_md5(password) + "&vall=" + validate + "&randstr=" + randstr,
            success: function (msg) {
                if (msg.status === 0) {
                    swal(
                        "Success",
                        "Login successful!",
                        "success"
                    ).then(
                        function () {
                            setCookie("token", msg.token, 1000 * 60 * 60 * 2);
                            top.window.location = 'index';
                        }
                    );
                } else {
                    swal("Error", msg.tip, "error");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                swal("Error", "System error!", "error");
            }
        });

    }
}

function loginKey() {
    if (event.keyCode == 13)   //回车键的键值为13
        document.getElementById("TencentCaptcha").click();
}