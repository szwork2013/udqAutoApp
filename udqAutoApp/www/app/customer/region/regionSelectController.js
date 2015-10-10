angular.module('udqApp')
	.controller('customerRegionSelectController', ['$scope', '$stateParams', '$state', 'regionSvr', function ($scope, $stateParams, $state, regionSvr) {
	    /*上一个页面传递过来的参数：
                lastPageName -> 上个页面的名字
                orderInfo -> 订单信息*/
	    $scope.orderInfo = angular.fromJson($stateParams.orderInfo);
	    $scope.lastPageName = $stateParams.lastPageName;
	    /*获取车辆*/
	    regionSvr.doRequest().then(
            function (data) {
                if ($scope.districts == undefined) {
                    regionSvr.getCitiesFromData(data);
                    $scope.districts = regionSvr.getDistricts();
                }
            },
            function (data) {
                console.log(data);
            }
        );

	    $scope.doRefreshOfRegion = function () {
	        $scope.districts = regionSvr.getDistricts();
	        $scope.$broadcast('scroll.refreshComplete');
	    }
	    $scope.goBackOfDoRegionSelect = function (district) {
	        $scope.orderInfo.auto.defaultRegionId = district.id;
	        $scope.orderInfo.auto.regionName = district.name;
	        $state.go("customerOrderMake", { 'lastPage': 'customerRegionSelect', 'orderInfo': JSON.stringify($scope.orderInfo) });
	    }
	    $scope.goBackOfRegionSelect = function () {
	        $state.go("customerOrderMake", { 'lastPage': 'customerRegionSelect', 'orderInfo': JSON.stringify($scope.orderInfo) });
	    }
	    $scope.on_select = function () {
	        var radio = document.getElementById("selected");
	        radio.style.backgroundColor = "#ccc";
	    }
	}])