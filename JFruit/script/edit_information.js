
function get_Location(){
     api.showProgress({
         title: 'Loading',
         text: 'Please wait...',
      });
     api.ajax({
          url: 'http://.....',
          method: 'post',
          dataType: "json",
          data: {
            values: {
              phone:api.getPrefs({ sync: true, key: 'phone' }),
              token:api.getPrefs({ sync: true, key: 'token' })
            },
          }
     },function(ret,err){
       api.hideProgress();
       if(ret){
       if(ret.status == "100"){
          //alert(JSON.stringify(ret));
          $("#n").text("当前 (Now) : "+ret.Location+"，"+ret.position);
       }else{
         api.toast({ msg: "Network error : "+ret.status });
       }
      }else{
         api.toast({
           msg : "No Network connection"
         });
      }
     });
   }







 function getValue(){
    var radio = document.getElementsByName("gender");
   	for (i=0; i<radio.length; i++) {
   	   	if (radio[i].checked) {
   	   			return radio[i].value;
   	  		}
    	}
 }

 function stripscript(s){ 
   var pattern = new RegExp("[%`~!@#$^&*=|{}';',\\[\\].<>/?~！@#￥……&*（)——|{}【】‘；：”“'。，、？]");
  var rs = ""; 
  for (var i = 0; i < s.length; i++) { 
rs = rs+s.substr(i, 1).replace(pattern, ''); 
}
return rs;
}


 function _ajax(){
     api.showProgress({
         title: 'Sending',
         text: 'please wait...',
      });
     api.ajax({
          url: 'http://www.ramcraft.cn/API/modify.php',
          method: 'post',
          dataType: "json",
          data: {
            values: {
              phone: api.getPrefs({ sync: true, key: 'phone' }),
              token:api.getPrefs({ sync: true, key: 'token' }),
              position:document.getElementById("xx").value,
              Location:getValue()
            },
          }
     },function(ret,err){
       api.hideProgress();
       if(ret){
       if(ret.status == "100"){

         $("#n").text("当前位置[Now] :  "+getValue()+"，"+document.getElementById("xx").value);

         api.alert({
            msg: '您的位置[Now] '+getValue()+"--"+document.getElementById("xx").value,
         });

         api.openWin({name: 'Lobby',url: './Lobby.html',animation:{type:'reveal', subType:'from_top', duration:300}});
       }else{
         swal(
              'Failed',
              '错误代码(error):'+ret.status,
               'error'
         );
       }
       }else{
          swal(
              'Failed',
              'No network (没有连接到网络)',
               'error'
         );
       }
     });

   }
