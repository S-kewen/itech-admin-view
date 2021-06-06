var nowDate = getDay(0);
$(document).ready(function () {
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/home/getConsoleInfo?nowDate=" + nowDate,
        type: "POST",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            if (msg.status == 0) {
                $("#todayPvCount").html(msg.todayPvCount);
                $("#allPvCount").html(msg.allPvCount);
                $("#userCount").html(msg.userCount);
                $("#userActiveRatio").html(((msg.userActiveCount / msg.userCount)*100).toFixed(2));
                $("#todayIncome").html(msg.todayIncome.toFixed(2));
                $("#allIncome").html(msg.allIncome.toFixed(2));
                $("#uncompleteOrderCount").html(msg.uncompleteOrderCount);
                $("#orderCount").html(msg.orderCount);
                $("#cpu").html(msg.cpu.toFixed(2));
                $("#ram").html(msg.ram.toFixed(2));
                $(".num-jump-thousands").numScroll({
                    toThousands: true
                });
                let userAddRatio = (((msg.userCount - msg.yesterdayUserCount) / msg.userCount)*100).toFixed(2);
                let userCertificationRatio = ((msg.certificationUserCount / msg.userCount)*100).toFixed(2);
                let userAddRatioTip, userCertificationRatioTip;
                if (userAddRatio - 10 > 0) {
                    userAddRatioTip = "增長率(較預期增長 " + (userAddRatio - 10).toFixed(2) + "% <span class=\"layui-edge layui-edge-top\" lay-tips=\"增长\" lay-offset=\"-15\"></span>)";
                } else {
                    userAddRatioTip = "增長率(較預期下降 " + (10 - userAddRatio).toFixed(2) + "% <span class=\"layui-edge layui-edge-bottom\" lay-tips=\"下降\" lay-offset=\"-15\"></span>)";
                }
                if (userCertificationRatio - 50 > 0) {
                    userCertificationRatioTip = "實名率(較預期增長 " + (userCertificationRatio - 50).toFixed(2) + "% <span class=\"layui-edge layui-edge-top\" lay-tips=\"增长\" lay-offset=\"-15\"></span>)";
                } else {
                    userCertificationRatioTip = "實名率(較預期下降 " + (50 - userCertificationRatio).toFixed(2) + "% <span class=\"layui-edge layui-edge-bottom\" lay-tips=\"下降\" lay-offset=\"-15\"></span>)";
                }
                $("#userAddRatio").attr("lay-percent", userAddRatio + "%");
                $("#userCertificationRatio").attr("lay-percent", userCertificationRatio + "%");
                if (userAddRatio > 75) {
                    $("#userAddRatio").attr("class", "layui-progress-bar layui-bg-red");
                } else if (userAddRatio > 50) {
                    $("#userAddRatio").attr("class", "layui-progress-bar layui-bg-orange");
                } else if (userAddRatio > 25) {
                    $("#userAddRatio").attr("class", "layui-progress-bar layui-bg-blue");
                } else {
                    $("#userAddRatio").attr("class", "layui-progress-bar layui-bg-green");
                }
                if (userCertificationRatio > 75) {
                    $("#userCertificationRatio").attr("class", "layui-progress-bar layui-bg-red");
                } else if (userCertificationRatio > 50) {
                    $("#userCertificationRatio").attr("class", "layui-progress-bar layui-bg-orange");
                } else if (userCertificationRatio > 25) {
                    $("#userCertificationRatio").attr("class", "layui-progress-bar layui-bg-blue");
                } else {
                    $("#userCertificationRatio").attr("class", "layui-progress-bar layui-bg-green");
                }
                $("#userAddRatioTip").html(userAddRatioTip);
                $("#userCertificationRatioTip").html(userCertificationRatioTip);
                $("#pvCount").attr("lay-percent", ((msg.todayPvCount / 1000)*100).toFixed(2) + "%");
                $("#cpu").attr("lay-percent", msg.cpu.toFixed(2) + "%");
                $("#ram").attr("lay-percent", msg.ram.toFixed(2) + "%");
                if ((msg.todayPvCount / 1000) > 75) {
                    $("#pvCount").attr("class", "layui-progress-bar layui-bg-red");
                } else if ((msg.todayPvCount / 1000) > 50) {
                    $("#pvCount").attr("class", "layui-progress-bar layui-bg-orange");
                } else if ((msg.todayPvCount / 1000) > 25) {
                    $("#pvCount").attr("class", "layui-progress-bar layui-bg-blue");
                } else {
                    $("#pvCount").attr("class", "layui-progress-bar layui-bg-green");
                }
                if (msg.cpu > 75) {
                    $("#cpu").attr("class", "layui-progress-bar layui-bg-red");
                } else if (msg.cpu > 50) {
                    $("#cpu").attr("class", "layui-progress-bar layui-bg-orange");
                } else if (msg.cpu > 25) {
                    $("#cpu").attr("class", "layui-progress-bar layui-bg-blue");
                } else {
                    $("#cpu").attr("class", "layui-progress-bar layui-bg-green");
                }
                if (msg.ram > 75) {
                    $("#ram").attr("class", "layui-progress-bar layui-bg-red");
                } else if (msg.ram > 50) {
                    $("#ram").attr("class", "layui-progress-bar layui-bg-orange");
                } else if (msg.ram > 25) {
                    $("#ram").attr("class", "layui-progress-bar layui-bg-blue");
                } else {
                    $("#ram").attr("class", "layui-progress-bar layui-bg-green");
                }
                layui.use('element', function () {
                    const element = layui.element;
                    element.init();
                });
            } else {
                showTip(msg.tip);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            <!--showErrorMsg(XMLHttpRequest.status);-->
            showErrorMsg("系統在開小差，請稍候再試");
        }
    });
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/home/getFeedbackList",
        type: "POST",
        dataType: "json",
        async: false,
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            if (msg.status === 0) {
                let list = "";
                $.each(msg.list, function (index, json) {
                    list += "<li><h3>" + json.username + "</h3>" + getFeedbackTypeTip(json.type) + "<p>" + json.content + "</p><span>" + formatter(json.add_time, "yyyy-MM-dd hh:mm:ss") + "</span>" + getFeedbackStateTip(json.state) + "<a href=\"javascript:deleteFeedback(" + json.id + ");\" class=\"layui-btn layui-btn-xs layui-btn-danger layuiadmin-reply\">刪除</a></li>";
                });
                $("#listFeedback").html(list);
                ly2TipsInit();
            } else {
                showTip(msg.tip);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            <!--showErrorMsg(XMLHttpRequest.status);-->
            showErrorMsg("系統在開小差，請稍候再試");
        }
    });
})

