var form = layui.form;
form.render();
var element = layui.element;
element.init();
$(document).ready(function () {
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/business/getAdvertInfo",
        type: "post",
        dataType: "json",
        data: "id="+getUrlValue("id"),
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            if (msg.status === 0) {
                $("#title").val(msg.title);
                $("#priority").val(msg.priority);
                $("#selectTime").val(msg.startTime+" - "+msg.endTime);
                $("#layText").val(msg.layText);
                $("#jumpType").val(msg.jumpType);
                $("#url").val(msg.url);
                $("#color").val(msg.color);
                form.render();
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
    const id=getUrlValue("id");
    const title = $("#title").val();
    const priority = $("#priority").val();
    const selectTime = $("#selectTime").val();
    const layText = $("#layText").val();
    const jumpType = $("#jumpType").val();
    const url = $("#url").val();
    const color = $("#color").val();
    if (id === '' || id===null || id===undefined) {
        showTip("非法請求");
        return false;
    }
    if (title === '') {
        showTip("標題不能為空");
        return false;
    }
    if (priority==='') {
        showTip("優先級不能為空");
        return false;
    }
    if (priority<=0) {
        showTip("優先級必須大於0");
        return false;
    }
    if (priority>10000) {
        showTip("優先級必須不能大於10000");
        return false;
    }
    if (selectTime==='') {
        showTip("展示時間不能為空");
        return false;
    }
    let times = selectTime.split(" - ");
    let startTime="";
    let endTime="";
    if (times.length === 2) {
         startTime = times[0];
         endTime = times[1];
    }else{
        showTip("展示時間輸入有誤");
        return false;
    }
    if (startTime==='' || endTime===''){
        showTip("展示時間格式有誤");
        return false;
    }
    if (layText==='' && jumpType===1) {
        showTip("內部標題不能為空");
        return false;
    }
    if (jumpType==='' || jumpType===null || jumpType===undefined) {
        showTip("請先選擇跳轉類型");
        return false;
    }
    if (url==='') {
        showTip("url不能為空");
        return false;
    }
    if (color==='' || color===null || color===undefined) {
        showTip("請先選擇主題");
        return false;
    }
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/business/updateAdvert",
        type: "post",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        data: "id="+id+"&title=" + title + "&priority=" + priority +"&startTime=" + startTime+"&endTime="+endTime+"&layText="+layText+"&jumpType="+jumpType+"&url="+url+"&color="+color,
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
function getLaydateLang() {
    switch (getLangByRequest()) {
        case "zh-TW":
            return "en";
        case "zh-CN":
            return "cn";
        case "en":
            return "en";
        default:
            return "en";
    }
}