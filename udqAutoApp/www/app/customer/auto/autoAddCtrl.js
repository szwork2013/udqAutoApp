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
	    var backName = $stateParams.backName;
		/*检查车牌号的正则表达式*/
		$scope.pnRe=/^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;

		/*点击"确认"*/
		$scope.addAuto = function(){
			/*1、检查车牌号、车品牌、颜色、型号、是否选择小区
		      2、调用数据数据服务，添加车辆*/
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
                $scope.cities = cities;
            },
            function (data) {
                alert(data);
            });
        /*根据backName回跳之前的界面*/
		$scope.goBack = function () {
		    $state.go(backName);
		    
		};

	}])
