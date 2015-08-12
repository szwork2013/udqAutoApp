angular.module('udqApp')
	.controller('customerMemberCenterCtrl', ['$scope', '$state', '$ionicHistory', '$window', '$ionicPopup', 'customerMemberInfoSvr', function ($scope, $state, $ionicHistory, $window, $ionicPopup, CustomerMemberInfoSvr) {
	    
    	$scope.goToCenter = function () {

    	    $state.go('customerMyDQ');
    	};

    	$scope.goToEditOwnerInfo = function () {
    	    $state.go('customerMemberInfoEdit');
    	};
    	$scope.goBack = function () {
    	    $ionicHistory.goBack();
    	}
    	$scope.saveMemberInfo = function () {
    	    if ($scope.name != $window.localStorage['userName']) {
    	        customerMemberInfoSvr.editUserInfo($scope.name).then(
                    function (data) {
                        $window.localStorage['userName'] = $scope.name;
                        $scope.goToCenter();
                    },
                    function (data) {
                        console.log(data);
                    });
    	    }
    	}
        /*退出当前账户*/
    	$scope.exitCurrentUser = function () {
    	    var alertPopup = $ionicPopup.alert({
    	        title: '温馨提示',
    	        template: '确认退出当前账户？'
    	    });
    	    alertPopup.then(function (res) {
    	        $window.localStorage['loginState'] = 0;
                $window.localStorage['userID'] = 0;
                $window.localStorage['mobile'] = '';
                $window.localStorage['userName'] = '';
                $window.localStorage['userType'] = 0;

    	        $state.go('customerHome');
    	        console.log('退出当前用户');
    	    });
    	    
    	}
	}])