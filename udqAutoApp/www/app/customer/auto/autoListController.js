angular.module('udqApp')
	.controller('customerAutoListController', ['$scope', '$stateParams', '$state', 'autoSvr', function ($scope, $stateParams, $state, autoSvr) {
	    /*上一个页面传递过来的参数：
                lastPageName -> 上个页面的名字
                orderInfo -> 订单信息*/
	    $scope.orderInfo = angular.fromJson($stateParams.orderInfo);
	    $scope.lastPageName = $stateParams.lastPageName;
	    /*获取车辆*/
	    autoSvr.getAuto().then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        $scope.autoInfo = data.rows;
                        $scope.hasNoAuto = false;
                    } else {
                        $scope.hasNoAuto = true;
                        console.log('用户无车辆信息，未添加车辆');
                    }
                } else {
                    console.log(data.msg);
                }
            },
            function (data) {
                console.log(data);
            }
        );

	    /*下拉刷新*/
	    $scope.doRefresh = function () {
	        autoSvr.getAuto().then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        $scope.autoInfo = data.rows;
                        console.log("获取车辆成功" + data.rows.length);
                    }
                } else {
                    console.log(data.msg);
                }
            }, function (data) {
                console.log(data);
            }
            );
	        $scope.$broadcast('scroll.refreshComplete');
	    }
        /*添加*/
	    $scope.goToAddauto = function () {
            /*传递orderInfo*/
	        $state.go('customerAutoAdd', { 'backName': 'customerAutoList' ,'orderInfo':JSON.stringify($scope.orderInfo)});
	    }
	    $scope.goBackOfSelectAuto = function (auto) {
	        $scope.orderInfo.auto = auto;
	        $state.go("customerOrderMake", { 'lastPage': 'customerAutoList', 'orderInfo': JSON.stringify($scope.orderInfo) });
	    }
	    $scope.goBackOfAuto = function () {
	        $state.go("customerOrderMake", { 'lastPage': 'customerAutoList', 'orderInfo': JSON.stringify($scope.orderInfo) });
	    }
	}])