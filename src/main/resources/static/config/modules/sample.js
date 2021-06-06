/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */
;
var pv = [0, 0, 0, 0, 0, 0, 0];
var cpu = [0, 0, 0, 0, 0, 0, 0];
var ram = [0, 0, 0, 0, 0, 0, 0];
var nowDate = getDay(0);
$.ajax({
    url: "//itech-admin-api.iskwen.com/api/home/getEchartsInfo?nowDate=" + nowDate,
    type: "POST",
    dataType: "json",
    async: false,
    headers: {'Authorization': getCookie("token")},
    success: function (msg) {
        if (msg.status == 0) {
            for (let i = 0; i < msg.list.length; i++) {
                pv[6 - i] = msg.list[i].pv;
                cpu[6 - i] = msg.list[i].cpu.toFixed(2);
                ram[6 - i] = msg.list[i].ram.toFixed(2);
            }
        } else {
            showTip(msg.tip);
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        <!--showErrorMsg(XMLHttpRequest.status);-->
        showErrorMsg("系統在開小差，請稍候再試");
    }
});
layui.define(function (e) {
    var a = layui.admin;
    layui.use(["admin", "carousel"], function () {
        var e = layui.$,
            a = (layui.admin, layui.carousel),
            l = layui.element,
            t = layui.device();
        e(".layadmin-carousel").each(function () {
            var l = e(this);
            a.render({
                elem: this,
                width: "100%",
                arrow: "none",
                interval: l.data("interval"),
                autoplay: l.data("autoplay") === !0,
                trigger: t.ios || t.android ? "click" : "hover",
                anim: l.data("anim")
            })
        }), l.render("progress")
    }), layui.use(["carousel", "echarts"], function () {
        var e = layui.$,
            a = (layui.carousel, layui.echarts),
            l = [],
            t = [{
                title: {
                    subtext: "完全实况球员数据",
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    x: "left",
                    data: ["罗纳尔多", "舍普琴科"]
                },
                polar: [{
                    indicator: [{
                        text: "进攻",
                        max: 100
                    }, {
                        text: "防守",
                        max: 100
                    }, {
                        text: "体能",
                        max: 100
                    }, {
                        text: "速度",
                        max: 100
                    }, {
                        text: "力量",
                        max: 100
                    }, {
                        text: "技巧",
                        max: 100
                    }],
                    radius: 130
                }],
                series: [{
                    type: "radar",
                    center: ["50%", "50%"],
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: "default"
                            }
                        }
                    },
                    data: [{
                        value: [97, 42, 88, 94, 90, 86],
                        name: "舍普琴科"
                    }, {
                        value: [97, 32, 74, 95, 88, 92],
                        name: "罗纳尔多"
                    }]
                }]
            }],
            i = e("#LAY-index-pageone").children("div"),
            n = function (e) {
                l[e] = a.init(i[e], layui.echartsTheme), l[e].setOption(t[e]), window.onresize = l[e].resize
            };
        i[0] && n(0)
    }), layui.use(["carousel", "echarts"], function () {
        var e = layui.$,
            a = (layui.carousel, layui.echarts),
            l = [],
            t = [{
                tooltip: {
                    trigger: "axis"
                },
                calculable: !0,
                legend: {
                    data: ["訪問量", "CPU", "RAM"]
                },
                xAxis: [{
                    type: "category",
                    data: [getDayAndWeek(-6), getDayAndWeek(-5), getDayAndWeek(-4), getDayAndWeek(-3), getDayAndWeek(-2), '昨天', '今天']
                }],
                yAxis: [{
                    type: "value",
                    name: "訪問量",
                    axisLabel: {
                        formatter: "{value}"
                    }
                }, {
                    type: "value",
                    name: "佔比",
                    axisLabel: {
                        formatter: "{value}%"
                    }
                }],
                series: [{
                    name: "訪問量",
                    type: "line",
                    yAxisIndex: 0,
                    data: pv
                }, {
                    name: "CPU",
                    type: "line",
                    yAxisIndex: 1,
                    data: cpu
                }, {
                    name: "RAM",
                    type: "line",
                    yAxisIndex: 1,
                    data: ram
                }]
            }],
            i = e("#LAY-index-pagetwo").children("div"),
            n = function (e) {
                l[e] = a.init(i[e], layui.echartsTheme), l[e].setOption(t[e]), window.onresize = l[e].resize
            };
        i[0] && n(0)
    }), layui.use(["carousel", "echarts"], function () {
        var e = layui.$,
            a = (layui.carousel, layui.echarts),
            l = [],
            t = [{
                title: {
                    text: "全国的 layui 用户分布",
                    subtext: "不完全统计"
                },
                tooltip: {
                    trigger: "item"
                },
                dataRange: {
                    orient: "horizontal",
                    min: 0,
                    max: 6e4,
                    text: ["高", "低"],
                    splitNumber: 0
                },
                series: [{
                    name: "全国的 layui 用户分布",
                    type: "map",
                    mapType: "china",
                    selectedMode: "multiple",
                    itemStyle: {
                        normal: {
                            label: {
                                show: !0
                            }
                        },
                        emphasis: {
                            label: {
                                show: !0
                            }
                        }
                    },
                    data: [{
                        name: "西藏",
                        value: 60
                    }, {
                        name: "青海",
                        value: 167
                    }, {
                        name: "宁夏",
                        value: 210
                    }, {
                        name: "海南",
                        value: 252
                    }, {
                        name: "甘肃",
                        value: 502
                    }, {
                        name: "贵州",
                        value: 570
                    }, {
                        name: "新疆",
                        value: 661
                    }, {
                        name: "云南",
                        value: 8890
                    }, {
                        name: "重庆",
                        value: 10010
                    }, {
                        name: "吉林",
                        value: 5056
                    }, {
                        name: "山西",
                        value: 2123
                    }, {
                        name: "天津",
                        value: 9130
                    }, {
                        name: "江西",
                        value: 10170
                    }, {
                        name: "广西",
                        value: 6172
                    }, {
                        name: "陕西",
                        value: 9251
                    }, {
                        name: "黑龙江",
                        value: 5125
                    }, {
                        name: "内蒙古",
                        value: 1435
                    }, {
                        name: "安徽",
                        value: 9530
                    }, {
                        name: "北京",
                        value: 51919
                    }, {
                        name: "福建",
                        value: 3756
                    }, {
                        name: "上海",
                        value: 59190
                    }, {
                        name: "湖北",
                        value: 37109
                    }, {
                        name: "湖南",
                        value: 8966
                    }, {
                        name: "四川",
                        value: 31020
                    }, {
                        name: "辽宁",
                        value: 7222
                    }, {
                        name: "河北",
                        value: 3451
                    }, {
                        name: "河南",
                        value: 9693
                    }, {
                        name: "浙江",
                        value: 62310
                    }, {
                        name: "山东",
                        value: 39231
                    }, {
                        name: "江苏",
                        value: 35911
                    }, {
                        name: "广东",
                        value: 55891
                    }]
                }]
            }],
            i = e("#LAY-index-pagethree").children("div"),
            n = function (e) {
                l[e] = a.init(i[e], layui.echartsTheme), l[e].setOption(t[e]), window.onresize = l[e].resize
            };
        i[0] && n(0)
    }), layui.use("table", function () {
        var e = (layui.$, layui.table);
        e.render({
            elem: "#LAY-index-prograss",
            url: layui.setter.base + "json/console/prograss.js",
            cols: [
                [{
                    type: "checkbox",
                    fixed: "left"
                }, {
                    field: "prograss",
                    title: "任务"
                }, {
                    field: "time",
                    title: "所需时间"
                }, {
                    field: "complete",
                    title: "完成情况",
                    templet: function (e) {
                        return "已完成" == e.complete ? '<del style="color: #5FB878;">' + e.complete + "</del>" : "进行中" == e.complete ? '<span style="color: #FFB800;">' + e.complete + "</span>" : '<span style="color: #FF5722;">' + e.complete + "</span>"
                    }
                }]
            ],
            skin: "line"
        })
    }), a.events.replyNote = function (e) {
        var a = e.data("id");
        layer.prompt({
            title: "回复留言 ID:" + a,
            formType: 2
        }, function (e, a) {
            layer.msg("得到：" + e), layer.close(a)
        })
    }, e("sample", {})
});

function getDayAndWeek(day) {
    var a = ["日", "一", "二", "三", "四", "五", "六"];
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tMonth + "-" + tDate + "[周" + a[today.getDay()] + "]";
}
function doHandleMonth(month) {

    var m = month;

    if (month.toString().length == 1) {

        m = "0" + month;

    }

    return m;

}