angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope', 'customerWashtypeSvr', function ($scope, customerWashtypeSvr) {
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
	}])