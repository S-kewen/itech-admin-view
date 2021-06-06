layui.config({
    base: 'https://static.iskwen.com/yuntechlifeadmin/config/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'set']);
var upload = layui.upload,
    element = layui.element;
$(document).ready(function () {
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/user/getUserInfo?id="+getUrlValue("id"),
        type: "post",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            if (msg.status === 0) {
                $("#username").val(msg.username);
                $("#LAY_avatarSrc").val(msg.avatar);
                $("#email").val(msg.email);
                $("#phone").val(msg.phone);
                $("#line").val(msg.line);
            } else {
                showTip(msg.tip);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showErrorMsg("系統在開小差，請稍候再試");
        }
    });
})

function post() {
    let password = $("#password").val();
    const avatar = $("#LAY_avatarSrc").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const line = $("#line").val();
    if (password != "" && password.length < 8) {
        showTip("密碼長度不能小於8");
        return false;
    }
    if (password != "" && password.length > 16) {
        showTip("密碼長度不能大於16");
        return false;
    }
    if(password!=""){
        password=hex_md5(password);
    }
    if (avatar === '') {
        showTip("頭像不能為空");
        return false;
    }
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
    if (line != '' && line.length > 255) {
        showTip("line不能大於255");
        return false;
    }
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/user/updateUser",
        type: "post",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        data: "id="+getUrlValue("id")+"&password=" + password + "&avatar=" + avatar + "&email=" + email + "&phone=" + phone + "&line=" + line,
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

function resetAvatar() {
     $("#LAY_avatarSrc").val("https://static.iskwen.com/yuntechlife/images/avatar.png");
     showMsg("重置成功");
}