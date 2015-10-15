angular.module('udqApp')
	.controller('customerAutoAddDistrictSelectCtrl', ['$scope', '$ionicPopup', '$stateParams', '$state', '$ionicHistory', '$window', 'regionSvr', 'autoSvr', 'popUpSvr', function ($scope, $ionicPopup, $stateParams, $state, $ionicHistory, $window, regionSvr, autoSvr, popUpSvr) {
	    var backName = $stateParams.backName;
	    $scope.autoInfo = angular.fromJson($stateParams.autoInfo);
	    var orderInfo = angular.fromJson($stateParams.orderInfo);

	    /*获取城市、区域、小区*/
	    regionSvr.doRequest().then(
                    function (data) {
                        if (data != undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.districts = regionSvr.getDistricts();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );

	    $scope.doRefreshOfDistrict = function () {
	        $scope.districts = regionSvr.getDistricts();
	        $scope.$broadcast('scroll.refreshComplete');
	    }

	    $scope.goBackOfDistrictSelect = function () {
	        $state.go('customerAutoAdd', { 'backName': backName, 'autoInfo': JSON.stringify($scope.autoInfo), 'orderInfo': JSON.stringify(orderInfo) });
	    }
	    $scope.goBackOfDoDistrictSelect = function (district) {
	        $scope.autoInfo.selectedDistrictId = district.id;
	        $state.go('customerAutoAdd', { 'backName': backName, 'autoInfo': JSON.stringify($scope.autoInfo), 'orderInfo': JSON.stringify(orderInfo) });
	    }

	}])
