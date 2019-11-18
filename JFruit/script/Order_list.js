
  function _shop(){
     api.actionSheet({
       title: '店铺操作',
       cancelTitle: '取消/CANCELLED',
       buttons: ['订单开送 / Start', '开启店铺 / Open','关闭店铺 / Close']
     },function(ret,err){
       switch(ret.buttonIndex){
          case 1:
             status_ajax("2","当前所有订单已进入送货模式");
          break;
          case 2:
             status_ajax("1","你的店铺现在可在店铺列表中找到");
          break;
          case 3:
             status_ajax("0","你的店铺已关闭(隐藏)");
          break;
       }
    });
   }


   function status_ajax(bl,msg){
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
              phone:api.getPrefs({ sync: true, key: 'phone' }),
              token:api.getPrefs({ sync: true, key: 'token' }),
              status:bl
            },
          }
     },function(ret,err){
       api.hideProgress();
       //alert(JSON.stringify(ret));
       if(ret){
       if(ret.status == "100"){
         swal(
              'success',
               msg,
              'success');
       }else if(ret.status == "104"){
         swal(
              '抱歉',
              '商店数据更新失败，也可能是服务器炸了...',
              'warning');
       }else{
         alert("数据获取失败 (错误码): "+ret.status);
         api.closeWin();
        }
      }else{
         alert("网络错误 : "+err.msg);
         api.closeWin();
        }
     });
   }



  var bill_dataData = {};

  function _ajax(){
     $("#bill-box").html("");
     api.showProgress({
         title: '正在获取',
         text: '请稍候...',
      });
     api.ajax({
          url: 'http://www.ramcraft.cn/API/deliver.php?'+api.getPrefs({ sync: true, key: 'phone' }),
          method: 'get',
          dataType: "json",
          cache:true
     },function(ret,err){
       api.hideProgress();
       //alert(JSON.stringify(ret));
       if(ret){
       if(ret.status == "100"){
        for(var key in ret){
           if(key != "status"){
               _addhtml(key.replace("#", ""),ret[key]['reciver'],ret[key]['position'],ret[key]['destination'],ret[key]['data'],ret[key]['price']);
           }
        }
       }else if(ret.status == "104"){
         swal(
              '啊哈',
              '暂时未发现用户需求单哦',
              'warning');
       }else{
         alert("数据获取失败 (错误码): "+ret.status);
         api.closeWin();
        }
      }else{
         alert("网络错误 : "+err.msg);
         api.closeWin();
        }
     });
  }




  function _addhtml(ID,reciver,position,destination,data,price){
     bill_dataData[ID+"Q"] = data;
     $("#bill-box").prepend('<tr id="'+ID+'"><td class="mdl-data-table__cell--non-numeric">#'+ID+'</td><td><a style="text-decoration:underline" onclick="clips(&quot;'+reciver+'&quot;)">获取</a></td><td><span class="mdl-label mdl-label__blue">'+position+'</span></td><td><a onclick="_bottom(&quot;'+ID+'&quot;)">操作</a></td><td>'+destination+'</td><td>	<a onclick="Open_info(&quot;'+ID+'&quot;,&quot;'+price+'&quot;,&quot;'+position+'&quot;)">详情</a></td></tr>');
  }


  function Open_info(ID,price,position){
       $("#bg").fadeIn(50,function(){
          $("#msg").html(bill_dataData[ID+"Q"]+"<br><br><b>订单价格: ["+price+"] RM</b><br><br><b>送往地区:["+position+"]</b>");
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
              '复制成功',
              '号码:'+msg,
              'success');
     } else {
       alert(JSON.stringify(err));
     }
   });
 }


 function _bottom(ID){
    api.actionSheet({
       title: '操作/EDIT',
       cancelTitle: '取消/CANCELLED',
       buttons: ['删除订单(慎)', '完成订单', '取消订单']
    },function(ret,err){
       switch(ret.buttonIndex){
          case 1:
             swal(
              'Warning',
              '暂时无法删除',
              'error');
          break;
          case 2:
             order_ajax(ID,4);
          break;
          case 3:
             order_ajax(ID,3);
          break;
       }
    });
 }





  function order_ajax(ID,kind){

     api.showProgress({
         title: '正在提交信息',
         text: '请稍候...',
      });
     api.ajax({
          url: 'http://www.ramcraft.cn/API/administrator/order_status.php',
          method: 'post',
          dataType: "json",
          data: {
            values: {
              phone:api.getPrefs({ sync: true, key: 'phone' }),
              token:api.getPrefs({ sync: true, key: 'token' }),
              type:kind,
              ID:ID
              }
          }
     },function(ret,err){
       api.hideProgress();
       //alert(JSON.stringify(ret));
       if(ret){
       if(ret.status == "100"){
        $("#"+ID).remove();
        swal(
              '操作成功',
              '请和订单['+ID+']买家二次确认',
              'success');
       }else if(ret.status == "104"){
         swal(
              '请重试',
              '数据SQL处理失败',
              'warning');
       }else{
         alert("数据处理失败 (错误码): "+ret.status);
         api.closeWin();
        }
      }else{
         alert("网络错误 : "+err.msg);
         api.closeWin();
        }
     });
  }
