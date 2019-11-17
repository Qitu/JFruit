
var ch = new Array(
   new Array(
   "积土世界",//0
   "简单， 优雅"
   ), 
   new Array(
   "加入积土",
   "和我一起红尘作伴 ~",
   "获取验证码"
   ),
   
   new Array(
   "我们给你发送了一条免费的短信验证码",
   "您的手机号 : ",
   "重新发送"
   ),
   
   new Array(
   "位置信息",//8
   "选择一个商品领取点",
   "送货规则 : 请选择下方离你常去的地点， 并填写详细位置， 如果选择了是宿舍地点， 我们会在商品到达后送到宿舍领取点， 如果填写的是学院地点我们会在你来学校上课的时候送到你手中，所以在 购买商品 时填写的 [空闲时间] 请填自己在学院有课的时间"
   ),
   
   new Array(
   "积土",//10
   "有你，积土才能成山",
   "介绍",
   "水果区",
   "零食铺",
   "帮 助",
   "进入区域",
   "历史订单",
   "选择语言",
   "关于积土",
   "退出登录",
   "登出后必须重新登录哦",
   "运费"
   ),
   
   new Array(
   "我是谁",//19
   "积土历史",
   "我出生于 2017.10.1 ， 为UKM部分中国留学生提供服务数月， 我被开发出来的初衷是让在马学能够更加方便快捷经济的购买到优质的商品... 我正在成长， 路漫漫其修远兮 ",
   "当前开放功能",
   "▪ 水果区 : 根据多处收集的科学依据得出， 水(果)是(积)土必不可少的部分， 水果区目前只开放 [未加工/初级加工] 水果购买。",
   "▪ 零食铺 : 此处有零食 ！ 再也不用担心粮食问题了 ～ 鼓励各位有实力的童鞋们在此摆摊， 我们采取的是轮换制的商品展示， 你们每一天都能看到不同的零食店啦 😊",
   "更多功能还在策划中， 如果你有好的建议愿意分享， 请在官方交流群里联系我哦",
   "微信扫码加群",
   "复制链接"
   ),
   
   new Array(
      "订单列表",
      "详细信息",
      "订单编号",
      "支付金额(RM)",
      "店铺名称",
      "运送地址",
      "联系方式",
      "订单状态",
      "商品列表 :"
   ),
   new Array(
      "欢迎来到零食店铺",
      "这里的商店每隔三天更新一次， 出现新的商店 ~"
   ),
   new Array(
      "店铺介绍",
      "商品列表",
      "购物车",
      "商品名称",
      "数量",
      "价格",
      "操作",
      "运费",
      "撒花",
      "总计",
      "确认订单"
   ),
   
   new Array(
      
   ),
   
);



var en = new Array(
   new Array(
   "JITU",
   "Simple, Beautiful",
   ),
   
   new Array(  
   "Sign up",
   "make life more convenient",
   "Get SMS Code"
   ),
   
   new Array(
   "I have sended to you a free SMS code.",
   "Your phone number : ",
   "Ensure"
   ),
   
   new Array(
   "Location information",
   "Choose a pick up points of goods",
   "Delivery rule : if you living in university dormitory, you'd better fill the form which under this part, else if you living in outside ... when you ensure order you need to fill a form called 'free time' just fill that time you have lecture. we will send goods to the faculty."
   ),
   
   new Array(
   "JITU",
   "Struggle for a better future",
   "Introduction",
   "Fruit station",
   "Sneak station",
   "HELP",
   "ENTER IN",
   "My Orders",
   "Languages",
   "About JITU",
   "Logout",
   "If you logout, you have to relogin",
   "Delivery fee"
   ),
   
   new Array(
   "Who I am",
   "My story",
   "I was born in Octorber the 1st, 2017, I have been used by UKM Chinese students for several months, my job is to be a platform which supports users in a convenient、effective、economic and faster way to buy goods in university. I was focus on Green-ICT, users will not need to drive for a long time to buy some goods... When I was a baby, I surved around 38 Chinese users, they ordered 51 times and all of them were shipped. Those orders cost more than 1000RM. and there are two shops running by UKM students. This is my test Data. Well, my story is not over, I'm making it fantastic.",
   "Features (now)",
   "▪Fruit station",
   "▪Sneak station",
   "If you have any idea or suggestions, welcome to join ChattingGroup to tell us, Thank you !",
   "Scan the QR using Wechat",
   "Copy the link"
   ),
   new Array(
      "OrderList",
      "Information",
      "NUMBER",
      "Amount(RM)",
      "StoreNM    ",
      "Address  ",
      "Contact",
      "Status   ",
      "Goods    "
   ),
   new Array(
      "Welcome to Sneak Station",
      "We will update the stores once in three days, it means next update stores you will meet new shops"
   ),
   
   new Array(
      "Introduction",
      "Goods-list",
      "Shop-carts",
      "Name",
      "Count",
      "Price",
      "DeliveryFee",
      "BASE",
      "Totally",
      "Ensure"
   )
);

 var l = "";
 function _lang(part){
    
    api.getPrefs({
       key: 'lang' 
       },function(ret, err) { 
        if(ret.value == "en"){
           l = en;
        }else if(ret.value == "ch"){
           l = ch;          
        }else{
           api.openWin({
              name: 'Lang',
              url: './Lang.html'
           });
           return;
        }
        
   for(var i=0;i<(l[part].length);i++){
           $("#_"+i).text(l[part][i]);
   }
   
    });
 }
 
 
 function _iniLang(){
     api.getPrefs({
       key: 'lang' 
       },function(ret, err) { 
        if(ret.value == "en"){
           l = en;
        }else if(ret.value == "ch"){
           l = ch;          
        }else{
           api.openWin({
              name: 'Lang',
              url: './Lang.html'
           });
           return;
        }
      $("#_0").html(l[6][0]);
      $("#_1").html(l[6][1]);
    });
 }
 
 
 function special(part,index){
    
   return l[part][index];
   
 }