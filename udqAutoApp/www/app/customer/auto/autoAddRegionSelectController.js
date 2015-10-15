angular.module('udqApp')
	.controller('customerAutoAddRegionSelectCtrl', ['$scope', '$ionicPopup', '$stateParams', '$state', '$ionicHistory', '$window', 'regionSvr', 'autoSvr', 'popUpSvr', function ($scope, $ionicPopup, $stateParams, $state, $ionicHistory, $window, regionSvr, autoSvr, popUpSvr) {
	    var backName = $stateParams.backName;
	    $scope.autoInfo = angular.fromJson($stateParams.autoInfo);
	    var orderInfo = angular.fromJson($stateParams.orderInfo);

	    /*获取城市、区域、小区*/
	    regionSvr.doRequest().then(
                    function (data) {
                        if (data != undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.regions = regionSvr.getRegions();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );

	    $scope.doRefreshOfRegion = function () {
	        $scope.Regions = regionSvr.getRegions();
	        $scope.$broadcast('scroll.refreshComplete');
	    }

	    $scope.goBackOfRegionSelect = function () {
	        $state.go('customerAutoAdd', { 'backName': backName, 'autoInfo': JSON.stringify($scope.autoInfo), 'orderInfo': JSON.stringify(orderInfo) });
	    }
	    $scope.goBackOfDoRegionSelect = function (region) {
	        $scope.autoInfo.selectedRegionId = region.id;
	        $state.go('customerAutoAdd', { 'backName': backName, 'autoInfo': JSON.stringify($scope.autoInfo), 'orderInfo': JSON.stringify(orderInfo) });
	    }

	}])
