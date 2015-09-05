angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope', '$ionicHistory', 'customerWashtypeSvr', function ($scope, $ionicHistory, customerWashtypeSvr) {
	    $scope.types = [];
	    var promise = customerWashtypeSvr.callWashType();
	    promise.then(
            function (data) {
                $scope.types = data.rows;
            },
            function (data) {
                console.log(data);
            });
        /*������ϴ������*/
	    $scope.goBackOfWashType = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerWashtype', {'typeSelect':'washTypeNote'});
	    }
	    /*��������ҳ*/
	    $scope.goBackOfMain = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerMyDQ');
	    }
        /*washTypeNoteҳ����ʾ��Ϣ*/
	    $scope.type = customerWashtypeSvr.getWashType();
	}])