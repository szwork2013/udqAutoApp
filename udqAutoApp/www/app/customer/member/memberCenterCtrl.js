angular.module('udqApp')
	.controller('customerMemberCenterCtrl', ['$scope', '$state', function($scope, $state){
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
	}])