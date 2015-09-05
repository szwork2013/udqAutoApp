angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope', '$ionicHistory', 'customerWashtypeSvr', function ($scope, $ionicHistory, customerWashtypeSvr) {
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
	        $state.go('customerWashtype', {'typeSelect':'washTypeNote'});
	    }
	    /*回跳到主页*/
	    $scope.goBackOfMain = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerMyDQ');
	    }
        /*washTypeNote页面显示信息*/
	    $scope.type = customerWashtypeSvr.getWashType();
	}])