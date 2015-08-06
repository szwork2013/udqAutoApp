angular.module('udqApp')
	.controller('customerAutoListCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'autoSvr', function ($scope, $window, $state, $ionicHistory, autoSvr) {
	    $scope.autoInfo = [];
	    var promise = autoSvr.getAuto();
	    promise.then(
            function (data) {
                $scope.autoInfo = data.rows;
                console.log("获取车辆成功：" + data.rows.length);
            }, function (data) {
                console.log(data);
            }
        );
	    $scope.doRefresh = function () {

	        autoSvr.getAuto().then(
            function (data) {
                $scope.autoInfo = data.rows;
                console.log("获取车辆成功" + data.rows.length);
            }, function (data) {
                console.log(data);
            }
            );
	        $scope.$broadcast('scroll.refreshComplete');
	    }
	    $scope.goToAddauto = function () {
	        $state.go('customerAutoAdd');
	    }
	    $scope.goBack = function () {
	        $ionicHistory.goBack();
	    }
	}])