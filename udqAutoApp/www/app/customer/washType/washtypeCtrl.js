angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope', '$state', '$ionicHistory', 'customerWashtypeSvr', 'customerOrderSvr', function ($scope, $state, $ionicHistory, customerWashtypeSvr, customerOrderSvr) {
	    $scope.types = [];
	    var promise = customerWashtypeSvr.callWashType();
	    promise.then(
            function (data) {
                $scope.types = data.rows;
            },
            function (data) {
                console.log(data);
            });
        /*回跳到洗车服务*/
	    $scope.goBackOfWashType = function () {	        
	        $state.go('customerOrderMake', { 'typeSelect': 'washTypeNote' });
	    }
	    /*回跳到主页*/
	    $scope.goBackOfMain = function () {	        
	        $state.go('customerHome');
	    }
	    /*跳转到洗车类型服务详情*/
	    $scope.goToTypeNote = function (type) {
	        //customerOrderSvr.setSelectedType(type);	        
	        //$state.go("customerWashtypeNote", { 'typeSelect': 'goToWashTypeNote', 'backParam': 'washTypeIntroduce' });
	        $state.go("customerWashTypeNote", { 'lastPageName': 'customerWashTypeIntroduce', 'washType': JSON.stringify(type),'orderInfo':'' });
	    }
	}])