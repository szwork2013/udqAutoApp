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
        /*»ØÌø*/
	    $scope.goBack = function () {
	        $ionicHistory.goBack();
	    }
	}])