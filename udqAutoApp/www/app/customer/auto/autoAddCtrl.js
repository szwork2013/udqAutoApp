angular.module('udqApp')
	.controller('customerAutoAddCtrl', ['$scope', '$ionicPopup', '$stateParams', '$state', '$ionicHistory', '$window', 'regionSvr', 'autoSvr', 'networkInfoSvr', function ($scope, $ionicPopup, $stateParams, $state, $ionicHistory, $window, regionSvr, autoSvr, networkInfoSvr) {
	    var showAlert = function (msg) {
	        var alertPopup = $ionicPopup.alert({
	            title: '温馨提示',
	            template: msg
	        });
	        alertPopup.then(function (res) {
	            console.log(msg);
	        });
	    }
	    var networkInfo = networkInfoSvr.checkConnection();
	    if (networkInfo != undefined) {
	        showAlert(networkInfo);
	    }
	    var backName = $stateParams.backName;
	    autoSvr.setBackName(backName);
	    backName = autoSvr.getBackName();

	    /*从service获取显示数据*/
	    $scope.autoInfo = autoSvr.getAutoInfo();
	    if ($scope.autoInfo == undefined) {
	        $scope.autoInfo = {
	            userId: $window.localStorage['userID'],
	            id: 0/*0为添加，1为修改*/
	        };
	    }
        /*获取城市、区域、小区*/
	    regionSvr.doRequest().then(
                    function (data) {
                        if (data != undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.cities = regionSvr.getCities();
                            $scope.regions = regionSvr.getRegions();
                            $scope.districts = regionSvr.getDistricts();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );

	    $scope.autoInfo.selectedDistrictPid;
	    $scope.autoInfo.selectedRegionPid;

	    

        /*检查输入车辆信息是否合法*/
	    var checkAutoInfo = function (auto) {
	        /*车牌号*/
	        if (auto.pn == undefined) {
	            return '车牌号不能为空';
	        }
	        var pnRe = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;
	        auto.pn = auto.pn.replace(/\s+/g, "")
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
	        /*小区selectedRegionId*/
	        if (auto.selectedRegionId == undefined) {
	            return '请选择小区';
	        }
	        return;
	    }
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
                        $ionicHistory.clearHistory();
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
		    saveAutoInfoToSvr($scope.autoInfo);
		    $ionicHistory.clearHistory();
	        $state.go('customerCitySelect');
		}
	    /*跳转到区域选择*/
	    $scope.goToRegionSelect = function () {
	        saveAutoInfoToSvr($scope.autoInfo);
	        $ionicHistory.clearHistory();
	        $state.go('customerRegion');
		}
	    /*跳转到小区选择*/
	    $scope.goToDistrictSelect = function () {
	        saveAutoInfoToSvr($scope.autoInfo);
	        $ionicHistory.clearHistory();
	        $state.go('customerDistrictSelect');
	    }

		$scope.getDefaultRegionId = function (id) {
		    $scope.autoInfo.defaultRegionId = id;
		}

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
	        saveAutoInfoToSvr($scope.autoInfo);
	        $ionicHistory.clearHistory();
	        $state.go('customerAutoAdd', { 'typeSelect': 'city' });
	    }
	    $scope.goBackOfRegionSelect = function () {
	        /*保存到service*/
	        saveAutoInfoToSvr($scope.autoInfo);
	        $ionicHistory.clearHistory();
	        $state.go('customerAutoAdd', { 'typeSelect': 'region' });
	    }
	    $scope.goBackOfDistrictSelect = function () {
	        /*保存到service*/
	        saveAutoInfoToSvr($scope.autoInfo);
	        $ionicHistory.clearHistory();
	        $state.go('customerAutoAdd', { 'typeSelect': 'district' });
	    }
		
        /*根据backName回跳之前的界面*/
	    $scope.goBack = function () {
	        if (backName == 'customerAutoList') {
	            $ionicHistory.clearHistory();
	            $state.go(backName, {'typeSelect':'goToAuto'});
	        } else {
	            $ionicHistory.clearHistory();
	            $state.go(backName);
	        }
		}

		

        /*保存添加车辆信息到服务中*/
		var saveAutoInfoToSvr = function (autoInfo) {
		    autoSvr.setAutoInfo(autoInfo);
		}

	}])
