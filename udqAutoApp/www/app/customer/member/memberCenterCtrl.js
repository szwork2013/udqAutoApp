angular.module('udqApp')
	.controller('customerMemberCenterCtrl', ['$scope', '$state', '$ionicHistory', '$window', '$ionicPopup', 'customerMemberInfoSvr', 'jpushSvr', function ($scope, $state, $ionicHistory, $window, $ionicPopup, customerMemberInfoSvr, jpushSvr) {
	    
	    $scope.user = {
	        name: $window.localStorage['userName'],
	        sex: $window.localStorage['sex'],
            mobile:$window.localStorage['mobile']
	    };
	    $scope.man = '男';
	    $scope.woman = '女';
    	$scope.goToCenter = function () {
    	    $state.go('customerMyDQ');
    	}

    	$scope.goToEditOwnerInfo = function () {
    	    $state.go('customerMemberInfoEdit');
    	};
    	$scope.goBack = function () {
    	    $ionicHistory.goBack();
    	}
    	$scope.saveMemberInfo = function () {
    	    if ($scope.user.name != $window.localStorage['userName'] || $scope.user.sex != $window.localStorage['sex']) {
    	        customerMemberInfoSvr.editUserInfo($scope.user).then(
                    function (data) {
                        $window.localStorage['userName'] = $scope.user.name;
                        $window.localStorage['sex'] = $scope.user.sex;
                        $scope.goToCenter();
                    },
                    function (data) {
                        console.log(data);
                    });
    	    }
    	}
        /*退出当前账户*/
    	$scope.exitCurrentUser = function () {
    	    var alertPopup = $ionicPopup.alert({
    	        title: '温馨提示',
    	        template: '确认退出当前账户？'
    	    });
    	    alertPopup.then(function (res) {
    	        $window.localStorage['loginState'] = 0;
                $window.localStorage['userID'] = 0;
                $window.localStorage['mobile'] = '';
                $window.localStorage['userName'] = '';
                $window.localStorage['userType'] = 0;
                $window.localStorage['sex'] = 0;
    	        /*关闭推送*/
                //jpushSvr.stopPush();

    	        $state.go('customerHome');
    	        console.log('退出当前用户');
    	    });
    	    
    	}
	}])