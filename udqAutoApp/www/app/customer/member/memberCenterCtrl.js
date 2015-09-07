angular.module('udqApp')
	.controller('customerMemberCenterCtrl', ['$scope', '$timeout', '$state', '$ionicHistory', '$window', '$ionicPopup', 'customerMemberInfoSvr', 'jpushSvr', 'networkInfoSvr', function ($scope,$timeout, $state, $ionicHistory, $window, $ionicPopup, customerMemberInfoSvr, jpushSvr, networkInfoSvr) {
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
	    $scope.user = {
	        name: $window.localStorage['userName'],
	        sex: $window.localStorage['sex'],
            mobile:$window.localStorage['mobile']
	    };
	    customerMemberInfoSvr.getUserInfo($window.localStorage['userID']).then(
            function (data) {
                if (data.isSuccess) {
                    $scope.user = data.data;
                } else {
                    $scope.showAlert(data.msg);
                }
                
            },
            function (data) {
                $scope.showAlert(data);
            });
	    $scope.man = '男';
	    $scope.woman = '女';
	    $scope.goToCenter = function () {
	        $ionicHistory.clearHistory();
    	    $state.go('customerMyDQ');
    	}

	    $scope.goToEditOwnerInfo = function () {
	        $ionicHistory.clearHistory();
    	    $state.go('customerMemberInfoEdit');
    	};
	    $scope.goBack = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerHome');
    	}
    	$scope.saveMemberInfo = function () {
    	    if ($scope.user.name != $window.localStorage['userName'] || $scope.user.sex != $window.localStorage['sex']) {
    	        customerMemberInfoSvr.editUserInfo($scope.user).then(
                    function (data) {
                        if(data.isSuccess){
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

                        }
                    }
    	        ]
    	    });

    	    alertPopup.then(function (res) {
    	        $window.localStorage['loginState'] = 0;
    	        $window.localStorage['userID'] = 0;
    	        $window.localStorage['mobile'] = '';
    	        $window.localStorage['userName'] = '';
    	        $window.localStorage['userType'] = 0;
    	        $window.localStorage['sex'] = 0;

    	        $state.go('customerHome');
    	        console.log('退出当前用户');
    	        console.log(msg,res);
    	    });
    	    $timeout(function () {
    	        alertPopup.close(); //close the popup after 3 seconds for some reason
    	    }, 3000);
    	}
	}])