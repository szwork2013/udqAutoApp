angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope','washtypeSvr', function($scope,washtypeSvr){
		$scope.types = [];
		var promise = washtypeSvr.getWashtype();
		promise.then(
			function (data, status, headers, config){
				$scope.types = data.data.ls;
			},
			function (data, status, headers, config){
				console.log("获取洗车类型失败");
			}
		);
	}])