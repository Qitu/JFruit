![JFruit](https://github.com/Qitu/JFruit/raw/master/JFruit/image/jitu.png "JT logo")  
JFruit
=======
### This project has been officially open sourced, If your are learning programming, I hope it can help you, either by its codes or creativity~ 
  Author：Andy Xu，Email：andy@jitu.fun    
  
  
## Overview：  
JFruit released on October 1, 2017，as the first project for the author during his studies.   
It was a new and literally exciting experience to be an entrepreneur after graduation from high school in China.  
  
## Technical Part：  
JFruit is an hybrid app build on APICLOUD Platform  
- [x] Chinese/English multi-language support
- [x] It includes an authentiaction verification function using SMS service
- [x] Flexible and Redevelopable API functions
- [x] Delivery dashboard for carriers
- [x] Online bill, Bill, history, Bill, Details
- [x] Front-end was developed using Material Design Lite framwork
- [x] Good-looking animation with smooth interactions
- [x] Image cache function  
    
    
## Business Logic:  
User registration -> User verification -> User sets his/her basic information including their address -> User add goods to the cart -> User confirm purchase ->
The data will be stored in the database -> The couriers can accsee their dashboard to check the new orders -> Couriers change the delivered order's status to completed
   
**APICLOUD third party model used**：SMS verification  
   
## About APIs:  
**Register** (JFruit\script\User_ensure.js on line 96: _ajax())
* Method: POST
- Body:  
```
Output:  
{  
 ret.status: "100", //success  
 ret.role: "0" //0-Normal user, 1-Couriers  
 ret.token: "" //security token for user  
}
```
**Products list**  
**Make an order** 
**Get Ongoing Bill(s) (Couriers)**  
**Finish orders (Couriers)**  
**Delete completed or unwanted orders (Couriers)**  

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Qitu/JFruit/raw/master/LICENSE.md) file for details
   
