  var bill_dataData = {};

  function _ajax(){
     $("#bill-box").html("");
     api.showProgress({
         title: 'Loading',
         text: 'Please wait...',
      });
     api.ajax({
          url: 'http://.....?'+api.getPrefs({ sync: true, key: 'phone' }),
          method: 'get',
          dataType: "json",
          cache:true
     },function(ret,err){
       api.hideProgress();
       //alert(JSON.stringify(ret));
       if(ret){
       if(ret.status == "100"){
        for(var key in ret){
           if(ret[key] != '100'){
               _addhtml(key.replace("#", ""),ret[key]['status'],ret[key]['price'],ret[key]['sender'],ret[key]['data'],ret[key]['position'],ret[key]['destination'],ret[key]['time']);
           }
        }

       }else if(ret.status == "104"){
         swal(
              'Oh',
              'Your order box is empty / 你的仓库空空如也哦',
              'warning');
       }else{
         alert("Error (错误码): "+ret.status);
         api.closeWin();
        }
      }else{
         alert("网络错误/NetworkBoom! : "+err.msg);
         api.closeWin();
        }
     });

  }




  function _addhtml(ID,status,price,sender,data,position,destination,time){
   var names = new Array(
      special(6,2),
      special(6,3),
      special(6,4),
      special(6,5),
      special(6,6),
      special(6,7),
      special(6,8)
   );
     $("#bill-box").append('<div class="mdl-cell" style="margin-top:20px"><div class="mdl-cell mdl-shadow--2dp" style="padding:15px; background:#FFFFF"> <div style="font-size:15px;"><b>'+names[0]+' #'+ID+'</b></div><div class="bill-time">'+time+'</div><div class="money-show"><div class="bill-cell">'+names[1]+'</div><div class="bill-money">'+price+'.00</div></div><hr><div class="bill-info"><div style="font-size:15px;"><span style="color:rgba(0,0,0,0.5)">'+names[2]+'：</span><span class="shop-text">'+destination+'</span></div><div style="font-size:15px;"><span style="color:rgba(0,0,0,0.5)">'+names[3]+':</span><span class="shop-text">'+position+'</span></div><div style="font-size:15px;"><span style="color:rgba(0,0,0,0.5)">'+names[4]+'：</span><span class="shop-phone" onclick="clips(&quot;'+sender+'&quot;)">'+sender+'</span></div><div style="font-size:15px;"><span style="color:rgba(0,0,0,0.5)">'+names[5]+'：</span><span class="mdl-label '+_styles(status)+'" style="margin-left:25px">'+_roles(status)+'</span></div><div style="font-size:15px;"><div style="display:inline-block; color:rgba(0,0,0,0.5)">'+names[6]+'：</div><div class="shop-info">'+data+'</div></div></div></div></div>');
  }


  function Open_info(ID,price,position,time){
       $("#bg").fadeIn(50,function(){
          $("#msg").html(bill_dataData[ID+"Q"]+"<br><br><b>订单价格: ["+price+"] RM</b><br><br><b>送往地区:["+position+"]</b><br><br><b>开始时间:["+time+"]</b>");
      });
 }


 function Close_info(){
    $("#bg").fadeOut(50);
 }


 function clips(msg){
    var clipBoard = api.require('clipBoard');
     clipBoard.set({
        value: msg
     }, function(ret, err) {
     if (ret) {
       swal(
              'Copy successfully',
              '已复制到剪切板:'+msg,
              'success');
     } else {
       alert(JSON.stringify(err));
     }
   });
 }


  function _roles(role){
     switch(role){
        case "1":
           return "未开始/Preparing";

        case "2":
           return "进行中/Running";

        case "3":
           return "已取消/Canceled";

        case "4":
           return "已完成/Finished";

        default:
           return "未知状态/Undefined";

     }
  }

  function _styles(role){
     switch(role){
        case "1":
           return "mdl-label__yellow";

        case "2":
           return "mdl-label__red";

        case "4":
           return "mdl-label__green";

        default:
           return "";

     }
  }
