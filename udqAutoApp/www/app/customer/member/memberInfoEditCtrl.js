angular.module('udqApp')
	.controller('customerMemberInfoEditCtrl', ['$scope', '$window', '$stateParams', '$state', 'customerMemberInfoSvr', 'popUpSvr', function ($scope, $window,$stateParams, $state, customerMemberInfoSvr, popUpSvr) {
	    /*上一个页面传递过来的参数*/
	    $scope.user = angular.fromJson($stateParams.userInfo);

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
	    /*返回我的点趣*/
	    $scope.goToCenter = function () {
	        $state.go('customerMyDQ');
	    }
	}]);
