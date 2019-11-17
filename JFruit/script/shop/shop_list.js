 
   var now = "";
   var _money = 0; 
   
   function _exit(){
      api.openWin({
         name: 'Lobby',
         url: './Lobby.html',
         animation:{
                type:"reveal",
                subType:"from_top", 
                duration:500   
            },
      });
   }
  
  
   
   function Animate_(){
       $("#box").fadeIn(900,function(){
      $("#_1").fadeIn(900,function(){
             _ajax();
      });
    });
  }
   
   
   
   
   function Error_(){     
       $("#err").fadeIn(50);
   }
   
   
   
   
   function Go() {
     if(now == ""){
         Error_();
     }else{
         $("#err").hide(50);
         api.openWin({
             name: 'Production_list',
             url: './Production_list.html',
             animation:{
                 type:"push",
                 subType:"from_right",   
                 duration:300                
             },
             reload:true,
             pageParam:{
                 ID: now,
                 price:_money,          
             }
         });
     }
   }
 
 
   
   function Choose(name,money){ 
      if(name != ""){
        
        now = name;
        _money = money;
        $("#err").hide(50);
        Go();
      }else{
        $("#title").html("Choose a shop");
        now = "";
        $("#err").hide(50);
      }
   }
 
 
 
 
  function _ajax(){    
     api.showProgress({ 
         title: '正在获取', 
         text: '请稍候...', 
      });
     api.ajax({ 
          url: 'http://www.ramcraft.cn/API/shops.php',
          method: 'get', 
          dataType: "json",
          cache:true
     },function(ret,err){ 
       api.hideProgress();
       api.refreshHeaderLoadDone();
       //alert(JSON.stringify(ret));
       if(ret){
       if(ret.status == "100"){
       
        $("#shops_box").html("");
        for(var key in ret){
           if(ret[key] != '100'){
                       _addhtml(key.replace("#", ""),ret[key]['name'],ret[key]['price'],ret[key]['position']);
           }
        }
        
       }else if(ret.status == "104"){
         $("#title").html("<div class='mdl-color-text--red-300'>暂无店铺营业哦/Nothing here now...");
         $("#shops_box").html("");
       }else{
         alert("数据获取失败 (Error): "+ret.status);
         api.closeWin();
        } 
      }else{
         alert("Network boom : "+err.msg);
         api.closeWin();
        } 
     });
  }
  
  
  
  
  function _addhtml(ID,name,money,position){
  
     api.imageCache({ 
        url: 'http://www.ramcraft.cn/image/'+ID+'img.jpg' 
     },function(ret,err){ 
        var url = ret.url;
         $("#shops_box").prepend('<li class="box_" onclick="Choose(&quot;'+ID+'&quot; , &quot;'+money+'&quot;)"><img class="box-image" src="'+url+'" /><div class="box-info"><p class="box-title" style="margin: 6px 0 0 0;">'+name+'</p><span class="mdl-label mdl-label__green">'+position+'</span></li>');
     });
  }
  
  
  