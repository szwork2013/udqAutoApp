angular.module('udqApp')
	.controller('customerWashTypeNoteController', ['$scope', '$stateParams', '$state',  function ($scope, $stateParams, $state) {
        /*上一个页面传递过来的参数：washType -> 选择的服务类型*/
	    $scope.type = angular.fromJson($stateParams.washType);
	    $scope.orderInfo = angular.fromJson($stateParams.orderInfo);
	    $scope.lastPageName = $stateParams.lastPageName;

	    $scope.goBackOfWashTypeNote = function () {
            /*判断上个页面是洗车还是服务*/
	        if ($scope.lastPageName == "customerOrderMake") {
	            $state.go("customerOrderMake", { 'lastPage': 'customerWashTypeNote','orderInfo':JSON.stringify($scope.orderInfo) });
	        } else if ($scope.lastPageName == "customerWashTypeIntroduce") {
	            $state.go("customerWashTypeIntroduce");
	        } else {
	            console.log("传递'lasePageName'有误");
	        }
	    }
	}])