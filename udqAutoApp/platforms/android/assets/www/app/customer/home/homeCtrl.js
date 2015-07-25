/*
cutomer 的主页面
功能菜单
*/

angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerHomeCtrl', ['$scope', '$state', '$ionicHistory', function ($scope, $state, $ionicHistory) {
    	/*轮播图片*/
    	$scope.images = [];
    	/*跳转到我的订单*/
    	$scope.goToMyOrder = function(){
    		$ionicHistory.clearHistory();
    		$state.go('customerMyOrder');
    	};
    	/*跳转到'我的点趣'*/
    	$scope.goToMyDQ = function(){
    		$ionicHistory.clearHistory();
    		$state.go('customerMyDQ');
    	};
    }])