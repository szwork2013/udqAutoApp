angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope', '$state', '$ionicHistory', 'customerWashtypeSvr', 'customerOrderSvr', function ($scope, $state, $ionicHistory, customerWashtypeSvr, customerOrderSvr) {
	    $scope.types = [];
	    var promise = customerWashtypeSvr.callWashType();
	    promise.then(
            function (data) {
                $scope.types = data.rows;
                $scope.types[0].imgUri = "image/washType/washtype_1.png";
                $scope.types[1].imgUri = "image/washType/washtype_2.png";
                $scope.types[2].imgUri = "image/washType/washtype_3.png";
            },
            function (data) {
                console.log(data);
            });

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