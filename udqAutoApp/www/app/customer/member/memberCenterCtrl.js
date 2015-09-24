angular.module('udqApp')
	.controller('customerMemberCenterCtrl', ['$scope','$state', '$ionicHistory', '$window', 'customerMemberInfoSvr', 'autoSvr', 'loginSvr', 'jpushSvr', 'APP_CONFIG', 'popUpSvr', function ($scope,$state, $ionicHistory, $window, customerMemberInfoSvr,autoSvr, loginSvr, jpushSvr, APP_CONFIG, popUpSvr) {
	    var baseUrl = APP_CONFIG.server.getUrl();
	    customerMemberInfoSvr.getUserInfo($window.localStorage['userID']).then(
            function (data) {
                if (data.isSuccess) {
                    $scope.user = data.data;
                } else {
                   console.log(data.msg);
                }
                
            },
            function (data) {
                console.log(data);
            });
	    $scope.man = '男';
	    $scope.woman = '女';
	    /*返回我的点趣*/
	    $scope.goToCenter = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerMyDQ');
	    }
	    /*跳转到充值界面*/
	    $scope.goToRecharge = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerRecharge', { 'backParam': 'customerMyDQ' });
	    }
        /*跳转到洗车店信息*/
	    $scope.goToWashShopInfo = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerWashShopInfo');
	    }
	    /*洗车店信息-获取信息*/
	    customerMemberInfoSvr.getWashShopInfo($window.localStorage['userID']).then(
            function (data) {
                if (data.isSuccess) {
                    $scope.washShopInfo = data.rows;
                    for (var i = 0; i < $scope.washShopInfo.length; i++) {
                        if ($scope.washShopInfo[i].photoUrl == "" || $scope.washShopInfo[i].photoUrl == undefined || $scope.washShopInfo[i].photoUrl == null) {
                            $scope.washShopInfo[i].photoUrl = "image/mydianqu.png";
                        } else {
                            $scope.washShopInfo[i].photoUrl = baseUrl + $scope.washShopInfo[i].photoUrl; 
                        }
                    }
                } else {
                    console.log(data.msg);
                }

            },
            function (data) {
                console.log(data);
            });
	    /*跳转到车辆列表*/
	    $scope.goToAutoList = function () {
	        $ionicHistory.clearHistory();
	        autoSvr.setBackParam("customerMyDQ");
	        $state.go('customerAutoMgr');
	    }

	    $scope.goToEditOwnerInfo = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerMemberInfoEdit');
	    };
	    $scope.goBack = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerHome');
	    }
	    /*编辑-保存*/
	    $scope.saveMemberInfo = function () {
	        /*判断电话号码是否合法*/
	        if (!checkMobile($scope.user.mobile)) {
	            popUpSvr.showAlert('号码须11位数字，以1开头');
	            return;
	        }
	        customerMemberInfoSvr.editUserInfo($scope.user).then(
            function (data) {
                if (data.isSuccess) {
                    $window.localStorage['userName'] = $scope.user.name;
                    $window.localStorage['sex'] = $scope.user.sex;
                    $scope.goToCenter();
                } else {
                    popUpSvr.showAlert(data.msg);
                }
            },
            function (data) {
                console.log(data);
            });
	    }
	    /*校验输入是否是合法的电话号码*/
	    var checkMobile = function (mobile) {
	        var re = /^1\d{10}$/;
	        if (re.test(mobile)) {
	            return true;
	        } else {
	            return false;
	        }
	    }
        /*退出当前账户*/
	    $scope.exitCurrentUser = function () {
	        popUpSvr.confirmExit('注销当前用户？').then(function (res) {
	            if(res){
	                $window.localStorage['loginState'] = 0;
	                $window.localStorage['userID'] = 0;
	                $window.localStorage['mobile'] = '';
	                $window.localStorage['userName'] = '';
	                $window.localStorage['userType'] = 0;
	                $window.localStorage['sex'] = 0;

	                $state.go('customerHome');
	                console.log('退出当前用户');
	            } else {
	                console.log('you are not sure');
	            }
	        });
    	}
    	

    	var showAlertOfFail = function (errorMsg) {
    	    var alertPopup = $ionicPopup.alert({
    	        title: '温馨提示',
    	        template: errorMsg
    	    });
    	    alertPopup.then(function (res) {
    	        console.log(errorMsg);
    	    });
    	}
	}])