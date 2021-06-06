var grid = $("#dataTable").bootstrapTable({
    url: "//itech-admin-api.iskwen.com/api/flow/listYuntechFlowWarn",
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
        fileName: 'listYuntechFlowWarn' + "_" + getFileName(),  //文件名称设置
        worksheetName: 'sheet1',  //表格工作区名称
        tableName: 'listYuntechFlowWarn',
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
        field: 'ip',
        title: 'ip',
        align: 'center',
        sortable: true,
        width: 100,
        formatter: function (value, row, index) {
            return "<button type='button' class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='點擊複製' data-clipboard-text='" + value + "'>" + value + "</button>";
        }
    }, {
        field: 'warn_value',
        title: '預設值/Gb',
        align: 'center',
        sortable: true,
        width: 70,
        formatter: function (value, row, index) {
            if (value == undefined) {
                return '-';
            }
            return value.toFixed(4);
        }
    }, {
        field: 'real_value',
        title: '實際值/Gb',
        align: 'center',
        sortable: true,
        width: 70,
        formatter: function (value, row, index) {
            if (value == undefined) {
                return '-';
            }
            return value.toFixed(4);
        }
    }, {
        field: 'warn_mail',
        title: '告警郵箱',
        align: 'center',
        sortable: true,
        width: 150,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '-';
            } else {
                return value;
            }
        }
    },
        {
            field: 'mail_state',
            title: '狀態',
            align: 'center',
            sortable: true,
            width: 50,
            formatter: function (value, row, index) {
                if (value == 1) {
                    return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='發送成功~' ly2-tips-color='#009688'>成功</a>";
                } else if (value == 2) {
                    return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips'  ly2-tips-text='發送失敗!' ly2-tips-color='#FF5722'>失敗</a>";
                } else if (value == 3) {
                    return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips'  ly2-tips-text='尚未開啟~' ly2-tips-color='#009688'>未啟用</a>";
                } else if (value == 4) {
                    return "<button class='btn btn-warning btn-rounded btn-xs ly2-tips'  ly2-tips-text='餘額不足,當然罷工啊!' ly2-tips-color='#F8AC59'>餘額不足</a>";
                } else if (value == 5) {
                    return "<button class='btn btn-info btn-rounded btn-xs ly2-tips'  ly2-tips-text='等待系統響應~' ly2-tips-color='#1E9FFF'>待響應</a>";
                } else if (value == 6) {
                    return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips'  ly2-tips-text='還不需要發送~' ly2-tips-color='#1E9FFF'>未請求</a>";
                } else if (value == 7) {
                    return "<button class='btn btn-info btn-rounded btn-xs ly2-tips'  ly2-tips-text='待驗證~' ly2-tips-color='#F8AC59'>待驗證</a>";
                } else {
                    return "<button class='btn btn-default btn-rounded btn-xs ly2-tips'  ly2-tips-text='系統一臉懵逼的搖了搖頭~' ly2-tips-color='#FF5722'>未知</a>";
                }
            }
        }, {
            field: 'warn_phone',
            title: '告警手機',
            align: 'center',
            sortable: true,
            width: 150,
            formatter: function (value, row, index) {
                if (value == '' || value == undefined) {
                    return '-';
                } else {
                    return value;
                }
            }
        }, {
            field: 'phone_state',
            title: '狀態',
            align: 'center',
            sortable: true,
            width: 50,
            formatter: function (value, row, index) {
                if (value == 1) {
                    return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='發送成功~' ly2-tips-color='#009688'>成功</a>";
                } else if (value == 2) {
                    return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips'  ly2-tips-text='發送失敗!' ly2-tips-color='#FF5722'>失敗</a>";
                } else if (value == 3) {
                    return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips'  ly2-tips-text='尚未開啟~' ly2-tips-color='#009688'>未啟用</a>";
                } else if (value == 4) {
                    return "<button class='btn btn-warning btn-rounded btn-xs ly2-tips'  ly2-tips-text='餘額不足,當然罷工啊!' ly2-tips-color='#F8AC59'>餘額不足</a>";
                } else if (value == 5) {
                    return "<button class='btn btn-info btn-rounded btn-xs ly2-tips'  ly2-tips-text='等待系統響應~' ly2-tips-color='#1E9FFF'>待響應</a>";
                } else if (value == 6) {
                    return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips'  ly2-tips-text='還不需要發送~' ly2-tips-color='#1E9FFF'>未請求</a>";
                } else if (value == 7) {
                    return "<button class='btn btn-info btn-rounded btn-xs ly2-tips'  ly2-tips-text='待驗證~' ly2-tips-color='#F8AC59'>待驗證</a>";
                } else {
                    return "<button class='btn btn-default btn-rounded btn-xs ly2-tips'  ly2-tips-text='系統一臉懵逼的搖了搖頭~' ly2-tips-color='#FF5722'>未知</a>";
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
                var result = "";
                if (row.deleted) {
                    result += "<button class='layui-btn layui-btn-xs layui-btn' onClick='javascript:deleteYuntechFlowWarn(" + row.id + ",\"false\")'>恢復</button>";
                } else {
                    result += "<button class='layui-btn layui-btn-xs layui-btn-danger' onClick='javascript:deleteYuntechFlowWarn(" + row.id + ",\"true\")'>刪除</button>";
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

function deleteYuntechFlowWarn(id, deleted) {
    let content = "";
    if (deleted === "true") {
        content = "您確定要刪除該記錄嗎？";
    } else {
        content = "您確定要恢復該記錄嗎？";
    }
    showConfirm("溫馨提示", content, function (index) {
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/flow/deleteYuntechFlowWarn",
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
            ids.push(this.id);// cid为获得到的整条数据中的一列
        });
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/flow/batchDeleteYuntechFlowWarn",
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
$(window).resize(function(){
    $("#dataTable").bootstrapTable('resetView', {
        height: document.body.clientHeight - 75
    });
});