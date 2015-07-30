angular.module('udqApp')
.controller('customerOrderMakeCtrl', ['$scope', '$state', function ($scope, $state) {
		$scope.goToWashType = function(){
			$state.go('customerWashtype');
		};
		$scope.goToAutoList = function(){
			$state.go('customerAutoList');
		}
	}])