angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope','$state','$ionicHistory','customerWashtypeSvr', function ($scope,$state, $ionicHistory,customerWashtypeSvr) {
	    $scope.types = [];
        /*ѡ�е�ϴ���������������ID����*/
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
	        /*��ѡ�е�ϴ���������������ID�������õ�������ȥ������ԤԼϴ����ȡ�������*/
	        customerWashtypeSvr.setSelectedType($scope.selectedTypes, $scope.selectedTypeId);
	        $state.go('');
	        //$ionicHistory.goBack();
	    }
        /*ѡȡϴ������*/
	    $scope.selectwashTypes = function ($event,type) {
	        var checkbox = $event.target;
	        var index = $scope.selectedTypeId.indexOf(type.id);

            /*ѡ��״̬����֮ǰδ��ѡ�й�*/
	        if (checkbox.checked && index == -1) {
	            $scope.selectedTypes.push(type);
	            $scope.selectedTypeId.push(type.id);
	            
	        } else if (!checkbox.checked && index > -1) {
	            /*ȡ��ѡ��״̬����֮ǰѡ�й�*/
	            
	            $scope.selectedTypes.splice(index,1);
	            $scope.selectedTypeId.splice(index, 1);
	        }
	    }
	}])