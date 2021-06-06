layui.config({
    base: 'https://static.iskwen.com/yuntechlifeadmin/config/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'set']);
var upload = layui.upload,
    element = layui.element;
$(document).ready(function () {
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/adminUser/getUserInfo",
        type: "post",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            if (msg.status === 0) {
                $("#username").val(msg.username);
                $("#email").val(msg.email);
                $("#phone").val(msg.phone);
                $("#remark").val(msg.remark);
            } else {
                showTip(msg.tip);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showErrorMsg("系統在開小差，請稍候再試");
        }
    });
})

function clearInput() {
    $("#email").val("");
    $("#phone").val("");
    $("#remark").val("");
}

function modifyInfo() {
    const email = $("#email").val();
    const phone = $("#phone").val();
    const remark = $("#remark").val();
    if (email === '') {
        showTip("郵箱地址不能為空");
        return false;
    }
    if (!checkEmail(email)) {
        showTip("郵箱地址輸入有誤");
        return false;
    }
    if (phone != '' && !checkPhone(phone)) {
        showTip("手機號碼輸入有誤");
        return false;
    }
    if (remark.length > 255) {
        showTip("備註長度不能大於255");
        return false;
    }
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/adminUser/modifyInfo",
        type: "post",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        data: "email=" + email + "&phone=" + phone +"&remark=" + remark,
        success: function (msg) {
            if (msg.status === 0) {
                layer.msg('修改成功', {icon: 1, time: 1000}, function () {
                    if (getUrlValue("byUrl") !== '') {
                        if (parent.$('#LAY_app_tabsheader>li[lay-id="' + getUrlValue("byUrl") + '"] ').length === 1) {
                            parent.layui.admin.events.changeThisTabsByRefresh(getUrlValue("byUrl"), decodeURI(getUrlValue("byText")), true);
                        } else {
                            parent.layui.admin.events.closeThisTabs();
                        }
                    } else {
                        parent.layui.admin.events.closeThisTabs();
                    }
                });
            } else {
                showTip(msg.tip);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showErrorMsg("系統在開小差，請稍候再試");
        }
    });
}

function checkEmail(str) {
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

function checkPhone(str) {
    if (RegExp(/^[0][0-9]{9}$/).test(str)) {
        return true;
    } else if (RegExp(/^[1][0-9]{10}$/).test(str)) {
        return true;
    } else {
        return false;
    }
}