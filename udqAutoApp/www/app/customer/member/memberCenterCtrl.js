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
	    $scope.persons = [
            {
                sexValue:1,
                sexText:'男'
            }, {
                sexValue:2,
	            sexText:'女'
	        }
            ];
	    
	    /*跳转到充值界面*/
	    $scope.goToRecharge = function () {
	        $state.go('customerRecharge', { 'backParam': 'customerMyDQ' });
	    }
        /*跳转到洗车店信息*/
	    $scope.goToWashShopInfo = function () {
	        $state.go('customerWashShopInfo');
	    }
	    
	    /*跳转到车辆列表*/
	    $scope.goToAutoList = function () {
	        autoSvr.setBackParam("customerMyDQ");
	        $state.go('customerAutoMgr');
	    }

	    $scope.goToEditOwnerInfo = function () {	        
	        $state.go('customerMemberInfoEdit', { 'userInfo': JSON.stringify($scope.user) });
	    };
	    $scope.goBack = function () {	        
	        $state.go('customerHome');
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