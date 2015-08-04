angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope','$state','$ionicHistory','customerWashtypeSvr', function ($scope,$state, $ionicHistory,customerWashtypeSvr) {
	    $scope.types = [];
        /*选中的洗车类型数组和类型ID数组*/
	    $scope.selectedTypes = [];
	    $scope.selectedTypeId = [];

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
	        /*将选中的洗车类型数组和类型ID数组设置到服务中去，方便预约洗车获取相关数据*/
	        customerWashtypeSvr.setSelectedType($scope.selectedTypes, $scope.selectedTypeId);
	        $state.go('');
	        //$ionicHistory.goBack();
	    }
        /*选取洗车类型*/
	    $scope.selectwashTypes = function ($event,type) {
	        var checkbox = $event.target;
	        var index = $scope.selectedTypeId.indexOf(type.id);

            /*选中状态并且之前未被选中过*/
	        if (checkbox.checked && index == -1) {
	            $scope.selectedTypes.push(type);
	            $scope.selectedTypeId.push(type.id);
	            
	        } else if (!checkbox.checked && index > -1) {
	            /*取消选中状态并且之前选中过*/
	            
	            $scope.selectedTypes.splice(index,1);
	            $scope.selectedTypeId.splice(index, 1);
	        }
	    }
	}])