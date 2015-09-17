angular.module('udqApp')
	.controller('employeeOrderListCtrl', ['$scope', '$window', '$state', '$ionicHistory','popUpSvr', function ($scope, $window, $state, $ionicHistory, popUpSvr) {

	    $scope.orderInfo = {
	    };
	    /*退出当前账户*/
	    $scope.exitCurrentUser = function () {
	        popUpSvr.confirmExit('注销当前用户?').then(function (res) {
	            if (res) {
	                $window.localStorage['loginState'] = 0;
	                $window.localStorage['userID'] = 0;
	                $window.localStorage['mobile'] = '';
	                $window.localStorage['userName'] = '';
	                $window.localStorage['userType'] = 0;
	                $window.localStorage['sex'] = 0;
	                /*关闭推送*/
	                //jpushSvr.stopPush();

	                $state.go('customerHome');
	                console.log('退出当前用户');
	            } else {
	                console.log('You are not sure');
	            }
	        });
	    }
	  
	}])
