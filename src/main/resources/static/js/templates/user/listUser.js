var grid = $("#dataTable").bootstrapTable({
    url: "//itech-admin-api.iskwen.com/api/user/listUser",
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
        fileName: 'listUser'+"_"+getFileName(),  //文件名称设置
        worksheetName: 'sheet1',  //表格工作区名称
        tableName: 'listUser',
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
        field: 'username',
        title: '用戶名',
        align: 'center',
        sortable: true,
        width: 100,
        formatter: function (value, row, index) {
            return "<button type='button' class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='點擊複製' data-clipboard-text='" + value + "'>" + value + "</button>";
        }
    },{field: 'avatar',
        title: '頭像',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
                return "<img src=\""+value+"\" style=\"display: block;height: 50px; width: 50px;\" onclick=\"showimg('"+value+"')\">";
            }
    }, {
        field: 'email',
        title: '郵箱',
        align: 'center',
        sortable: true,
        width: 150,
        formatter : function(value, row, index) {
            return "<a class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='點擊發送郵件' href='mailto:"+value+"'>"+value+"</a>";
        }
    }, {
        field: 'phone',
        title: '手機',
        align: 'center',
        sortable: true,
        width: 100,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '-';
            } else {
                return value;
            }
        }
    }, {
        field: 'line',
        title: 'line',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '-';
            } else {
                return value;
            }
        }
    }, {
        field: 'balance',
        title: '餘額',
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
        field: 'state',
        title: '狀態',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            if (value == 1) {
                return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='狀態正常~' ly2-tips-color='#009688'>正常</a>";
            } else if (value == 2) {
                return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='已被永久封禁!' ly2-tips-color='#FFB800'>永禁</a>";
            }else if (value == 3) {
                return "<button class='btn btn-warning btn-rounded btn-xs ly2-tips' ly2-tips-text='"+formatter(row.release_time, "yyyy-MM-dd hh:mm:ss")+"' ly2-tips-color='#FFB800'>臨禁</a>";
            } else if (value == 4) {
                return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='已被安全凍結!' ly2-tips-color='#393D49'>凍結</a>";
            } else if (value == 5) {
                return "<button class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='尚未激活~' ly2-tips-color='#393D49'>未激活</a>";
            } else {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='系統一臉懵逼的搖了搖頭~' ly2-tips-color='#FFB800'>未知</a>";
            }
        }
    }, {
        field: 'verified_state',
        title: '認證',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            if (value == 1) {
                return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='還沒提交過認證申請~' ly2-tips-color='#393D49'>未認證</a>";
            } else if (value == 2) {
                return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='還在審核中~' ly2-tips-color='#009688'>審核中</a>";
            } else if (value == 3) {
                return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='"+row.class_name+"-"+row.actual_name+"' ly2-tips-color='#009688'>已認證</a>";
            } else if (value == 4) {
                return "<button class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='被拒絕了!' ly2-tips-color='#009688'>未通過</a>";
            } else {
                return "<button class='btn btn-default btn-rounded btn-xs ly2-tips' ly2-tips-text='系統一臉懵逼的搖了搖頭~' ly2-tips-color='#FFB800'>未知</a>";
            }
        }
    }, {
        field: 'add_time',
        title: '註冊時間',
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
                    result = "<button class='layui-btn layui-btn-xs layui-btn-primary' onClick='javascript:changeState(" + row.id + ",2)'>封禁</button>"
                } else if (row.state == 2 || row.state == 3){
                    result = "<button class='layui-btn layui-btn-xs layui-btn' onClick='javascript:changeState(" + row.id + ",1)'>解禁</button>"
                }else if (row.state == 4){
                    result = "<button class='layui-btn layui-btn-xs layui-btn-normal' onClick='javascript:changeState(" + row.id + ",1)'>解除</button>"
                }else if (row.state == 5){
                    result = "<button class='layui-btn layui-btn-xs layui-btn-normal' onClick='javascript:changeState(" + row.id + ",1)'>激活</button>"
                }else{
                    result = "<button class='layui-btn layui-btn-xs layui-btn-normal' onClick='javascript:changeState(" + row.id + ",1)'>解除</button>"
                }
                return result + "<button class='layui-btn layui-btn-xs layui-btn-warm' lay-href='user/editUser?byUrl=user/listUser&byText=用戶列表&id=" + row.id + "' lay-text='編輯用戶'>編輯</button>";
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
    var verifiedState = $("#verifiedState").val();
    if (verifiedState != '') {
        params.verifiedState = verifiedState;
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
    $("#verifiedState").val(0);
    $("#selectTime").val('');
    reload();
}

function changeState(id,state) {
    if (id == '') {
        showTip("請選擇一條記錄");
    } else {
            $.ajax({
                url: "//itech-admin-api.iskwen.com/api/user/changeUserState",
                type: "post",
                dataType: "json",
                data: "id=" + id+"&state="+state,
                headers: {'Authorization': getCookie("token")},
                success: function (msg) {
                    if (msg.status == 0) {
                        if(state===1){
                            showMsg("解除成功");
                        }else if(state===2){
                            showMsg("封禁成功");
                        }else if(state===3){
                            showMsg("臨時封禁成功");
                        }else if(state===4){
                            showMsg("凍結成功");
                        }else{
                            showMsg("未知請求");
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
function batchUpdateState(state) {
    var rows = $("#dataTable").bootstrapTable('getSelections');// 获得要删除的数据
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        showTip("請先選擇需要操作的記錄");
        return false;
    }
    let content="";
    if (state===1){
        content="您確定要解除/激活選中的"+rows.length+"個用戶嗎？";
    }else if(state===2){
        content="您確定要封禁選中的"+rows.length+"個用戶嗎？";
    }else if(state===3){
        content="您確定要臨時封禁選中的"+rows.length+"個用戶嗎？";
    }else if(state===4){
        content="您確定要凍結選中的"+rows.length+"個用戶嗎？";
    }
    showConfirm("溫馨提示", content, function (index) {
        var ids = new Array();// 声明一个数组
        $(rows).each(function() {// 通过获得别选中的来进行遍历
            ids.push(this.id);// cid为获得到的整条数据中的一列
        });
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/user/batchUpdateStateUser",
            type: "post",
            dataType: "json",
            data: "ids=" + ids+"&state="+state,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    if(msg.count!==rows.length){
                        showMsg("操作成功"+msg.count+"條數據,失敗:"+(rows.length-msg.count));
                    }else{
                        showMsg("操作成功"+msg.count+"條數據");
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
function showimg(url) {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shade: 1,
        offset: 'auto',
        area: ['auto', 'auto'],
        // skin: 'layui-layer-nobg',
        shadeClose: true,
        content: "<img src=\""+url+"\" style=\"display: block;\">"
    });
}
$(window).resize(function(){
    $("#dataTable").bootstrapTable('resetView', {
        height: document.body.clientHeight - 75
    });
});