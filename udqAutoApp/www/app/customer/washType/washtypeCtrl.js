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
        /*����*/
	    $scope.goBack = function () {
	        $ionicHistory.goBack();
	    }
        /*washTypeNoteҳ����ʾ��Ϣ*/
	    $scope.type = customerWashtypeSvr.getWashType();
	}])