function logout() {
    showConfirm("溫馨提示", "您確認要退出登錄嗎？", function (index) {
        showNoticeSucc("正在退出登錄...");
        top.location.href = "/logout";
    });
}

function getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}

function getHours() {
    var today = new Date();
    var targetday_milliseconds = today.getTime();
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    return today.getHours();
}

function doHandleMonth(month) {

    var m = month;

    if (month.toString().length == 1) {

        m = "0" + month;

    }

    return m;

}

function getListsInfoBydate(list, date) {
    for (let i = 0; i < list.length; i++) {
        if (formatter(list[i].add_time, "yyyy-MM-dd") === date) {
            return list[i];
        }
    }
    return {
        pv_count: 0,
        visit_count: 0,
        visitor_count: 0,
        avg_visit_time: 0,
        new_visitor_count: 0,
        bounce_ratio: 0.00,
    };
}

function addDay(val, num) {
    var today = new Date(val);
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * num;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}

function getDayAndWeek(day) {
    var a = ["日", "一", "二", "三", "四", "五", "六"];
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tMonth + "-" + tDate + "[周" + a[today.getDay()] + "]";
}

function getStyleByColor(color) {
    let result = "layui-bg-";
    //1red,2orange,3green,4cyan,5blue,6black,7gray
    switch (color) {
        case 1:
            return result + "red";
        case 2:
            return result + "orange";
        case 3:
            return result + "green";
        case 4:
            return result + "cyan";
        case 5:
            return result + "blue";
        case 6:
            return result + "black";
        case 7:
            return result + "gray";
        default:
            return result + "red";
    }

}

function deleteFeedback(id) {
    showConfirm("溫馨提示", "您確定要刪除該記錄嗎？", function (index) {
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/system/deleteFeedback",
            type: "post",
            dataType: "json",
            data: "id=" + id+"&deleted=true",
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    // showMsg("刪除成功");
                    layer.close(index);
                    parent.layui.admin.events.refresh();
                } else {
                    showTip(msg.tip);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showTip("系統在開小差，請稍候再試");
            }
        })
    });
}

function getFeedbackTypeTip(type) {
    switch (type) {
        case 1:
            return "<h5 style=\"color: #009688\">前端頁面設計問題</h5>";
        case 2:
            return "<h5 style=\"color: #393D49\">功能模塊問題</h5>";
        case 3:
            return "<h5 style=\"color: #FFB800\">客服投訴</h5>";
        case 4:
            return "<h5 style=\"color: #FF5722\">其他問題</h5>";
        default:
            return "<h5 style=\"color: #ff131a\">unknown</h5>";
    }
}

function getFeedbackStateTip(state) {
    switch (state) {
        case 1:
            return "&nbsp;&nbsp;<a class=\"layui-btn layui-btn-xs layui-btn-radius layui-btn-warm ly2-tips\" ly2-tips-text=\"未解決\" ly2-tips-color=\"#FF5722\">待處理</a>";
        case 2:
            return "&nbsp;&nbsp;<a class=\"layui-btn layui-btn-xs layui-btn-radius ly2-tips\" ly2-tips-text=\"已解決\" ly2-tips-color=\"#009688\">已解決</a>";
        default:
            return "&nbsp;&nbsp;<a class=\"layui-btn layui-btn-xs layui-btn-radius layui-btn-disabled ly2-tips\" ly2-tips-text=\"unknown\" ly2-tips-color=\"#FF5722\">unknown</a>";
    }
}