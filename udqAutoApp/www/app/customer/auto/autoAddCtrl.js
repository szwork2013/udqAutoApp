angular.module('udqApp')
	.controller('customerAutoAddCtrl', ['$scope', '$state', '$ionicHistory', 'regionSvr', 'autoSvr', function ($scope, $state, $ionicHistory, regionSvr, autoSvr) {
	    $scope.autoInfo = {
	        pn: '',
	        brand: '',
	        color: '',
	        model: '',
            defaultRegionId:''
	    };
		/*检查车牌号的正则表达式*/
		$scope.pnRe=/^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;

		/*点击"确认"*/
		$scope.addAuto = function(){
			/*1、检查车牌号、车品牌、颜色、型号、是否选择小区
		      2、调用数据数据服务，添加车辆*/
		    var promise = autoSvr.addAutoItem($scope.autoInfo);
		    promise.then(
                function (data) {
                    console.log(data);
                }, function (data) {
                    console.log(data);
                });
		};
		/*选择城市后自动联动区域*/
		$scope.cityToRegion = function(mycity) {
			console.log(mycity.name);
			$scope.regions = mycity.regions;
		};
		/*选择区域后自动联动小区*/
		$scope.regionToDistrict = function (myregion) {
			console.log(myregion.name);
			$scope.districts = myregion.districts;
		};
		$scope.getDefaultRegionId = function (id) {
		    $scope.autoInfo.defaultRegionId = id;
		};
		$scope.cities = [];
		var promise = regionSvr.getRegion();

		promise.then(
            function (data) {
                var cities = regionSvr.getCitiesFromData(data);
                regionSvr.setCities(cities);
                $scope.cities = cities;
            },
            function (data) {
                alert(data);
            });

		$scope.goBack = function(){
		    $ionicHistory.goBack();
		};

	}])
