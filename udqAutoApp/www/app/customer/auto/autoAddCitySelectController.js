angular.module('udqApp')
	.controller('customerAutoAddCitySelectCtrl', ['$scope', '$ionicPopup', '$stateParams', '$state', '$ionicHistory', '$window', 'regionSvr', 'autoSvr', 'popUpSvr', function ($scope, $ionicPopup, $stateParams, $state, $ionicHistory, $window, regionSvr, autoSvr, popUpSvr) {
	    var lastPageName = $stateParams.lastPageName;
	    $scope.autoInfo = angular.fromJson($stateParams.autoInfo);
	    var orderInfo = angular.fromJson($stateParams.orderInfo);

	    /*获取城市、区域、小区*/
	    regionSvr.doRequest().then(
                    function (data) {
                        if (data != undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.cities = regionSvr.getCities();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );

	    $scope.doRefreshOfCity = function () {
	        $scope.Cities = regionSvr.getCities();
	        $scope.$broadcast('scroll.refreshComplete');
	    }

	    $scope.goBackOfCitySelect = function () {
	        $state.go('customerAutoAdd', { 'backName': 'customerCitySelect', 'autoInfo': JSON.stringify($scope.autoInfo), 'orderInfo': JSON.stringify(orderInfo) });
	    }
	    $scope.goBackOfDoCitySelect = function (city) {
	        $scope.autoInfo.selectedCityId = city.id;
	        $state.go('customerAutoAdd', { 'backName': 'customerCitySelect', 'autoInfo': JSON.stringify($scope.autoInfo), 'orderInfo': JSON.stringify(orderInfo) });
	    }

	}])
