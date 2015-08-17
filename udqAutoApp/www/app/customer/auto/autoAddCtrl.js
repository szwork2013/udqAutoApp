angular.module('udqApp')
	.controller('customerAutoAddCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$window', 'regionSvr', 'autoSvr', function ($scope, $stateParams,$state, $ionicHistory, $window, regionSvr, autoSvr) {
	    $scope.autoInfo = {
	        pn: '',
	        brand: '',
	        color: '',
	        model: '',
	        defaultRegionId: 0,
	        userId: $window.localStorage['userID'],
            id:0/*0为添加，1为修改*/
	    };
        $scope.selected = {};
	    var backName = $stateParams.backName;
		/*检查车牌号的正则表达式*/
	    $scope.pnRe = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;

	    var checkAutoInfo = function (auto) {
	        return false;
	    }
	    $scope.cities = regionSvr.getCities();
	    $scope.regions = regionSvr.getRegions();
	    $scope.districts = regionSvr.getDistricts();

		/*点击"确认"*/
		$scope.addAuto = function () {
		    /*1、检查车牌号、车品牌、颜色、型号、是否选择小区
		      2、调用数据数据服务，添加车辆*/
		    if (checkAutoInfo($scope.autoInfo)) {

		    }
		    var promise = autoSvr.addAutoItem($scope.autoInfo);
		    promise.then(
                function (data) {
                    if (data.isSuccess) {
                        console.log('添加车辆成功');
                        $scope.goBack();
                    } else {
                        console.log(data.msg);
                        return;
                }

                }, function (data) {
                    console.log(data);
                    return;
		});

		};
	    /*跳转到城市选择*/
		$scope.goToCitySelect = function () {
		    $state.go('customerCitySelect');
		}
	    /*跳转到区域选择*/
		$scope.goToRegionSelect = function () {
		    $state.go('customerRegion');
		}
	    /*跳转到小区选择*/
		$scope.goToDistrictSelect = function () {
		    $state.go('customerDistrictSelect');
		}
		/*选择城市后自动联动区域*/
		$scope.cityToRegion = function(mycity) {
			console.log(mycity.name);
			$scope.regions = mycity.regions;
		}
		/*选择区域后自动联动小区*/
		$scope.regionToDistrict = function (myregion) {
			console.log(myregion.name);
			$scope.districts = myregion.districts;
		}
		$scope.getDefaultRegionId = function (id) {
		    $scope.autoInfo.defaultRegionId = id;
		}

		$scope.selected.selectedCityId = autoSvr.getSelectedCityId();
		$scope.selected.selectedRegionId = autoSvr.getSelectedRegionId();
		$scope.selected.selectedDistrictId = autoSvr.getSelectedDistrictId();
	    /***************************************************************/
	    /*****************************地址选择**************************/
		$scope.doRefreshOfCity = function () {
		    $scope.Cities = regionSvr.getCities();
		    $scope.$broadcast('scroll.refreshComplete');
		}
		$scope.doRefreshOfRegion = function () {
		    $scope.Regions = regionSvr.getRegions();
		    $scope.$broadcast('scroll.refreshComplete');
		}
		$scope.doRefreshOfDistrict = function () {
		    $scope.Districts = regionSvr.getDistricts();
		    $scope.$broadcast('scroll.refreshComplete');
		}
		$scope.goBackOfCitySelect = function () {
		    /*保存到service*/
		    autoSvr.setSelectedCityId($scope.selected.selectedCityId);
		    $state.go('customerAutoAdd', { 'typeSelect': 'city' });
		}
		$scope.goBackOfRegionSelect = function () {
		    /*保存到service*/
		    autoSvr.setSelectedRegionId($scope.selected.selectedRegionId);
		    $state.go('customerAutoAdd', { 'typeSelect': 'region' });
		}
		$scope.goBackOfDistrictSelect = function () {
		    /*保存到service*/
		    autoSvr.setSelectedDistrictId($scope.selected.selectedDistrictId);
		    $state.go('customerAutoAdd', { 'typeSelect': 'district' });
		}

        /*获取地域信息*/
		regionSvr.doRequest().then(
            function (data) {
                $scope.cities = regionSvr.getCitiesFromData(data);
            },
            function (data) {
                console.log(data);
            }
        );
		
        /*根据backName回跳之前的界面*/
		$scope.goBack = function () {
		    $state.go(backName);
		    
		}

	}])
