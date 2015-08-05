angular.module('udqApp')
	.controller('customerAutoMgrCtrl', ['$scope', '$state', '$ionicHistory', 'autoSvr', function ($scope, $state, $ionicHistory, autoSvr) {

	    var promise = autoSvr.getAuto(2);
	    promise.then(
            function (data) {
                $scope.autoInfo = data.rows;
            },
            function (data) {
                alert(data);
            }
        );
        /*É¾³ý³µÁ¾*/
	    $scope.deleteAuto = function (item) {

	        var promise = autoSvr.deleteAutoItem(item.id);
	        promise.then(
                function (data) {
                    if (data.isSuccess) {
                        $scope.autoInfo.remove(item);
                    }
                },
                function (data) {
                    alert(data);
                }
            );
	    };
        /*Ìí¼Ó³µÁ¾*/
	    $scope.goToAddauto = function () {
	        $state.go('customerAutoAdd');
	    };
	    $scope.goBack = function () {
	        $ionicHistory.goBack(); 
	    }
	}]);
