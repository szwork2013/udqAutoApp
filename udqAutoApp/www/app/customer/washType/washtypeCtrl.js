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
        /*回跳*/
	    $scope.goBack = function () {
	        $ionicHistory.goBack();
	    }
        /*washTypeNote页面显示信息*/
	    $scope.type = customerWashtypeSvr.getWashType();
	}])