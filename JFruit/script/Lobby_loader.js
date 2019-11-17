
  function Fruit() {
         api.openWin({
             name: 'Production_list',
             url: './Production_list.html',
             animation:{
                 type:"movein",
                 subType:"from_bottom",   
                 duration:300                
             },
             reload:true,
             pageParam:{
                 ID: "1",
                 price:"3",          
             }
       });
   }
   


  function _advice(){
     swal({ 
        input: 'textarea',
        inputPlaceholder: '输入你的建议', 
        inputAttributes: { 
          'aria-label': '字数不能过多哦' 
        }, 
        showCancelButton: true
     }).then(function (text){ 
        if (text){ 
           swal("Oops","建议系统还没开启呢，去微信群里提建议吧");
        } 
     }).catch(swal.noop);
  }

function Go(msg,kind,kindd) {
      api.openWin({
            name: msg,
            url: './'+msg+'.html',
            animation:{
                type:kind,
                subType:kindd,   
                duration:300                
            }
         });
   }
   
   
   function Edit_(msg,kindd) {
      api.openWin({
            name: "Edit_information",
            url: './Edit_information.html',
            animation:{
                type:"movein",
                subType:"from_bottom", 
                duration:500   
            },
            pageParam: {
                   sh:msg,
                   kind:kindd
            }        
         });
   }


   function Relogin(){
   
   swal({ 
      title: 'Are you sure?', 
      text: "退出登录后必须重新登录哦", 
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes', 
      cancelButtonText: 'No' 
   }).then(function (){
        api.removePrefs({ key: 'phone' });
        api.removePrefs({ key: 'token' });
        api.removePrefs({ key: 'role' });
         api.openWin({
            name: "View",
            url: './View.html',
            animation:{
                type:"push",
                subType:"from_left",   
                duration:400                
            }
         });
      }, function (dismiss) {   
       //
    });    
   }
   
   
   function _ajax(){
     api.ajax({
          url: 'http://www.ramcraft.cn/News.php',
          method: 'get', 
          dataType: "json",
     },function(ret,err){        
       if(ret.status=="true"){     
         $("#news").html(ret.info);
       }else if(ret.status=="close"){
         swal({ 
            title: "JITU CLOSED Now", 
            text: "Message :"+ret.msg,
         });  
       }
   });   
  }

