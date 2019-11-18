function reSend() {

    api.showProgress({
        title: 'Sending',
        text: 'Please wait...'
    });

    var smsVerify = api.require('smsVerify');

    smsVerify.sms({
        phone: api.pageParam.phone,
        country: api.pageParam.country
    },
    function(ret, err) {
        api.hideProgress();
        if (ret.status) {
            api.toast({
                msg: 'Send SMS code successfully'
            });
        } else {
            api.alert({
                msg: err.code + ' ' + err.msg
            });
        }
    });
}

var wait = 60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        $("#btn").text("Resend");
        wait = 60;
    } else {
        o.setAttribute("disabled", true);
        wait--;
        $("#btn").text("Resend(" + wait + "s)");
        setTimeout(function() {
            time(o);
        },
        1000);
    }
}

function Go(token) {

    api.setPrefs({
        key: 'phone',
        value: api.pageParam.country + $("#phone").text()
    });

    api.setPrefs({
        key: 'token',
        value: token
    });

    api.openWin({
        name: 'Edit_information',
        url: './Edit_information.html',
        reload: true,
        animation: {
            type: "push",
            subType: "from_right",
            duration: 400
        }
    });
}

function Ensured() {

    api.showProgress({
        title: 'Sending',
        text: 'Please wait...',
    });

    var smsVerify = api.require('smsVerify');
    smsVerify.verify({
        phone: $("#phone").text(),
        country: api.pageParam.country,
        code: document.getElementById("code").value
    },
    function(ret, err) {

        if (ret.status) {
            canDo = true;
            _ajax();
        } else {
            api.hideProgress();
            api.alert({
                msg: "Error" + err.code + ' \n' + err.msg
            });
        }
    });
}

function _ajax() {
    if (canDo) {
        api.ajax({
            url: 'http://.....',
            method: 'post',
            dataType: "json",
            data: {
                values: {
                    phone: api.pageParam.country + $("#phone").text()
                }
            }
        },
        function(ret, err) {
            api.hideProgress();
            if (ret.status == "100") {
                alert('登录成功 / Login success');
                if (ret.role == "1") {
                    api.setPrefs({
                        key: 'role',
                        value: "1"
                    });
                }
                Go(ret.token);
            } else {
                alert("Login failed : " + ret.status);
            }
        });
    } else alert("你并没有通过短信验证 / Please pass the SMS verify first");
}
