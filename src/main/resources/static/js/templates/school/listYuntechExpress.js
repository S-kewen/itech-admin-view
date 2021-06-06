var grid = $("#dataTable").bootstrapTable({
    url: "//itech-admin-api.iskwen.com/api/school/listYuntechExpress",
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
        fileName: 'listYuntechExpress' + "_" + getFileName(),  //文件名称设置
        worksheetName: 'sheet1',  //表格工作区名称
        tableName: 'listYuntechExpress',
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
        field: 'express_name',
        title: '物流名稱',
        align: 'center',
        sortable: true,
        width: 200,
        formatter: function (value, row, index) {
            return "<button type='button' class='btn btn-info btn-rounded btn-xs ly2-tips' data-clipboard-text='" + value + "' ly2-tips-text='點擊複製'>" + value + "</button>";
        }
    }, {
        field: 'express_num',
        title: '物流單號',
        align: 'center',
        sortable: true,
        width: 200,
        formatter: function (value, row, index) {
            return "<button type='button' class='btn layui-btn-primary btn-rounded btn-xs ly2-tips' data-clipboard-text='" + value + "' ly2-tips-text='點擊複製'>" + value + "</button>";
        }
    }, {
        field: 'region',
        title: '區域',
        align: 'center',
        sortable: true,
        width: 100,
        formatter: function (value, row, index) {
            if (value == 1) {
                return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='A區~'>A區</button>";
            } else if (value == 2) {
                return "<button class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='B區~'>B區</button>";
            } else if (value == 3) {
                return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='C區~'>C區</button>";
            } else if (value == 4) {
                return "<button  class='btn btn-warning btn-rounded btn-xs ly2-tips' ly2-tips-text='D區~'>D區</button>";
            } else if (value == 5) {
                return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='E區~'>E區</button>";
            } else if (value == 6) {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='F區~'>F區</button>";
            } else if (value == 7) {
                return "<button class='btn btn-warning btn-rounded btn-xs ly2-tips' style='background-color: #808695' ly2-tips-text='G區~'>G區</button>";
            } else {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='系統一臉懵逼的搖了搖頭~'>未知</button>";
            }

        }
    }, {
        field: 'dormitory',
        title: '宿舍號',
        align: 'center',
        sortable: true,
        width: 100
    }, {
        field: 'addressee',
        title: '收件人',
        align: 'center',
        sortable: true,
        width: 100
    }, {
        field: 'state',
        title: '狀態',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            if (value == 1) {
                return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='還沒被領走~'>待簽收</button>";
            }
            if (value == 2) {
                return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='已經被簽收了~'>已簽收</button>";
            } else {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips'  ly2-tips-text='系統一臉懵逼的搖了搖頭~'>未知</button>";
            }
        }
    }, {
        field: 'receive_time',
        title: '簽收時間',
        align: 'center',
        sortable: true,
        width: 180,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined || value == null) {
                return '-';
            }
            return formatter(value, "yyyy-MM-dd hh:mm:ss");
        }
    }, {
        field: 'receipt_time',
        title: '登記時間',
        align: 'center',
        sortable: true,
        width: 180,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '-';
            }
            return formatter(value, "yyyy-MM-dd hh:mm:ss");
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
            field: '',
            title: '操作',
            formatter: function (value, row, index) {
                var result = "";
                if(row.state===1){
                    if (row.deleted) {
                        result += "<button class='layui-btn layui-btn-xs layui-btn-disabled' disabled>恢復</button>";
                    } else {
                        result += "<button class='layui-btn layui-btn-xs layui-btn-disabled' disabled>刪除</button>";
                    }
                }else{
                    if (row.deleted) {
                        result += "<button class='layui-btn layui-btn-xs layui-btn' onClick='javascript:deleteOne(" + row.id + ",\"false\")'>恢復</button>";
                    } else {
                        result += "<button class='layui-btn layui-btn-xs layui-btn-danger' onClick='javascript:deleteOne(" + row.id + ",\"true\")'>刪除</button>";
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
    var region = $("#region").val();
    if (region != '') {
        params.region = region;
    } else {
        params.region = 0;
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
    $("#region").val(0);
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
            url: "//itech-admin-api.iskwen.com/api/school/deleteYuntechExpress",
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
            if(this.state!==2){
                showTip("未簽收不允許進行刪除與恢復!");
                return false;
            }else{
                ids.push(this.id);// cid为获得到的整条数据中的一列
            }
        });
        if(rows.length===ids.length){
            $.ajax({
                url: "//itech-admin-api.iskwen.com/api/school/batchDeleteYuntechExpress",
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
        }else{
            showTip("未簽收不允許進行刪除與恢復");
        }
    });
}
$(window).resize(function(){
    $("#dataTable").bootstrapTable('resetView', {
        height: document.body.clientHeight - 75
    });
});