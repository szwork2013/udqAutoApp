angular.module('udqApp')
	.controller('customerMemberInfoEditCtrl', ['$scope', '$window', '$stateParams', '$state', 'customerMemberInfoSvr', 'popUpSvr', function ($scope, $window,$stateParams, $state, customerMemberInfoSvr, popUpSvr) {
	    /*��һ��ҳ�洫�ݹ����Ĳ���*/
	    $scope.user = angular.fromJson($stateParams.userInfo);

	    /*�༭-����*/
	    $scope.saveMemberInfo = function () {
	        /*�жϵ绰�����Ƿ�Ϸ�*/
	        if (!checkMobile($scope.user.mobile)) {
	            popUpSvr.showAlert('������11λ���֣���1��ͷ');
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
	    /*У�������Ƿ��ǺϷ��ĵ绰����*/
	    var checkMobile = function (mobile) {
	        var re = /^1\d{10}$/;
	        if (re.test(mobile)) {
	            return true;
	        } else {
	            return false;
	        }
	    }
	    /*�����ҵĵ�Ȥ*/
	    $scope.goToCenter = function () {
	        $state.go('customerMyDQ');
	    }
	}]);
