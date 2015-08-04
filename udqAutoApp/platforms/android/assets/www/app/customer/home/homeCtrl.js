/*
cutomer 的主页面
功能菜单
*/

angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerHomeCtrl', ['$scope', '$state', '$ionicHistory', '$window', '$ionicTabsDelegate', function ($scope, $state, $ionicHistory, $window, $ionicTabsDelegate) {
    	/*轮播图片*/
        $scope.images = [];
        /*跳转到我要洗车*/
        $scope.goToBookWash = function () {
            $state.go('customerOrderMake');
        }
    	/*跳转到我的订单*/
    	$scope.goToMyOrder = function(){
    		$state.go('customerMyOrder');
    	};
    	/*跳转到'我的点趣'*/
    	$scope.goToMyDQ = function(){
    	    /*判断是否已经登录*/
    	    if ($window.localStorage['loginState'] == 'true') {
    	        $state.go('customerMyDQ');
    	    } else {
    	        $state.go('login');
    	    }
    		
    	};
    }])