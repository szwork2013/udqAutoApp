angular.module('udqApp')
	.controller('employeeOrderListCtrl', ['$scope', '$window', '$state', '$ionicHistory', '$ionicPopup', 'networkInfoSvr', function ($scope, $window, $state, $ionicHistory, $ionicPopup, networkInfoSvr) {
	    var showAlert = function (msg) {
	        var alertPopup = $ionicPopup.alert({
	            title: '温馨提示',
	            template: msg
	        });
	        alertPopup.then(function (res) {
	            console.log(msg);
	        });
	    }
	    var networkInfo = networkInfoSvr.checkConnection();
	    if (networkInfo != undefined) {
	        showAlert(networkInfo);
	    }


	    $scope.orderInfo = {
	    };
	    /*退出当前账户*/
	    $scope.exitCurrentUser = function () {
	        var confirmPopup = $ionicPopup.confirm({
	            title: '温馨提示',
	            template: '确认退出当前账户？'
	        });
	        confirmPopup.then(function (res) {
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
