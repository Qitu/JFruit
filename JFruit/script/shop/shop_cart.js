var shop_dataData = {};
var now_count = 0;
var _destination = "";
var _sender = "";

//var test = ["芒果干500kg@2.8","苹果干500kg@4.5"];
function Baseload(_id, _price, message) {
    $("#totally").text(_price);
    $("#price_").text(_price + ".00RM");
    var pages = new Array();
    api.showProgress({
        title: '正在获取',
        text: '请稍候...',
    });
    api.ajax({
        url: 'http://.....?' + _id,
        method: 'get',
        dataType: "json",
        cache: true
    },
    function(ret, err) {
        api.hideProgress();
        if (ret) {
            //alert(JSON.stringify(ret));
            if (ret.status == "100") {
                for (var key in ret) {
                    if (key != "status" && key != "destination" && key != "sender" && key != "message") {
                        _html(key, ret[key]);
                    }
                }
                _destination = ret.destination;
                _sender = ret.sender;
                $("#message").html(ret.message);
                imageCache();
            } else {
                alert("Error Code : " + ret.status);
                api.closeWin();
            }
        } else {
            alert("No network connection");
            api.closeWin();
        }
    });
}

function imageCache() {
    var srcs = $api.domAll('.card-img');
    if (srcs.length > 0) {
        for (var i = 0; i < srcs.length; i++) {

                          (function(obj) {
                api.imageCache({
                    url: $api.attr(obj, 'srcs')

                                     
                },
                function(ret, err) {
                    if (ret) {

                        $api.attr(obj, 'src', ret.url);

                                             
                    }

                                     
                });

                             
            })(srcs[i]);

                     
        }

             
    }

     
}

function _html(page, result) {
    /*
    	$("#tab_box").append('<a  href="#'+page+'-page" class="mdl-layout__tab">'+page+'</a>	');
    	$("#box-list").append('<section class="mdl-layout__tab-panel is-active" id="'+page+'-page"></section>');
  */
    var s = result.split("^");
    for (var i = 0; i < s.length; i++) {

        var info = s[i].split(":");
        $("#page").append('<div class="bbox"><div style="display:inline-block"><img id="' + info[0] + '" class="card-img" src="" srcs="' + 'http://www.ramcraft.cn/image/productions/' + page + '/' + i + '.jpg' + '"></div><div class="card-pad"><div style="margin-left: 4px;"><div style="font-size:15px;">' + info[0] + '</div><div class="card-tag" style="font-size:15px; color:#FF3F80" id="test-price"><b id="' + info[0] + '-price">' + info[1] + '</b> RM</div><br></div>	</div>	<small class="card-hot"><p id="' + info[0] + '-txt" style="display:inline-block; color:#FF3F80">0</p><button onclick="join_shop(&quot;' + info[0] + '&quot;)" class="mdl-button mdl-button--icon" style="display:inline-block"><i class="material-icons md-42" style="color:#FF3F80">shopping_cart</i></button></small></div>');

    }
}

function join_shop(obj) {

    var img = $("#" + obj + "").parent().find('img').attr('src');
    var count = parseInt($("#" + obj + "-txt").text()) + 1;
    $("#" + obj + "-txt").text(count);
    var price = parseInt($("#" + obj + "-price").text());
    var flyer = $('<img class="u-flyer" src="' + img + '">');
    $(flyer).fly({
        start: {
            top: $("#" + obj + "").offset().top,
            left: $("#" + obj + "").offset().left
        },
        end: {
            top: api.winHeight - 31,
            left: api.winWidth - 45,
            width: 0,
            height: 0
        },
        onEnd: function() {

            _josn_Editor(obj, count);
            _bill_Editor(obj, count, price);

            $('#bill-ensure').removeAttr("disabled");
            //api.toast({ msg: '已加入购物车'});
            //flyer.destory();
        }
    });

}

function _josn_Editor(obj, count) {
    $("#shop-have").attr("data-badge", ++now_count);
    shop_dataData[obj.toString()] = count.toString();
}

