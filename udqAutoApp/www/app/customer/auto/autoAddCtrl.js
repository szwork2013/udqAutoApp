angular.module('udqApp')
	.controller('customerAutoAddCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$window', 'regionSvr', 'autoSvr', function ($scope, $stateParams, $state, $ionicHistory, $window, regionSvr, autoSvr) {
	    $scope.autoInfo = {
	        userId: $window.localStorage['userID'],
	        id: 0/*0为添加，1为修改*/
	    };
	    $scope.selected = {};
	    $scope.selectedDistrictPid;
	    $scope.selectedRegionPid;
	    var backName = $stateParams.backName;
		/*检查车牌号的正则表达式*/
	    $scope.pnRe = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;

        /*检查输入车辆信息是否合法*/
	    var checkAutoInfo = function (auto) {
            /*车牌号*/
	        var pnRe = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;
	        if (pnRe.test(auto.pn)) {
	            auto.pn = angular.uppercase(auto.pn);
	        } else {
	            return '车牌号输入不合法';
	        }
	        /*品牌*/
	        if (auto.brand == undefined) {
	            return '请输入您的爱车品牌';
	        }
	        /*颜色、型号*/
	        /*小区*/
	        if (auto.defaultRegionId == undefined) {
	            return '请选择小区';
	        }
	        return;
	    }
	    $scope.autoInfo.pn;
	    $scope.cities = regionSvr.getCities();
	    $scope.regions = regionSvr.getRegions();
	    $scope.districts = regionSvr.getDistricts();

		/*点击"确认"*/
		$scope.addAuto = function () {
		    /*1、检查车牌号、车品牌、颜色、型号、是否选择小区
		      2、调用数据数据服务，添加车辆*/
		    var temp = checkAutoInfo($scope.autoInfo);
		    if (temp != undefined) {
		        showAlert(temp);
		        return;
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
            autoSvr.setAutoInfo($scope.autoInfo);
	        $state.go('customerCitySelect');
		}
	    /*跳转到区域选择*/
	    $scope.goToRegionSelect = function () {
            autoSvr.setAutoInfo($scope.autoInfo);
	        $state.go('customerRegion');
		}
	    /*跳转到小区选择*/
	    $scope.goToDistrictSelect = function () {
	        autoSvr.setAutoInfo($scope.autoInfo);
	        $state.go('customerDistrictSelect');
		}
		$scope.getDefaultRegionId = function (id) {
		    $scope.autoInfo.defaultRegionId = id;
		}

	    $scope.autoInfo = autoSvr.getAutoInfo();

	    //联动地址
	    $scope.selectedRegionPid = autoSvr.getSelectedCityId();
	    $scope.selectedDistrictPid = autoSvr.getSelectedRegionId();
	    //选择的地址
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
	        autoSvr.setDefaultRegionId($scope.selected.selectedDistrictId);
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

		var showAlert = function (msg) {
		    var alertPopup = $ionicPopup.alert({
		        title: '温馨提示',
		        template: msg
		    });
		    alertPopup.then(function (res) {
		        console.log(msg);
		    });
		}

	}])
