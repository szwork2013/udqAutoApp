angular.module('udqApp')
	.controller('employeeHomeCtrl', ['$scope', '$ionicHistory', '$state', function ($scope, $ionicHistory, $state) {
	    /*待确认*/
	    $scope.goToToBeConfirmed = function () {
	        $state.go('employeeOrderToBeConfirmed');
		};
		/*待洗车*/
		$scope.goToToBeWash = function(){

		};
		/*已完成*/
		$scope.goToDone = function(){

		};
	}]);
