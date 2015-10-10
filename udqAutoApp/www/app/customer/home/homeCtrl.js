/*
cutomer 的主页面
功能菜单
*/

angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerHomeCtrl', ['$scope', '$state', '$ionicHistory', '$window', '$ionicTabsDelegate','autoSvr', 'cameraSvr', '$ionicPopup', 'fileTransferSvr', function ($scope, $state, $ionicHistory, $window, $ionicTabsDelegate,autoSvr, cameraSvr, $ionicPopup, fileTransferSvr) {
    	/*轮播图片*/
        $scope.images = [];
        /*跳转到我要洗车*/
        $scope.goToBookWash = function () {
            $state.go('customerOrderMake', { 'lastPageName': 'customerHome', 'orderInfo': '' });
        }
        /*跳转到洗车服务类型介绍界面*/
    	$scope.goToWashTypeIntroduce = function () {
    	    $state.go('customerWashTypeIntroduce');
    	}
        /*跳转到我的订单*/
    	$scope.goToMyOrder = function () {
    	    /*判断是否已经登录*/
    	    if ($window.localStorage['loginState'] == '1') {
    	        $state.go('customerMyOrder');
    	    } else {
    	        $state.go('login');
    	    }
    	};
        /*跳转到'我的点趣'*/
    	$scope.goToMyDQ = function () {

    	    /*判断是否已经登录*/
    	    if ($window.localStorage['loginState'] == '1') {
    	        $state.go('customerMyDQ');
    	    } else {
    	        $state.go('login');
    	    }

    	};
        /*跳转到车辆列表*/
    	$scope.goToAutoList = function () {
    	    /*判断是否已经登录*/
    	    $state.go('customerAutoMgr');
    	    if ($window.localStorage['loginState'] == '1') {
    	        autoSvr.setBackParam("customerHome");
    	        $state.go('customerAutoMgr');
    	    } else {
    	        $state.go('login');
    	    }
    	}
    }])