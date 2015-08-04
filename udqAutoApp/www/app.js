/*
1.目录结构
1.1 按业务功能划分目录
1.2 每个功能页面单独一个目录，目录中包括：html,controller,service(可选）和 directive（可选)
1.3 每个customer 和 employee 的专有功能分别放在各自目录下
1.4 公共部分之间放在app目录下
1.5 工具类的放在  util 目录下
3.命名规范：
3.1 customer 用来表示车主，不能使用 owner。已有的必须要改
3.2 employee 用来表示职员  ，不能使用其它命名
3.3 controller的文件用 Ctrl后缀
3.4 service文件用 Svr后缀
3.5 module 和 html 没有后缀
3.5 首字母小写，后面的单词大写开头（驼峰命名）
3.6 控制器的命名规范参考 mainCtrl 
3.7 state的命名规范。大类+页面名称  比如：customerMain 表示  customer下面的main页面。
3.8 原则上除大家约定成俗的缩写外，其它单词不能使用缩写，如果要写缩写，需要经过我的同意。
4.页面
4.1 APP界面一般都没有超链接，用按钮来操作。
*/

angular.module('udqApp', ['ionic'])
    .run(['$ionicPlatform', '$rootScope', function ($ionicPlatform, $rootScope) {
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


    }])
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'APP_CONFIG', function ($stateProvider, $urlRouterProvider, $httpProvider,APP_CONFIG) {

	    $stateProvider
        /*登录*/
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller:'loginCtrl'
        })
	    /*车主主页*/
        .state('customerHome', {
            url: '/customerHome',
            templateUrl: 'app/customer/home/home.html',
            controller: 'customerHomeCtrl'
        })
        /*车主-我的订单*/
        .state('customerMyOrder', {
            url: '/customerMyOrder',
            templateUrl: 'app/customer/order/order.html',
            controller: 'customerOrderCtrl'
        })
        /*车主-我的点趣*/
        .state('customerMyDQ', {
            url: '/customerMyDQ',
            templateUrl: 'app/customer/member/memberCenter.html',
            controller: 'customerMemberCenterCtrl'
        })
        /*车主-车辆管理-添加车辆(注册添加)*/
        .state('customerAutoAdd', {
            url: '/customerAutoAdd',
            templateUrl: 'app/customer/auto/autoAdd.html',
            controller: 'customerAutoAddCtrl'
        })
        /*车主-车辆管理*/
        .state('customerAutoMgr', {
            url: '/customerAutoMgr',
            templateUrl: 'app/customer/auto/autoMgr.html',
            controller: 'customerAutoMgrCtrl'
        })
        /*车主-我要洗车-车辆选择*/
        .state('customerAutoList', {
            url: '/customerAutoList',
            templateUrl: 'app/customer/auto/autoList.html',
            controller: 'customerAutoListCtrl'
        })
        /*车主-我的点趣-信息编辑*/
        .state('customerMemberInfoEdit', {
            url: '/customerMemberInfoEdit',
            templateUrl: 'app/customer/member/memberInfoEdit.html',
            controller: 'customerMemberInfoEditCtrl'
        })
        /*车主-我的订单-订单评价*/
        .state('customerOrderEvaluate', {
            url: '/customerOrderEvaluate',
            templateUrl: 'app/customer/order/orderEvaluate.html',
            controller: 'customerOrderEvaluateCtrl'
        })
        /*车主-我要洗车*/
        .state('customerOrderMake',{
            url:'/customerOrderMake',
            templateUrl:'app/customer/order/orderMake.html',
            controller:'customerOrderMakeCtrl'
        })
        /*车主-我要洗车-洗车类型*/
        .state('customerWashtype', {
            url: '/customerWashtype',
            templateUrl: 'app/customer/order/washtype.html',
            controller: 'customerWashtypeCtrl'
        })
        /*车主-注册*/
        .state('customerRegister', {
            url: '/customerRegister',
            templateUrl: 'app/customer/register/register.html',
            controller: 'customerRegisterCtrl'
        })
        /*洗车店*/
        .state('employeeHome', {
            url: '/employeeHome',
            templateUrl: 'app/employee/home/home.html',
            controller: 'employeeHomeCtrl'
        })
        /*洗车店-待确认*/
        .state('employeeOrderToBeConfirmed',{
            url:'/employeeOrderToBeConfirmed',
            templateUrl:'app/employee/order/orderToBeConfirmed.html',
            controller: 'employeeOrderToBeConfirmedCtrl'
        })

	    /*.state('',{
            url:'',
            templateUrl:'',
            controller:''
        })*/
        ;

	    $urlRouterProvider.otherwise('/customerHome');

        /*修改put 和 post 的数据传递方式*/
	    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	    /*修改默认的transformRequest 否则后台收不到值 */
	    $httpProvider.defaults.transformRequest = [function (data) {
	        /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
	        var param = function (obj) {
	            var query = '';
	            var name, value, fullSubName, subName, subValue, innerObj, i;

	            for (name in obj) {
	                value = obj[name];

	                if (value instanceof Array) {
	                    for (i = 0; i < value.length; ++i) {
	                        subValue = value[i];
	                        fullSubName = name + '[' + i + ']';
	                        innerObj = {};
	                        innerObj[fullSubName] = subValue;
	                        query += param(innerObj) + '&';
	                    }
	                } else if (value instanceof Object) {
	                    for (subName in value) {
	                        subValue = value[subName];
	                        fullSubName = name + '[' + subName + ']';
	                        innerObj = {};
	                        innerObj[fullSubName] = subValue;
	                        query += param(innerObj) + '&';
	                    }
	                } else if (value !== undefined && value !== null) {
	                    query += encodeURIComponent(name) + '='
                                + encodeURIComponent(value) + '&';
	                }
	            }

	            return query.length ? query.substr(0, query.length - 1) : query;
	        };

	        return angular.isObject(data) && String(data) !== '[object File]'
                    ? param(data)
                    : data;
	    }];
	
	}])


