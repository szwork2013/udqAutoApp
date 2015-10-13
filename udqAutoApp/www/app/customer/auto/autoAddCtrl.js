angular.module('udqApp')
	.controller('customerAutoAddCtrl', ['$scope', '$ionicPopup', '$stateParams', '$state', '$ionicHistory', '$window', '$ionicNavBarDelegate', 'regionSvr', 'autoSvr', 'popUpSvr', function ($scope, $ionicPopup, $stateParams, $state, $ionicHistory, $window,$ionicNavBarDelegate, regionSvr, autoSvr, popUpSvr) {
	    var backName = $stateParams.backName;
	    $scope.autoInfo = angular.fromJson($stateParams.autoInfo);
        
	    var orderInfo = angular.fromJson($stateParams.orderInfo);

	    if (backName == 'customerAutoMgr' || backName == 'customerAutoList' && $scope.autoInfo == undefined) {
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
	        /*颜色*/
	        if (auto.color == undefined || auto.color == "") {
	            return '请输入您的爱车颜色';
	        }
	        /*小区selectedRegionId*/
	        //if (auto.selectedRegionId == undefined) {
	        //    return '请选择小区';
	        //}
	        return;
	    }
		/*点击"确认"*/
		$scope.addAuto = function () {
		    /*1、检查车牌号、车品牌、颜色、型号、是否选择小区
		      2、调用数据数据服务，添加车辆*/
		    var temp = checkAutoInfo($scope.autoInfo);
		    if (temp != undefined) {
		        popUpSvr.showAlert(temp);
		        return;
		    }
		    
		    var promise = autoSvr.addAutoItem($scope.autoInfo);
		    promise.then(
                function (data) {
                    if (data.isSuccess) {
                        console.log('添加车辆成功');
                        $state.go('customerAutoMgr');
                    } else {
                        console.log(data.msg);
                        popUpSvr.showAlert("请选择小区");
                        return;
                    }

                }, function (data) {
                    console.log(data);
                    return;
		});

	    };
	    /*跳转到城市选择*/
		$scope.goToCitySelect = function () {
		    
		    $state.go('customerCitySelect', { 'lastPageName': 'customerAutoAdd', 'autoInfo': JSON.stringify($scope.autoInfo), 'orderInfo': JSON.stringify(orderInfo) });
		}
	    /*跳转到区域选择*/
	    $scope.goToRegionSelect = function () {       	        
	        $state.go('customerRegion', { 'lastPageName': 'customerAutoAdd', 'autoInfo': JSON.stringify($scope.autoInfo), 'orderInfo': JSON.stringify(orderInfo) });
		}
	    /*跳转到小区选择*/
	    $scope.goToDistrictSelect = function () {
	        $state.go('customerDistrictSelect', { 'lastPageName': 'customerAutoAdd', 'autoInfo': JSON.stringify($scope.autoInfo), 'orderInfo': JSON.stringify(orderInfo) });
	    }


        /*根据backName回跳之前的界面*/
	    $scope.goBack = function () {
	        //$ionicNavBarDelegate.back();
	        if (backName == 'customerAutoList') {
	            $state.go(backName, { 'lastPageName': 'customerAutoAdd','orderInfo':JSON.stringify(orderInfo) });
	        } else {	            
	            $state.go("customerAutoMgr");
	        }
		}

	}])
