angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope','$ionicHistory','customerWashtypeSvr', function ($scope, $ionicHistory,customerWashtypeSvr) {
	    $scope.types = [];

	    $scope.updateWashTypes = function(){
	        customerWashtypeSvr.callWashType().then(
	    		function(data){
	    		    $scope.types = data.rows;
	    		    customerWashtypeSvr.setWashTypes($scope.types);
	    		}, 
	    		function(data){
	    			console.log(data);
	    		}
	    	);
	    }
	    $scope.updateWashTypes();

	    $scope.goBack = function () {
	        $ionicHistory.goBack();
	    }
	}])