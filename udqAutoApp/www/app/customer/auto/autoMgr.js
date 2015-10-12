angular.module('udqApp')
	.controller('customerAutoMgrCtrl', ['$scope', '$state', '$ionicHistory', 'popUpSvr', '$window', '$ionicNavBarDelegate', 'autoSvr', function ($scope, $state, $ionicHistory, popUpSvr, $window,$ionicNavBarDelegate, autoSvr) {
	    var backParam = autoSvr.getBackParam();
	    autoSvr.getAuto().then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        $scope.autoInfo = data.rows;
                        $scope.hasNoAuto = false;
                    } else {
                        $scope.hasNoAuto = true;
                    }
                } else {
                    console.log(data.msg);
                }
            },
            function (data) {
                console.log(data);
            }
        );
	    /*获取所选择的车辆详情*/
	    $scope.selectedAuto = autoSvr.getAutoInfo();
	    /*车辆详情*/
	    $scope.goToAutoInfo = function (auto) {
	        autoSvr.setAutoInfo(auto);
	        $state.go('customerAutoInfo', {'selectedAuto':JSON.stringify(auto)});
	    }
	    /*删除车辆*/
	    $scope.deleteAuto = function (item) {
	        popUpSvr.confirmExit('确定删除该车辆？').then(
                function (res) {
	              if (res) {
	                var promise = autoSvr.deleteAutoItem(item.id);
	                promise.then(
                        function (data) {
                            if (data.isSuccess) {
                                ArrayRemove($scope.autoInfo, item);
                                $scope.doRefresh();
                            }
                        },
                        function (data) {
                            console.log(data);
                        }
                    );
	               // $scope.doRefresh();
	                //console.log('确定删除');
	            } else {
	                console.log('you are not sure');
	            }
	        });
	    }
	    /*下拉刷新*/
	    $scope.doRefresh = function () {
	        autoSvr.getAuto().then(
                function (data) {
                    if (data.isSuccess) {
                        if (data.rows.length > 0) {
                            $scope.autoInfo = data.rows;
                            $scope.hasNoAuto = false;
                        } else {
                            $scope.hasNoAuto = true;
                        }
                    } else {
                        console.log(data.msg);
                    }
                },
            function (data) {
                console.log(data);
            }
                );
	        $scope.$broadcast('scroll.refreshComplete');
	    }
	    /*添加车辆*/
	    $scope.goToAddauto = function () {
	        $state.go('customerAutoAdd', { 'backName': 'customerAutoMgr','autoInfo':'','orderInfo':'' });
	    }
	    /*回跳(根据backParam)*/
	    $scope.goBack = function () {
	        $ionicNavBarDelegate.back();
	        //if (backParam == "customerMyDQ") {
	        //    $state.go('customerMyDQ');
	        //}
	        //if (backParam == "customerHome") {
	        //    $state.go('customerHome');
	        //}
	    }
	    /*(自定义)数组移除指定元素*/
	    var ArrayRemove = function (array, item) {
	        var index = -1;
	        for (var i = 0; i < array.length; i++) {
	            var element = array[i];
	            if (item.id == element.id) {
	                index = i;
	                break;
	            }
	        }
	        if (index == 0) {
	            array.splice(index, 1);
	        }
	        if (index == -1) {
	            array.splice(index, 1);
	        }
	    }
	}]);
