
 
   function Animate_(){
       $("#Title").fadeIn(1000,function(){
          $("#view").fadeIn(1000,function(){
             $("#view_").fadeIn(1000,function(){
      
$("#next").fadeIn(1000,function(){
         $("#more").fadeIn(1000);
               });            
             });
          });
       });
       //$("#join").animate("left:0px",100);
   }
   
   
   function getValue(){   
    var radio = document.getElementsByName("gender"); 
   	for (i=0; i<radio.length; i++) { 	
   	   	if (radio[i].checked) { 	
   	   			return radio[i].value;
   	  		} 
    	} 
 }
 
   
   function Go() {     
          to_login();    
   }
   
   function to_login(){
        api.openWin({
            name: 'Ensure',
            url: './Ensure.html',
            animation:{
                type:"push",
                subType:"from_right",   
                duration:400                
            },
            pageParam: {
                phone: document.getElementById("phone").value,
                country: getValue()
            }
         });   
   }
   
   
   