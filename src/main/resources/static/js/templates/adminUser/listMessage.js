var grid = $("#dataTable").bootstrapTable({
    url: "//itech-admin-api.iskwen.com/api/adminUser/listMessage",
    height: document.body.clientHeight - 75,
    method: "post",
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    pagination: true,//是否显示分页（*）
    pageList: [10, 20, 50, 100, 500, 1000, '所有'], ////可供选择的每页的行数（*）
    pageSize: 20,
    pageNumber: 1,
    queryParamsType: "undefined",//改寫請求參數
    sortName: 'id',//默認按id排序
    sortOrder: 'asc',//默認從大到小
    cache: false,//緩存
    dataField: 'list',
    // cardView: true,//默認為card視圖，適用於移動端
    showColumns: true,//列篩選
    showToggle: true,//視圖切換按鈕
    showExport: true,//導出
    //导出表格方式（默认basic：只导出当前页的表格数据；all：导出所有数据；selected：导出选中的数据）
    exportDataType: "selected",
    exportTypes: ['json','txt', 'xml', 'csv', 'doc',  'excel'],
    exportOptions: {
        fileName: 'listMessage'+"_"+getFileName(),  //文件名称设置
        worksheetName: 'sheet1',  //表格工作区名称
        tableName: 'listMessage',
        excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
    },
    striped: true,//行黑白顏色間隔
    uniqueId: 'id',
    undefinedText: "-",
    sidePagination: "server", //服务端请求
    ajaxOptions: {
        headers: {"Authorization": getCookie("token")}
    },
    columns: [{
        checkbox: true
    },{
        field: 'id',
        title: '編號',
        align: 'center',
        sortable: true,
        width: 50
    }, {
        field: 'sender',
        title: '類型',
        align: 'center',
        sortable: true,
        width: 150
    }, {
        field: 'title',
        title: '標題',
        align: 'center',
        sortable: true,
        width: 150
    }, {
        field: 'msg',
        title: '內容',
        align: 'left',
        sortable: true,
        width: 450
    }, {
        field: 'state',
        title: '狀態',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            if (value == 1) {
                return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='看完就趕緊點已讀啊,撒小!!!' ly2-tips-color='#393D49'>未讀</a>";
            } else if (value == 2) {
                return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='已閱~' ly2-tips-color='#009688'>已讀</a>";
            } else {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='系統一臉懵逼的搖了搖頭~' ly2-tips-color='#FFB800'>未知</a>";
            }
        }
    }, {
        field: 'add_time',
        title: '创建时间',
        align: 'center',
        sortable: true,
        width: 150,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '-';
            }
            return formatter(value, "yyyy-MM-dd hh:mm:ss");
        }
    },
        {
            field: '',
            title: '操作',
            formatter: function (value, row, index) {
                var result = "";
                if (row.state == 1) {
                    result = "<button class='layui-btn  layui-btn-xs layui-btn-normal' onClick='javascript:readMessage(" + row.id + ")'>確認已讀</button>"
                } else {
                    result = "<button class='layui-btn layui-btn-xs layui-btn-disabled' disabled>確認已讀</button>"
                }
                return result + "<button class='layui-btn  layui-btn-xs layui-btn-danger' onClick='javascript:deleteMessage(" + row.id + ")'>删除</button>";
            }
        }], onLoadSuccess: function (msg) {
        ly2TipsInit();
        if (msg.status !== 0) {
            showTip(msg.tip);
        }
        document.querySelector(".fixed-table-body").addEventListener("scroll", function () {
            layer.closeAll('tips');
        });
    }, onLoadError: function (status) {
        showErrorMsg("http response error,code:" + status + "");
    },
    queryParams: queryParams
});

function reload() {
    grid.bootstrapTable('refresh');
    updateAllReadButtonState();
}

function queryParams(params) {
    var keyword = $("#keyword").val();
    if (keyword != '') {
        params.keyword = keyword;
    }
    var state = $("#state").val();
    if (state != '') {
        params.state = state;
    } else {
        params.state = 0;
    }
    var selectTime = $("#selectTime").val();
    if (selectTime != '') {
        let times = selectTime.split(" - ");
        if (times.length === 2) {
            params.startTime = times[0];
            params.endTime = times[1];
        }
    }
    params.timestamp = Date.parse(new Date()).toString().substr(0, 10);
    return params;
}

function resetSearch() {
    $("#keyword").val('');
    $("#state").val(0);
    $("#selectTime").val('');
    reload();
}

