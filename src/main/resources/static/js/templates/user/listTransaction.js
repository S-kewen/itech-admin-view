var grid = $("#dataTable").bootstrapTable({
    url: "//itech-admin-api.iskwen.com/api/user/listTransaction",
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
        fileName: 'listTransaction' + "_" + getFileName(),  //文件名称设置
        worksheetName: 'sheet1',  //表格工作区名称
        tableName: 'listTransaction',
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
            return "<button type='button' class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='[userId:"+row.user_id+"]' data-clipboard-text='" + value + "'>" + value + "</button>";
        }
    }, {
        field: 'title',
        title: '交易名稱',
        align: 'center',
        sortable: true,
        width: 450
    }, {
        field: 'amount',
        title: '交易金額',
        align: 'center',
        sortable: true,
        width: 80,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '0.00';
            } else {
                return value.toFixed(2);
            }
        }
    },
        {
            field: 'commission',
            title: '手續費',
            align: 'center',
            sortable: true,
            width: 80,
            formatter: function (value, row, index) {
                if (value == '' || value == undefined) {
                    return '-';
                } else {
                    return value.toFixed(2);
                }
            }
        }, {
            field: 'actual_amount',
            title: '實際金額',
            align: 'center',
            sortable: true,
            width: 80,
            formatter: function (value, row, index) {
                if (value == '' || value == undefined) {
                    return '0.00';
                } else {
                    return value.toFixed(2);
                }
            }
        }, {
            field: 'balance',
            title: '餘額',
            align: 'center',
            sortable: true,
            width: 80,
            formatter: function (value, row, index) {
                if (value == null || value == undefined) {
                    return '0.00';
                } else {
                    return value.toFixed(2);
                }
            }
        }, {
            field: 'type',
            title: '交易類型',
            align: 'center',
            sortable: true,
            width: 70,
            formatter: function (value, row, index) {
                if (value == 1) {
                    return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='儲值卡儲值~' ly2-tips-color='#009688'>儲值</a>";
                } else if (value == 2) {
                    return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='支付響應的服務費用~' ly2-tips-color='#5FB878'>支出</a>";
                } else if (value == 3) {
                    return "<button class='btn btn-warning btn-rounded btn-xs ly2-tips' ly2-tips-text='勞動的收穫~' ly2-tips-color='#1E9FFF'>收入</a>";
                } else if (value == 4) {
                    return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='服務費退回~' ly2-tips-color='#FFB800'>退款</a>";
                } else {
                    return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='系統一臉懵逼的搖了搖頭~' ly2-tips-color='#FF5722'>未知</a>";
                }
            }
        }, {
        field: 'state',
        title: '狀態',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            if (value === 1) {
                return "<a  class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='交易已完成~' ly2-tips-color='#009688'>成功</a>";
            } else if (value === 2) {
                return "<a class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='交易失敗!' ly2-tips-color='#FF5722'>失敗</a>";
            } else if (value === 3) {
                return "<a class='btn btn-warning btn-rounded btn-xs ly2-tips' ly2-tips-text='系統正在處理~' ly2-tips-color='#393D49'>進行中</a>";
            } else {
                return "<a class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='系統一臉懵逼的搖了搖頭~' ly2-tips-color='#FFB800'>未知</a>";
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
        title: '交易時間',
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
                if (!row.deleted) {
                    return "<button class='layui-btn layui-btn-xs layui-btn-danger' onClick='javascript:deleteTransaction(" + row.id + ",\"true\")'>刪除</button>";
                } else {
                    return "<button class='layui-btn layui-btn-xs layui-btn-normal' onClick='javascript:deleteTransaction(" + row.id + ",\"false\")'>恢復</button>";
                }
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
    var type = $("#type").val();
    if (type != '') {
        params.type = type;
    } else {
        params.type = 0;
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
    $("#type").val(0);
    $("#selectTime").val('');
    grid.bootstrapTable('refresh');
}

function deleteTransaction(id, deleted) {
    if (id == '') {
        showTip("請選擇一條記錄");
    } else {
        let content = "";
        if (deleted === "true") {
            content = "您確定要刪除該記錄嗎？";
        } else {
            content = "您確定要恢復該記錄嗎？";
        }
        showConfirm("溫馨提示", content, function (index) {
            $.ajax({
                url: "//itech-admin-api.iskwen.com/api/user/deleteTransaction",
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
            url: "//itech-admin-api.iskwen.com/api/user/batchDeleteTransaction",
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