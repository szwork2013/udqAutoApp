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
	            name: "��ϴ",
	            imgUri: "image/circleImg/device.png"
	        },
	        washtype2: {
	            name: "����",
	            imgUri: "image/circleImg/device.png"
	        },
	        washtype3: {
	            name: "����",
	            imgUri: "image/circleImg/device.png"
	        }
	    };
        /*������ϴ������*/
	    $scope.goBackOfWashType = function () {	        
	        $state.go('customerOrderMake', { 'typeSelect': 'washTypeNote' });
	    }
	    /*��������ҳ*/
	    $scope.goBackOfMain = function () {	        
	        $state.go('customerHome');
	    }
	    /*��ת��ϴ�����ͷ�������*/
	    $scope.goToTypeNote = function (type) {
	        customerOrderSvr.setSelectedType(type);	        
	        $state.go("customerWashtypeNote", { 'typeSelect': 'goToWashTypeNote', 'backParam': 'washTypeIntroduce'});
	    }
	}])