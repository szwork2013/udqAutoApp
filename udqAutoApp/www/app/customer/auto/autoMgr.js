angular.module('udqApp')
	.controller('customerAutoMgrCtrl', ['$scope', '$state', '$ionicHistory', '$window', 'autoSvr', 'popUpSvr', function ($scope, $state, $ionicHistory, $window, autoSvr, popUpSvr) {
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
	    /*��ȡ��ѡ��ĳ�������*/
	    $scope.selectedAuto = autoSvr.getAutoInfo();
	    /*��������*/
	    $scope.goToAutoInfo = function (auto) {
	        autoSvr.setAutoInfo(auto);
	        $state.go('customerAutoInfo');
	    }
	    $scope.goBackOfAutoInfo = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerAutoMgr');
	    }
	    /*ɾ������*/
	    $scope.deleteAuto = function (item) {
	        popUpSvr.confirmExit('ɾ���˳�����').then(
                function (res) {
	              if (res) {
	                var promise = autoSvr.deleteAutoItem(item.id);
	                promise.then(
                        function (data) {
                            if (data.isSuccess) {
                                ArrayRemove($scope.autoInfo, item);
                            }
                        },
                        function (data) {
                            console.log(data);
                        }
                    );
	                $scope.doRefresh();
	                console.log('ȷ��ɾ��');
	            } else {
	                console.log('you are not sure');
	            }
	        });
	    }
	    /*����ˢ��*/
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
	    /*��ӳ���*/
	    $scope.goToAddauto = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerAutoAdd', { 'backName': 'customerAutoMgr' });
	    }
	    /*����(����backParam)*/
	    $scope.goBack = function () {
	        $ionicHistory.clearHistory();
	        if (backParam == "customerMyDQ") {
	            $state.go('customerMyDQ');
	        }
	        if (backParam == "customerHome") {
	            $state.go('customerHome');
	        }
	    }
	    /*(�Զ���)�����Ƴ�ָ��Ԫ��*/
	    var ArrayRemove = function (array, item) {
	        var index = -1;
	        for (var i = 0; i < array.length; i++) {
	            var element = array[i];
	            if (item.id == element.id) {
	                index = i;
	                break;
	            }
	        }
	        if (index == -1) {
	            array.splice(index, 1);
	        }
	    }
	}]);
