angular.module('udqApp')
	.controller('customerMemberCenterCtrl', ['$scope', '$state', '$ionicHistory', function ($scope, $state, $ionicHistory) {
		/*跳转到我的订单*/
    	$scope.goToMyOrder = function(){
    		$state.go('customerMyOrder');
    	};
    	$scope.goToAutoInfo = function () {
    	    
    	    $state.go('customerAutoMgr');
    	};

    	$scope.goToEditOwnerInfo = function () {
    	    $state.go('customerMemberInfoEdit');
    	};
    	$scope.goBack = function () {
    	    $ionicHistory.goBack();
    	}
    	$scope.saveMemberInfo = function () {

    	};
	}])