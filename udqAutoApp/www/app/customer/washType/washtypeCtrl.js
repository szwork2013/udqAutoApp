angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope', '$state', '$ionicHistory', 'customerWashtypeSvr', 'customerOrderSvr', function ($scope, $state, $ionicHistory, customerWashtypeSvr, customerOrderSvr) {
	    $scope.types = [];
	    var promise = customerWashtypeSvr.callWashType();
	    promise.then(
            function (data) {
                $scope.types = data.rows;
                $scope.types[0].imgUri = "image/circleImg/device.png";
                $scope.types[1].imgUri = "image/circleImg/device.png";
                $scope.types[2].imgUri = "image/circleImg/device.png";
            },
            function (data) {
                console.log(data);
            });

	    $scope.washtypeMethod = {
	        washtype1: {
	            name: "快洗",
	            imgUri: "image/circleImg/device.png"
	        },
	        washtype2: {
	            name: "内堂",
	            imgUri: "image/circleImg/device.png"
	        },
	        washtype3: {
	            name: "打蜡",
	            imgUri: "image/circleImg/device.png"
	        }
	    };
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
	        customerOrderSvr.setSelectedType(type);	        
	        $state.go("customerWashtypeNote", { 'typeSelect': 'goToWashTypeNote', 'backParam': 'washTypeIntroduce'});
	    }
	}])