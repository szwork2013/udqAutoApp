angular.module('udqApp')
	.controller('customerMemberCenterCtrl', ['$scope', '$timeout', '$state', '$ionicHistory', '$window', '$ionicPopup', 'customerMemberInfoSvr','loginSvr', 'jpushSvr', function ($scope, $timeout, $state, $ionicHistory, $window, $ionicPopup, customerMemberInfoSvr,loginSvr, jpushSvr) {
	    customerMemberInfoSvr.getUserInfo($window.localStorage['userID']).then(
            function (data) {
                if (data.isSuccess) {
                    $scope.user = data.data;
                } else {
                    showAlert(data.msg);
                }
                
            },
            function (data) {
                showAlert(data);
            });
	    $scope.man = '男';
	    $scope.woman = '女';
	    /*返回我的点趣*/
	    $scope.goToCenter = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerMyDQ');
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
                } else {
                    console.log(data.msg);
                }

            },
            function (data) {
                showAlert(data);
            });
	    /*跳转到车辆列表*/
	    $scope.goToAutoList = function () {
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
	            showAlertOfFail('号码须11位数字，以1开头');
	            return;
	        }
	        customerMemberInfoSvr.editUserInfo($scope.user).then(
            function (data) {
                if (data.isSuccess) {
                    $window.localStorage['userName'] = $scope.user.name;
                    $window.localStorage['sex'] = $scope.user.sex;
                    $scope.goToCenter();
                } else {
                    $scope.showAlert(data.msg);
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
    	    $scope.showAlert_exit('注销当前用户？');
    	}
    	$scope.showAlert_exit = function (msg) {

    	    var alertPopup = $ionicPopup.show({
    	        template: msg,
    	        scope: $scope,
    	        buttons: [
                    {
                        text: '取消',
                        type:'button-dark'
                    },
                    {
                        text: '注销',
                        type:'buttton-stable',
                        onTap:function(e){
                            $window.localStorage['loginState'] = 0;
                            $window.localStorage['userID'] = 0;
                            $window.localStorage['mobile'] = '';
                            $window.localStorage['userName'] = '';
                            $window.localStorage['userType'] = 0;
                            $window.localStorage['sex'] = 0;

                            $state.go('customerHome');
                            console.log('退出当前用户');
                            console.log(msg);
                        }
                    }
    	        ]
    	    });

    	    alertPopup.then(function (res) {
    	        
    	    });
    	    $timeout(function () {
    	        alertPopup.close(); //close the popup after 3 seconds for some reason
    	    }, 3000);
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