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

function isInteger(n){
    return parseInt(n) == parseFloat(n)
}
function isFloat(n){
    return parseInt(n) < parseFloat(n)
}
function getFloatLength(num) {
    var x = String(num).indexOf('.') + 1;   //小数点的位置
    var y = String(num).length - x;  //小数的位数
    return y;
}
function checkVaildTime(str) {
    var thetime = str;
    var   d=new   Date(Date.parse(thetime .replace(/-/g,"/")));

    var   curDate=new   Date();
    if(d <=curDate){
        return false;
    }else{
        return true;
    }
}
function post() {
    const amount = $("#amount").val();
    const num = $("#num").val();
    const vaildTime = $("#vaildTime").val();
    const remark = $("#remark").val();
    if (amount===""){
        showTip("卡密金額不能為空");
        return false;
    }
    if (amount<=0){
        showTip("金額必須大於0");
        return false;
    }
    if(!isInteger(amount) && !isFloat(amount)){
        showTip("金額輸入有誤");
        return false;
    }
    if(isFloat(amount) && getFloatLength(amount)>2){
        showTip("金額精確到小數後2位");
        return false;
    }
    if(amount>100000){
        showTip("金額不能大於10萬");
        return false;
    }
    if (num===""){
        showTip("生成數量不能為空");
        return false;
    }
    if (num<=0){
        showTip("生成數量必須大於0");
        return false;
    }
    if (!isInteger(num)){
        showTip("生成數量輸入有誤");
        return false;
    }
    if(num>10000){
        showTip("數量不能大於10000");
        return false;
    }
    if (vaildTime===""){
        showTip("有效期不能為空");
        return false;
    }
    if (!checkVaildTime(vaildTime)){
        showTip("有效期必須大於當前時間");
        return false;
    }
    if (remark.length>255){
        showTip("備註長度不能大於255");
        return false;
    }
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/recharge/addCard",
        type: "post",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        data: "amount=" + amount + "&num=" + num + "&vaildTime=" + vaildTime + "&remark=" + remark,
        success: function (msg) {
            if (msg.status === 0) {
                layer.msg('生成成功', {icon: 1, time: 1000}, function () {
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