angular.module('udqApp')
	.controller('customerAutoMgrCtrl', ['$scope', '$state', '$ionicHistory', '$window', 'autoSvr', function ($scope, $state, $ionicHistory, $window,autoSvr) {

	    var promise = autoSvr.getAuto();

	    promise.then(
            function (data) {
                $scope.autoInfo = data.rows;
            },
            function (data) {
                console.log(data);
            }
        );
	    /*删除车辆*/
	    $scope.deleteAuto = function (item) {

	        var promise = autoSvr.deleteAutoItem(item.id);
	        promise.then(
                function (data) {
                    if (data.isSuccess) {
                        ArrayRemove($scope.autoInfo, item);
                    }
                },
                function (data) {
                    console.log(data);
                }
            );
	        $scope.doRefresh();
	    };
	    /*下拉刷新*/
	    $scope.doRefresh = function () {
	        autoSvr.getAuto().then(
                function (data) {
                    $scope.autoInfo = data.rows;
                },
            function (data) {
                console.log(data);
            }
                );
	        $scope.$broadcast('scroll.refreshComplete');
	    }
	    /*添加车辆*/
	    $scope.goToAddauto = function () {
	        $state.go('customerAutoAdd', { 'backName': 'customerAutoMgr' });
	    };
	    $scope.goBack = function () {
	        $ionicHistory.goBack();
	    }

	    var ArrayRemove = function (array, item) {
	        var index = -1;
	        for (var i = 0; i < array.length; i++) {
	            var element = array[i];
	            if (item.id == element.id) {
	                index = i;
	                break;
	            }
	        }
	        if (index == -1) {
	            array.splice(index, 1);
	        }
	    }
	}]);
