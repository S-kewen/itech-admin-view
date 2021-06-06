var grid = $("#dataTable").bootstrapTable({
    url: "//itech-admin-api.iskwen.com/api/express/listExpressTaker",
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
        fileName: 'listExpressTaker' + "_" + getFileName(),  //文件名称设置
        worksheetName: 'sheet1',  //表格工作区名称
        tableName: 'listExpressTaker',
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
        field: 'express_name',
        title: '任務名稱',
        align: 'center',
        sortable: true,
        width: 100,
        formatter: function (value, row, index) {
            return "<button type='button' class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='點擊複製' data-clipboard-text='" + value + "'>" + value + "</button>";
        }
    }, {
        field: 'express_num',
        title: '任務敘述',
        align: 'center',
        sortable: true,
        width: 100,
        formatter: function (value, row, index) {
            return "<button type='button' class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='點擊複製' data-clipboard-text='" + value + "'>" + value + "</button>";
        }
    }, {
        field: 'actual_amount',
        title: '支出',
        align: 'center',
        sortable: true,
        width: 70,
        formatter: function (value, row, index) {
            return "<span class='ly2-tips' ly2-tips-text='手續費:" + row.commission.toFixed(2) + "'>" + (row.amount + row.surcharge).toFixed(2) + "</span>";
        }
    }, {
        field: 'state',
        title: '狀態',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            if (value == 1) {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='還沒人接單~'>待接單</a>";
            } else if (value == 2) {
                return "<button class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='等待出發~'>待發貨</a>";
            } else if (value == 3) {
                return "<button class='btn btn-warning btn-rounded btn-xs ly2-tips' ly2-tips-text='等待確認接單~'>待確認</a>";
            } else if (value == 4) {
                return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='等待雙方評價~'>待評價</a>";
            } else if (value == 5) {
                return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='" + formatter(row.complete_time, "yyyy-MM-dd hh:mm:ss") + "'>已完成</a>";
            } else if (value == 6) {
                return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='該訂單已取消!'>已取消</a>";
            } else if (value == 7) {
                return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='等待處理!'>待處理</a>";
            } else if (value == 8) {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='已被系統自動取消~'>已過期</a>";
            } else if (value == 9) {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='處理完成!'>已處理</a>";
            } else {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='系統一臉懵逼的搖了搖頭~'>未知</a>";
            }
        }
    }, {
        field: 'deleted',
        title: '刪除',
        align: 'center',
        sortable: true,
        width: 80,
        formatter: function (value, row, index) {
            if (!value) {
                return "<a  class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='未被刪除~' ly2-tips-color='#009688'>未刪除</a>";
            } else if (value) {
                return "<a class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='已被刪除!' ly2-tips-color='#393D49'>已刪除</a>";
            } else {
                return "<a class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='系統一臉懵逼的搖了搖頭~' ly2-tips-color='#FFB800'>未知</a>";
            }
        }
    }, {
        field: 'add_time',
        title: '創建時間',
        align: 'center',
        sortable: true,
        width: 180,
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
                let handleList = "";
                if (row.state === 1) {
                    handleList = "<li><a onclick=\"javascript:changeState("+row.id+","+"6)\">取消</a></li>"
                }else if (row.state === 2){
                    handleList = "<li><a onclick=\"javascript:changeState("+row.id+","+"6)\">取消</a></li><li><a onclick=\"javascript:changeState("+row.id+","+"3)\">出發</a></li>"
                }else if (row.state === 3){
                    handleList = "<li><a onclick=\"javascript:changeState("+row.id+","+"7)\">介入</a></li><li><a onclick=\"javascript:changeState("+row.id+","+"4)\">確認</a></li>"
                }else if (row.state === 7){
                    handleList = "<li><a onclick=\"javascript:changeState("+row.id+","+"9)\">解除</a></li>"
                }
                var result = "<div class=\"btn-group\"><a data-toggle=\"dropdown\" aria-expanded=\"true\" class=\"f-c-blue\">操作<span class=\"caret\"></span></a><ul class=\"dropdown-menu dropdown-menu-right w-min-0\">" + handleList + "</ul></div>&nbsp;";
                if(handleList===""){
                    result="";
                }
                result+= "<button class='layui-btn layui-btn-xs layui-btn-normal' lay-href='express/seeExpressTaker?id="+row.id+"' lay-text='查看訂單'>查看</button>";
                if(row.state==5 || row.state==6 || row.state==8 || row.state==9){
                    if (row.deleted) {
                        result += "<button class='layui-btn layui-btn-xs layui-btn' onClick='javascript:deleteOne(" + row.id + ",\"false\")'>恢復</button>";
                    } else {
                        result += "<button class='layui-btn layui-btn-xs layui-btn-danger' onClick='javascript:deleteOne(" + row.id + ",\"true\")'>刪除</button>";
                    }
                }else{
                    if (row.deleted) {
                        result += "<button class='layui-btn layui-btn-xs layui-btn-disabled' disabled'>恢復</button>";
                    } else {
                        result += "<button class='layui-btn layui-btn-xs layui-btn-disabled' disabled>刪除</button>";
                    }
                }

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

function deleteOne(id, deleted) {
    let content = "";
    if (deleted === "true") {
        content = "您確定要刪除該記錄嗎？";
    } else {
        content = "您確定要恢復該記錄嗎？";
    }
    showConfirm("溫馨提示", content, function (index) {
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/express/deleteExpressTaker",
            type: "post",
            dataType: "json",
            data: "id=" + id + "&deleted=" + deleted,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    if (deleted === "true") {
                        showMsg("刪除成功");
                    } else {
                        showMsg("恢復成功");
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
    });
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

function batchDelete(deleted) {
    var rows = $("#dataTable").bootstrapTable('getSelections');// 获得要删除的数据
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        showTip("請先選擇需要操作的記錄");
        return false;
    }
    let content;
    if (deleted === "true") {
        content = "您確定要刪除選中的" + rows.length + "條記錄嗎？";
    } else {
        content = "您確定要恢復選中的" + rows.length + "條記錄嗎？";
    }
    showConfirm("溫馨提示", content, function (index) {
        var ids = new Array();// 声明一个数组
        $(rows).each(function () {// 通过获得别选中的来进行遍历
            if(this.state===5 || this.state===6 || this.state===8 || this.state===9){
                ids.push(this.id);// cid为获得到的整条数据中的一列
            }

        });
        if (rows.length!==ids.length){
            showTip("部分訂單當前狀態暫不允許進行恢復/刪除");
            return false;
        }
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/express/batchDeleteExpressTaker",
            type: "post",
            dataType: "json",
            data: "ids=" + ids + "&deleted=" + deleted,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    if (deleted === "true") {
                        if (msg.count !== rows.length) {
                            showMsg("成功刪除" + msg.count + "條數據,失敗:" + (rows.length - msg.count));
                        } else {
                            showMsg("成功刪除" + msg.count + "條數據");
                        }
                    } else {
                        if (msg.count !== rows.length) {
                            showMsg("成功恢復" + msg.count + "條數據,失敗:" + (rows.length - msg.count));
                        } else {
                            showMsg("成功恢復" + msg.count + "條數據");
                        }
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

function changeState(id, state) {
    let content="";
    if(state===3){
        content="您確定要執行發貨嗎？";
    }else if(state===4){
        content="您確定要確認收貨嗎？";
    }else if(state===6){
        content="您確定要取消該訂單嗎？";
    }else if(state===7){
        content="您確定要介入調查嗎？";
    }else if(state===9){
        content="您確定要結束調查嗎？";
    }
    showConfirm("溫馨提示", content, function (index) {
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/express/changeExpressTakerState",
        type: "post",
        dataType: "json",
        data: "id=" + id + "&state=" + state,
        headers: {'Authorization': getCookie("token")},
        success: function (msg) {
            if (msg.status == 0) {
                if (state === 3) {
                    showMsg("出發成功");
                } else if (state === 4) {
                    showMsg("確認成功");
                } else if (state === 6) {
                    showMsg("取消成功");
                }else if (state === 7) {
                    showMsg("介入處理");
                } else if (state === 9) {
                    showMsg("結束處理");
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
});
}

function batchUpdateState(state) {
    var rows = $("#dataTable").bootstrapTable('getSelections');// 获得要删除的数据
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        showTip("請先選擇需要操作的記錄");
        return false;
    }
    let content = "";
    if (state === 1) {
        content = "您確定要啟用選中的" + rows.length + "個記錄嗎？";
    } else if (state === 2) {
        content = "您確定要停用選中的" + rows.length + "個記錄嗎？";
    }
    showConfirm("溫馨提示", content, function (index) {
        var ids = new Array();// 声明一个数组
        $(rows).each(function () {
            ids.push(this.id);// cid为获得到的整条数据中的一列
        });
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/express/batchUpdateExpressTakerState",
            type: "post",
            dataType: "json",
            data: "ids=" + ids + "&state=" + state,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    if (msg.count !== rows.length) {
                        showMsg("操作成功" + msg.count + "條數據,失敗:" + (rows.length - msg.count));
                    } else {
                        showMsg("操作成功" + msg.count + "條數據");
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