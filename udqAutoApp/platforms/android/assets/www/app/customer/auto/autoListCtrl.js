angular.module('udqApp')
	.controller('customerAutoListCtrl', ['$scope', '$window', '$state','$ionicHistory', 'autoSvr', function ($scope, $window,$state,$ionicHistory, autoSvr) {
	    $scope.autoInfo = [];
	    var promise = autoSvr.getAuto(2);
	    promise.then(
            function (data) {
                $scope.autoInfo = data.rows;
                console.log("该用户下的车辆数量是："+data.rows.length);
            }, function (data) {
                console.log(data);
            }
        );
	    $scope.goToAddauto = function () {
	        $state.go('customerAutoAdd');
	    }
	    $scope.goBack = function () {
	        $ionicHistory.goBack();
	    }
	}])