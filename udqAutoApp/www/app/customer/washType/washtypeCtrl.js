angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope', '$state', '$ionicHistory', 'customerWashtypeSvr', 'networkInfoSvr', function ($scope, $state, $ionicHistory, customerWashtypeSvr, networkInfoSvr) {
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


	    $scope.types = [];
	    var promise = customerWashtypeSvr.callWashType();
	    promise.then(
            function (data) {
                $scope.types = data.rows;
            },
            function (data) {
                console.log(data);
            });
        /*回跳到洗车服务*/
	    $scope.goBackOfWashType = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerOrderMake', { 'typeSelect': 'washTypeNote' });
	    }
	    /*回跳到主页*/
	    $scope.goBackOfMain = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerHome');
	    }
        /*washTypeNote页面显示信息*/
	    $scope.type = customerWashtypeSvr.getWashType();
	}])