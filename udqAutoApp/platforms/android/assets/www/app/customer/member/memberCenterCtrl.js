angular.module('udqApp')
	.controller('customerMemberCenterCtrl', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory){
		/*跳转到我的订单*/
    	$scope.goToMyOrder = function(){
    		$ionicHistory.clerHistory();
    		$state.go('customerMyOrder');
    	};
	}])