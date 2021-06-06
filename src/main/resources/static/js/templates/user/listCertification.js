var grid = $("#dataTable").bootstrapTable({
    url: "//itech-admin-api.iskwen.com/api/user/listCertification",
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
        fileName: 'listCertification' + "_" + getFileName(),  //文件名称设置
        worksheetName: 'sheet1',  //表格工作区名称
        tableName: 'listCertification',
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
            return "<button type='button' class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='點擊複製' data-clipboard-text='" + value + "'>" + value + "</button>";
        }
    }, {
        field: 'student_id',
        title: '學號',
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
        field: 'actual_name',
        title: '真實姓名',
        align: 'center',
        sortable: true,
        width: 80,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '-';
            } else {
                return value;
            }
        }
    }, {
        field: 'department_id',
        title: '系別與班級',
        align: 'center',
        sortable: true,
        width: 150,
        formatter: function (value, row, index) {
            if (value == '' || value == undefined) {
                return '-';
            } else {
                return "<span class='ly2-tips' ly2-tips-text='"+row.class_name+"'>"+getDepartmentName(value)+"</span>";
            }
        }
    }, {
        field: 'student_card',
        title: '認證',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            return "<img src=\"" + value + "\" style=\"display: block;height: 50px; width: 50px;\" onclick=\"showimg('" + value + "')\">";
        }
    }, {
        field: 'verified_remark',
        title: '說明',
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
        field: 'verified_state',
        title: '狀態',
        align: 'center',
        sortable: true,
        width: 50,
        formatter: function (value, row, index) {
            if (value == 1) {
                return "<button class='btn btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='還沒提交過申請~' ly2-tips-color='#23C6C9'>未申請</a>";
            } else if (value == 2) {
                return "<button class='btn btn-danger btn-rounded btn-xs ly2-tips' ly2-tips-text='趕快審核吧~' ly2-tips-color='#F8AC59'>待審核</a>";
            } else if (value == 3) {
                return "<button class='btn layui-btn-primary btn-rounded btn-xs ly2-tips' ly2-tips-text='已通過認證~' ly2-tips-color='#1AB394'>已通過</a>";
            } else if (value == 4) {
                return "<button class='btn btn-info btn-rounded btn-xs ly2-tips' ly2-tips-text='已拒絕!' ly2-tips-color='#ED5565'>已拒絕</a>";
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
                if (row.verified_state == 1) {
                    result += ""
                } else if (row.verified_state == 2) {
                    result += "<button class='layui-btn layui-btn-xs layui-btn-normal' onClick='javascript:changeState(" + row.id + ",3)'>通過</button>"
                    result += "<button class='layui-btn layui-btn-xs layui-btn-warm' onClick='javascript:changeState(" + row.id + ",4)'>拒絕</button>"
                } else if (row.verified_state == 3) {
                    result += "<button class='layui-btn layui-btn-xs layui-btn-danger' onClick='javascript:changeState(" + row.id + ",4)'>駁回</button>"
                } else if (row.verified_state == 4) {
                    result += "<button class='layui-btn layui-btn-xs layui-btn-warm' onClick='javascript:changeState(" + row.id + ",2)'>重審</button>"
                }
                return result;
                // return result + "<button class='layui-btn layui-btn-xs layui-btn-warm' lay-href='user/editUser?byUrl=user/listUser&byText=用戶列表&id=" + row.id + "' lay-text='編輯用戶'>編輯</button>";
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
    var verifiedState = $("#verifiedState").val();
    if (verifiedState != '') {
        params.verifiedState = verifiedState;
    } else {
        params.verifiedState = 0;
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
    $("#verifiedState").val(0);
    $("#selectTime").val('');
    reload();
}

function changeState(id, state) {
    if (state === 2) {
        content = "您确定要退回重審嗎？";
    } else if (state === 3) {
        content = "您确定要通過該認證嗎？";
    } else if (state === 4) {
        content = "您确定要拒絕/駁回該認證嗎？";
    }
    showConfirm("溫馨提示", content, function (index) {
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/user/changeUserVerifiedState",
            type: "post",
            dataType: "json",
            data: "id=" + id + "&state=" + state,
            headers: {'Authorization': getCookie("token")},
            success: function (msg) {
                if (msg.status == 0) {
                    if (state === 2) {
                        showMsg("退回重審");
                    } else if (state === 3) {
                        showMsg("認證通過");
                    } else if (state === 4) {
                        showMsg("拒絕/駁回");
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

function batchUpdateState(state) {
    var rows = $("#dataTable").bootstrapTable('getSelections');// 获得要删除的数据
    if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
        showTip("請先選擇需要操作的記錄");
        return false;
    }
    let content = "";
    if (state === 2) {
        content = "您確定要重審選中的" + rows.length + "個用戶嗎？";
    } else if (state === 3) {
        content = "您確定要通過選中的" + rows.length + "個用戶嗎？";
    } else if (state === 4) {
        content = "您確定要拒絕/駁回選中的" + rows.length + "個用戶嗎？";
    }
    showConfirm("溫馨提示", content, function (index) {
        var ids = new Array();// 声明一个数组
        $(rows).each(function () {// 通过获得别选中的来进行遍历
            if(state===2){
                if(this.state===4){
                    ids.push(this.id);// cid为获得到的整条数据中的一列
                }
            }else if(state==3){
                if(this.state===2){
                    ids.push(this.id);// cid为获得到的整条数据中的一列
                }
            }else if(state==4){
                if(this.state===2 || this.state===3){
                    ids.push(this.id);// cid为获得到的整条数据中的一列
                }
            }

        });
        if(state===2){
            if(rows.length!==ids.length){
                showTip("只有未通過的驗證才能進行通過操作");
                return false;
            }
        }else if(state==3){
            showTip("只有審核中的驗證才能進行通過操作");
            return false;
        }else if(state==4){
            showTip("只有審核中(或已通過)的驗證才能進行拒絕/駁回操作");
            return false;
        }
        $.ajax({
            url: "//itech-admin-api.iskwen.com/api/user/batchUpdateVerifiedState",
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
        content: "<img src=\"" + url + "\" style=\"display: block;\">"
    });
}

function getDepartmentName(id) {
    switch (id) {
        case 0:
            return "未認證";
        case 1:
            return "工程學院-工程科技菁英班";
        case 2:
            return "工程學院-工程科技研究所";
        case 3:
            return "工程學院-機械工程系";
        case 4:
            return "工程學院-電機工程系";
        case 5:
            return "工程學院-電子工程系";
        case 6:
            return "工程學院-環境與安全衛生工程系";
        case 7:
            return "工程學院-化學工程與材料工程系";
        case 8:
            return "工程學院-營建工程系";
        case 9:
            return "工程學院-資訊工程系";
        case 10:
            return "工程學院-其他";
        case 11:
            return "管理學院-高階管理碩士學位學程";
        case 12:
            return "管理學院-工商管理學士學位學程";
        case 13:
            return "管理學院-工業工程與管理系";
        case 14:
            return "管理學院-企業管理系";
        case 15:
            return "管理學院-資訊管理系";
        case 16:
            return "管理學院-財務金融系";
        case 17:
            return "管理學院-會計系";
        case 18:
            return "管理學院-國際管理學士學位學程";
        case 19:
            return "管理學院-創業管理碩士學位學程";
        case 20:
            return "管理學院-產業經營專業博士學位學程";
        case 21:
            return "管理學院-其他";
        case 22:
            return "設計學院-設計學研究所";
        case 23:
            return "設計學院-工業設計系";
        case 24:
            return "設計學院-視覺傳達設計系";
        case 25:
            return "設計學院-建築與室內設計系";
        case 26:
            return "設計學院-數位媒體設計系";
        case 27:
            return "設計學院-創意生活設計系";
        case 28:
            return "設計學院-其他";
        case 29:
            return "人文與科學學院-應用外語系";
        case 30:
            return "人文與科學學院-文化資產維護系";
        case 31:
            return "人文與科學學院-技術及職業教育研究所";
        case 32:
            return "人文與科學學院-漢學應用研究所";
        case 33:
            return "人文與科學學院-休閒運動研究所";
        case 34:
            return "人文與科學學院-科技法律研究所";
        case 35:
            return "人文與科學學院-材料科技研究所";
        case 36:
            return "人文與科學學院-英語菁英學程";
        case 37:
            return "人文與科學學院-師資培育中心";
        case 38:
            return "人文與科學學院-其他";
        case 39:
            return "未來學院-產業專案學士學位學程";
        case 40:
            return "未來學院-前瞻學士學位學程";
        case 41:
            return "未來學院-通識教育中心";
        case 42:
            return "未來學院-其他";
        case 43:
            return "其他-其他";
        default:
            return "未知";
    }
}
$(window).resize(function(){
    $("#dataTable").bootstrapTable('resetView', {
        height: document.body.clientHeight - 75
    });
});