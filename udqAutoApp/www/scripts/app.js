/*
1.script下面基础目录
1.1 controller  控制器
1.2 module      模型
1.3 service     数据服务
1.4 上面目录下又分为两个目录
1.4.1 customer 顾客（车主)
1.4.2 employee  职员（洗车工、管理员）  
2.view 在www下面，表示ionic的html页面（模板）
3.命名规范：
3.1 customer 用来表示车主，不能使用 owner。已有的必须要改
3.2 employee 用来表示职员  ，不能使用其它命名
3.3 controller的文件用 Ctrl后缀
3.4 service文件用 Svr后缀
3.5 module 和 html 没有后缀
3.5 首字母小写，后面的单词大写开头（驼峰命名）
3.6 控制器的命名规范参考 mainCtrl 
3.7 state的命名规范。大类+‘_’+页面名称  比如：customer_main 表示  customer下面的main页面。
3.8 原则上除大家约定成俗的缩写外，其它单词不能使用缩写，如果要写缩写，需要经过我的同意。
4.页面
4.1 APP界面一般都没有超链接，用按钮来操作。


*/

angular.module('app', [
    'ionic',
    'app.controller.customer'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	    $stateProvider
        .state('customer_main', {
            url: '/customer_main',
            templateUrl: 'view/customer/main.html',
            controller: 'app.controller.customer.mainCtrl'
        });

	    $urlRouterProvider.otherwise('/customer_main');

	}])
