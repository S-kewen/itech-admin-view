var grid = $("#dataTable").bootstrapTable({
    url: "//itech-admin-api.iskwen.com/api/flow/listYuntechFlowConfig",
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
    exportTypes: ['json', 'txt', 'xml', 'csv', 'doc', 'excel'],
    exportOptions: {
        fileName: 'listYuntechFlowConfig' + "_" + getFileName(),  //文件名称设置
        worksheetName: 'sheet1',  //表格工作区名称
        tableName: 'listYuntechFlowConfig',
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
    }, {
        field: 'id',
        title: '編號',
        align: 'center',
        sortable: true,
        width: 50
    }, {
        field: 'username',
        title: '用戶名',
        align: 'center',
        sortable: true,
        width: 100,
        formatter: function (value, row, index) {
            return "<button type='button' class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='[userId:" + row.user_id + "]' data-clipboard-text='" + value + "'>" + value + "</button>";
        }
    }, {
        field: 'max_enable',
        title: '最大值',
        align: 'center',
        sortable: true,
        width: 100,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '0';
            } else {
                return value;
            }
        }
    }, {
        field: 'remark',
        title: '備註',
        align: 'center',
        sortable: true,
        width: 250,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '-';
            } else {
                return value;
            }
        }
    }, {
        field: 'state',
        title: '狀態',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            if (value == 1) {
                return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='開放監控~' ly2-tips-color='#23C6C9'>正常</a>";
            } else if (value == 2) {
                return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='不允許監控!' ly2-tips-color='#F8AC59'>禁用</a>";
            } else if (value == 3) {
                return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='已被系統凍結!' ly2-tips-color='#1AB394'>凍結</a>";
            } else {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='系統一臉懵逼的搖了搖頭~' ly2-tips-color='#FFB800'>未知</a>";
            }
        }
    }, {
        field: 'add_time',
        title: '創建時間',
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
                    result = "<button class='layui-btn layui-btn-xs layui-btn-primary' onClick='javascript:changeState(" + row.id + ",2)'>禁用</button>";
                } else if (row.state == 2) {
                    result = "<button class='layui-btn layui-btn-xs layui-btn' onClick='javascript:changeState(" + row.id + ",1)'>開啟</button>";
                } else if (row.state == 3) {
                    result = "<button class='layui-btn layui-btn-xs layui-btn' onClick='javascript:changeState(" + row.id + ",1)'>解除</button>";
                }
                result += "<button class='layui-btn layui-btn-xs layui-btn-warm' onClick='javascript:changeMaxEnable(" + row.id + ","+row.max_enable+")'>修改</button>";
                return result;
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

function changeState(id, state) {
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/flow/changeYuntechFlowConfigState",
        type: "post",
        dataType: "json",
        data: "id=" + id + "&state=" + state,
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            if (msg.status == 0) {
                if (state === 1) {
                    showMsg("開啟成功");
                } else if (state === 2) {
                    showMsg("禁用成功");
                }
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
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    var tHours = today.getHours();
    var tMinutes = today.getMinutes();
    var tSeconds = today.getSeconds();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    tHours = doHandleMonth(tHours);
    tMinutes = doHandleMonth(tMinutes);
    tSeconds = doHandleMonth(tSeconds);
    return tYear + tMonth + tDate + tHours + tMinutes + tSeconds;
}

function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
        m = "0" + month;
    }
    return m;
}

function batchUpdateState(state) {
    var rows = $("#dataTable").bootstrapTable('getSelections');// 获得要删除的数据
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        showTip("請先選擇需要操作的記錄");
        return false;
    }
    var ids = new Array();// 声明一个数组
    $(rows).each(function () {// 通过获得别选中的来进行遍历
        ids.push(this.id);// cid为获得到的整条数据中的一列
    });
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/flow/batchUpdateYuntechFlowConfigState",
        type: "post",
        dataType: "json",
        data: "ids=" + ids + "&state=" + state,
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            if (msg.status == 0) {
                if (msg.count !== rows.length) {
                    showMsg("操作成功" + msg.count + "條記錄,失敗:" + (rows.length - msg.count));
                } else {
                    showMsg("操作成功" + msg.count + "條記錄");
                }
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
}

function changeMaxEnable(id,oldVal) {
    layer.prompt({
        title: '修改',
        value: oldVal
    }, function (val, index) {
        if (val === "") {
            showTip("輸入值不能為空");
            return false;
        }
        if (!isInteger(val)) {
            showTip("輸入值必須為整數");
            return false;
        }
        if (val <= 0) {
            showTip("輸入值必須大於0");
            return false;
        }
        if (val > 10000) {
            showTip("輸入值不能大於1萬");
            return false;
        }
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/flow/changeYuntechFlowConfigMaxEnable",
            type: "post",
            dataType: "json",
            data: "id=" + id + "&val=" + val,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    showMsg("修改成功");
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

function isInteger(n) {
    return parseInt(n) == parseFloat(n)
}
function  batchChangeMaxEnable() {
    var rows = $("#dataTable").bootstrapTable('getSelections');// 获得要删除的数据
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        showTip("請先選擇需要操作的記錄");
        return false;
    }
    var ids = new Array();// 声明一个数组
    $(rows).each(function () {// 通过获得别选中的来进行遍历
        ids.push(this.id);// cid为获得到的整条数据中的一列
    });
    layer.prompt({
        title: '修改'
    }, function (val, index) {
        if (val === "") {
            showTip("輸入值不能為空");
            return false;
        }
        if (!isInteger(val)) {
            showTip("輸入值必須為整數");
            return false;
        }
        if (val <= 0) {
            showTip("輸入值必須大於0");
            return false;
        }
        if (val > 10000) {
            showTip("輸入值不能大於1萬");
            return false;
        }
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/flow/batchChangeYuntechFlowConfigMaxEnable",
            type: "post",
            dataType: "json",
            data: "ids=" + ids + "&val=" + val,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    if (msg.count !== rows.length) {
                        showMsg("操作成功" + msg.count + "條記錄,失敗:" + (rows.length - msg.count));
                    } else {
                        showMsg("操作成功" + msg.count + "條記錄");
                    }
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
$(window).resize(function(){
    $("#dataTable").bootstrapTable('resetView', {
        height: document.body.clientHeight - 75
    });
});