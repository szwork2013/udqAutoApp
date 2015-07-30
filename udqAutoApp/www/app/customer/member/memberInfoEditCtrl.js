angular.module('udqApp')
	.controller('customerMemberInfoEditCtrl',['$scope',function($scope){
		$scope.saveMemberInfo = function(){
			
		};
		
	$scope.cityToRegion = function() {
		console.log($scope.city);
		$scope.regions = $scope.city.regions;
	}
	$scope.regionToDistrict=function(){
		console.log($scope.region);
		$scope.districts=$scope.region.districts;
	}
	}]);
