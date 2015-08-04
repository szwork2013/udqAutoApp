angular.module('udqApp')
	.controller('customerAutoMgrCtrl', ['$scope', 'autoSvr', '$state', '$ionicHistory', function ($scope, autoSvr, $state, $ionicHistory) {
	    $scope.autoItems = [];
	    var promise = autoSvr.getAuto();
	    promise.then(
            function (data) {
                $scope.autoItems = data.data.rows;
            },
            function (data) {
                alert(data);
            }
        );
	    $scope.delete = function (item) {

	        var promise = autoSvr.deleteAutoItem(item.id);
	        promise.then(
                function (data) {
                    if (data.data.isSuccess) {
                        $scope.autoItems.remove(item);
                    }
                },
                function (data) {
                    alert(data);
                }
            );
	    };
        /*Ìí¼Ó³µÁ¾*/
	    $scope.addAuto = function () {
	        $state.go('customerAutoAdd1');
	    };
	}]);
