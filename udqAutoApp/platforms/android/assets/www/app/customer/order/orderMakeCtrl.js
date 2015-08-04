angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$state','$ionicHistory', 'customerWashtypeSvr', 'customerOrderMakeSvr', function ($scope, $state,$ionicHistory, customerWashtypeSvr, customerOrderMakeSvr) {
        $scope.order = {
            washTypeId: '',
            userId:'',
            autoId: '',
            regionId: '',
            orgId: '',/*洗车店，需要？*/
            userNote: '',/*用户订单备注*/
            orderTime: '',
            couponId: '',/*优惠券*/
            couponAmount: '',/*优惠券金额*/
            fixedAmount:''
        };
		$scope.goToWashType = function(){
			$state.go('customerWashtype');
		}
		$scope.goToAutoList = function () {
		    $state.go('customerAutoList');
		}
        /*提交订单*/
		$scope.commitOrder = function () {
		    customerOrderMakeSvr.commitOrder(order).then(
                function (data) {
                    //根据data内的数据判断时候成功
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