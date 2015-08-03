angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$state','$ionicHistory', 'customerWashtypeSvr', 'customerOrderMakeSvr', function ($scope, $state,$ionicHistory, customerWashtypeSvr, customerOrderMakeSvr) {
        $scope.order = {
            washTypeId: '',
            userId:'',
            autoId: '',
            regionId: '',
            orgId: '',/*ϴ���꣬��Ҫ��*/
            userNote: '',/*�û�������ע*/
            orderTime: '',
            couponId: '',/*�Ż�ȯ*/
            couponAmount: '',/*�Ż�ȯ���*/
            fixedAmount:''
        };
		$scope.goToWashType = function(){
			$state.go('customerWashtype');
		}
		$scope.goToAutoList = function () {
		    $state.go('customerAutoList');
		}
        /*�ύ����*/
		$scope.commitOrder = function () {
		    customerOrderMakeSvr.commitOrder(order).then(
                function (data) {
                    //����data�ڵ������ж�ʱ��ɹ�
                },
                function (data) {
                    console.log(data);
                });
		}

		$scope.defaultWashType = {};
		$scope.myAuto = {};

		$scope.updateDefaultWashType = function () {
		    customerWashtypeSvr.callWashType().then(
		    	function(data){
		    		$scope.defaultWashType = data.rows[0];
		    		customerWashtypeSvr.setWashTypes(data.rows);
		    	},function(data){
		    		console.log(data);
		    	}
		    );
		}

		$scope.updateDefaultWashType();

		$scope.goBack = function () {
		    $ionicHistory.goBack();
		}
	}])