function deleteMessage(id) {
    if (id == '') {
        showTip("請選擇一條記錄");
    } else {
        showConfirm("溫馨提示", "您確定要刪除該記錄嗎？", function (index) {
            $.ajax({
                url: "//itech-admin-api.iskwen.com/api/adminUser/deleteMessage",
                type: "post",
                dataType: "json",
                data: "id=" + id,
                headers: {'Authorization': getCookie("token")},
                success: function (msg) {
                    if (msg.status == 0) {
                        showMsg("刪除成功")
                        layer.close(index);
                        reload();
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
}
var clipboard = new ClipboardJS('.btn');
clipboard.on('success', function (e) {
    showMsg("複製成功");
});
clipboard.on('error', function (e) {
    showTip("複製失敗");
});

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
function getFileName() {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 ;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    var tHours = today.getHours();
    var tMinutes = today.getMinutes();
    var tSeconds = today.getSeconds();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    tHours=doHandleMonth(tHours);
    tMinutes=doHandleMonth(tMinutes);
    tSeconds=doHandleMonth(tSeconds);
    return tYear + tMonth + tDate+tHours+tMinutes+tSeconds;
}

function doHandleMonth(month) {

    var m = month;

    if (month.toString().length == 1) {

        m = "0" + month;

    }

    return m;
}
function batchDelete() {
    var rows = $("#dataTable").bootstrapTable('getSelections');// 获得要删除的数据
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        showTip("請先選擇需要操作的記錄");
        return false;
    }
    showConfirm("溫馨提示", "您確定要刪除選中的"+rows.length+"條記錄嗎？", function (index) {
        var ids = new Array();// 声明一个数组
        $(rows).each(function() {// 通过获得别选中的来进行遍历
            if(this.state===2){
                ids.push(this.id);// cid为获得到的整条数据中的一列
            }
        });
        if(rows.length!==ids.length){
            showTip("未讀消息不允許進行刪除");
            return false;
        }
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/adminUser/batchDeleteMessage",
            type: "post",
            dataType: "json",
            data: "ids=" + ids,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    if(msg.count!==rows.length){
                        showMsg("成功刪除"+msg.count+"條數據,失敗:"+(rows.length-msg.count));
                    }else{
                        showMsg("成功刪除"+msg.count+"條數據");
                    }
                    updateAllReadButtonState();
                    layer.close(index);
                    reload();
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
function batchRead() {
    var rows = $("#dataTable").bootstrapTable('getSelections');// 获得要删除的数据
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        showTip("請先選擇需要操作的記錄");
        return false;
    }
    showConfirm("溫馨提示", "您確定要已讀選中的"+rows.length+"條記錄嗎？", function (index) {
        var ids = new Array();// 声明一个数组
        $(rows).each(function() {// 通过获得别选中的来进行遍历
                ids.push(this.id);// cid为获得到的整条数据中的一列
        });
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/adminUser/batchReadMessage",
            type: "post",
            dataType: "json",
            data: "ids=" + ids,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    if(msg.count!==rows.length){
                        showMsg("成功已讀"+msg.count+"條數據,失敗:"+(rows.length-msg.count));
                    }else{
                        showMsg("成功已讀"+msg.count+"條數據");
                    }
                    updateAllReadButtonState();
                    layer.close(index);
                    reload();
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

function updateAllReadButtonState() {
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/adminUser/getUnreadMessageCount",
        type: "post",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            if (msg.status == 0) {
                if (msg.unreadMessageCount > 0) {
                    $("#allRead").attr('disabled', false);
                    $("#unreadMessageCount").html(msg.unreadMessageCount);
                } else {
                    $("#unreadMessageCount").html(0);
                    $("#allRead").attr('disabled', true);
                }
                if (msg.unreadMessageCount > 99) {
                    parent.$('a[layadmin-event="message"] .layui-badge').text('99+');
                } else {
                    if (msg.unreadMessageCount > 0) {
                        parent.$('a[layadmin-event="message"] .layui-badge').text(msg.unreadMessageCount);
                    } else {
                        parent.$('a[layadmin-event="message"] .layui-badge').text(0);
                    }
                }
            } else {
                showTip(msg.tip);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showErrorMsg("系統在開小差，請稍候再試");
        }
    });
}

function allReadMessage() {
    showConfirm("温馨提示", "您确定要將全部消息設置為已讀嗎？", function (index) {
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/adminUser/allReadMessage",
            type: "post",
            dataType: "json",
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    showMsg("成功閱讀了" + msg.count + "條消息");
                    updateAllReadButtonState();
                    layer.close(index);
                    reload();
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

function readMessage(id) {
    if (id == '') {
        showTip("請選擇一條記錄");
    } else {
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/adminUser/readMessage",
            type: "post",
            dataType: "json",
            data: "id=" + id,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    showMsg("設置成功");
                    updateAllReadButtonState();
                    reload();
                } else {
                    showTip(msg.tip);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showTip("系統在開小差，請稍候再試");
            }
        })
    }
}
$(document).ready(function () {
    updateAllReadButtonState();
})
$(window).resize(function(){
    $("#dataTable").bootstrapTable('resetView', {
        height: document.body.clientHeight - 75
    });
});