function _bill_Editor(obj, count, price) {
    if ($("#" + obj + "-bill").length > 0) {
        $("#" + obj + "-bill").html('<td class="mdl-data-table__cell--non-numeric">' + obj + '</td><td>' + count + '</td><td><span class="mdl-label mdl-label__green" id="' + obj + '_price">' + (count * price) + 'RM</span></td><td><a onclick="_Remove_bill(&quot;' + obj + '&quot;)"><b>╳</b></a></td>');
    } else {
        $("#msg_bill").prepend('<tr id="' + obj + '-bill"><td class="mdl-data-table__cell--non-numeric">' + obj + '</td><td>' + count + '</td><td><span class="mdl-label mdl-label__green" id="' + obj + '_price">' + (count * price) + 'RM</span></td><td><a onclick="_Remove_bill(&quot;' + obj + '&quot;)"><b>╳</b></a></td></tr>');
    }
    $('#tb').show();

    $("#totally").text(parseInt($("#totally").text()) + price);

}

function _Remove_bill(obj) {
    //$("#"+obj+"-bill").hide();
    $("#totally").text(parseInt($("#totally").text()) - parseInt($("#" + obj + "_price").text()));
    $("#" + obj + "-bill").remove();
    $("#" + obj + "-txt").text(0);
    now_count = now_count - parseInt(shop_dataData[obj]);
    $("#shop-have").attr("data-badge", now_count);

    delete shop_dataData[obj.toString()];
    _shop_ensure();
}

function _shop_ensure() {
    if (JSON.stringify(shop_dataData) == "{}") {
        $('#tb').hide();
        $('#bill-ensure').attr("disabled", true);
    }
}

function _ensure_bill() {
    if (JSON.stringify(shop_dataData) != "{}" && parseInt($("#totally").text()) > 0) {
        _post_bill();
    } else {
        swal('提交失败', '未添加商品或者数据错误，请重试', 'error');
    }
}

function _post_bill() {
    var _pd = "运费";
    for (var key in shop_dataData) {
        _pd = _pd + "，" + key + "*" + shop_dataData[key];
    }

    swal({
        title: '确认订单?',
        text: "(" + _pd + ") -- " + parseInt($("#totally").text()) + " RM",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确认提交',
        cancelButtonText: '别别别'
    }).then(function() {
        _bill_ajax(_pd, parseInt($("#totally").text()));
    },
    function(dismiss) {
        //
    });
}

function _bill_ajax(_data, _price) {
    api.showProgress({
        title: '正在提交',
        text: '请稍候...',
    });
    api.ajax({
        url: 'http://.....',
        method: 'post',
        dataType: "json",
        data: {
            values: {
                phone: api.getPrefs({
                    sync: true,
                    key: 'phone'
                }),
                token: api.getPrefs({
                    sync: true,
                    key: 'token'
                }),
                price: _price,
                data: _data,
                destination: _destination,
                sender: _sender
            }
        }
    },
    function(ret, err) {
        api.hideProgress();
        if (ret) {
            //alert(JSON.stringify(ret));
            if (ret.status == "100") {
                swal({
                    title: '提交成功 !',
                    text: "订单已提交，可从订单中心查看",
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '订单中心',
                    cancelButtonText: '取消'
                }).then(function() {
                    api.openWin({
                        name: 'Bill',
                        url: './Bill.html',
                        reload: true
                    });
                },
                function(dismiss) {
                    api.closeWin();
                });
            } else if (ret.status == "106") {
                swal('提交失败', '您的位置信息不完善，请先去主页填写', 'warning');
            } else if (ret.status == "104") {
                swal('提交失败', '网络异常/服务器错误，请重试', 'warning');
            } else if (ret.status == "105") {
                swal('提交失败', '你还有未完成的订单，请先完成它', 'error');
            } else {
                alert("数据获取失败 (错误码): " + ret.status);
                api.closeWin();
            }
        } else {
            alert("网络错误 : " + err.msg);
            api.closeWin();
        }
    });
}
