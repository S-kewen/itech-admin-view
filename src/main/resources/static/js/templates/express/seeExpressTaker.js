layui.use('form', function () {
    var form = layui.form;
    form.render();
});
$(document).ready(function () {
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/express/getExpressTakerInfo",
        type: "post",
        dataType: "json",
        data: "id=" + getUrlValue("id"),
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            (msg.theUserId);
            if (msg.theUserId !== undefined) {
                $("#theInfo").removeAttr("style");
            }
            if (msg.status == 0) {
                $("#expressName").val(msg.expressName);
                $("#expressNum").val(msg.expressNum);
                $("#recipientName").val(msg.recipientName);
                $("#recipientPhone").val(msg.recipientPhone);
                $("#expressType").val(getMsgByType(msg.expressType));
                $("#takePoints").val(getMsgByPoints(msg.takePoints));
                $("#recipientName").val(msg.recipientName);
                $("#contactName").val(msg.contactName);
                $("#appointmentPoints").val(msg.appointmentPoints);
                $("#phone").val(msg.phone);
                $("#line").val(msg.line);
                $("#appointmentTime").val(formatter(msg.appointmentTime, "yyyy-MM-dd hh:mm:ss"));
                $("#remark").val(msg.remark);

                $("#theUserId").val(msg.theUserId);
                $("#theRealName").val(msg.theRealName);
                $("#thePhone").val(msg.thePhone);
                $("#theLine").val(msg.theLine);
                $("#theAllTotal").val(msg.theAllTotal);
                $("#theGrade").val(msg.theGrade);
            } else {
                showTip(msg.tip);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showTip("系統在開小差，請稍候再試");
        }
    })
})

function getMsgByPoints(id) {
    switch (id) {
        case 1:
            return "全家-龍潭店";
        case 2:
            return "全家-四維店";
        case 3:
            return "711-雲龍店";
        case 4:
            return "宿舍郵件中心";
        case 5:
            return "i郵箱";
        case 6:
            return "文書組";
        case 7:
            return "其他";
        case 8:
            return "全家-雲大店";
        default:
            return "未知";
    }
}

function getMsgByType(id) {
    switch (id) {
        case 1:
            return "小型";
        case 2:
            return "中型";
        case 3:
            return "大型";
        case 4:
            return "超大型";
        default:
            return "未知";
    }
}