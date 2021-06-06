$(document).ready(function () {
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/senior/getMessageQueueInfo",
        type: "post",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        data: "id="+getUrlValue("id"),
        success: function (msg) {
            if (msg.status === 0) {
                $("#to").val(msg.to);
                $("#title").val(msg.title);
                $("#msg").val(msg.msg);
            } else {
                showTip(msg.tip);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showErrorMsg("系統在開小差，請稍候再試");
        }
    });
})