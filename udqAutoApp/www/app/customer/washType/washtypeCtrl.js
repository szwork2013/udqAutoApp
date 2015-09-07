angular.module('udqApp')
	.controller('customerWashtypeCtrl', ['$scope', '$state', '$ionicHistory', 'customerWashtypeSvr', 'networkInfoSvr', function ($scope, $state, $ionicHistory, customerWashtypeSvr, networkInfoSvr) {
	    var showAlert = function (msg) {
	        var alertPopup = $ionicPopup.alert({
	            title: '��ܰ��ʾ',
	            template: msg
	        });
	        alertPopup.then(function (res) {
	            console.log(msg);
	        });
	    }
	    var networkInfo = networkInfoSvr.checkConnection();
	    if (networkInfo != undefined) {
	        showAlert(networkInfo);
	    }


	    $scope.types = [];
	    var promise = customerWashtypeSvr.callWashType();
	    promise.then(
            function (data) {
                $scope.types = data.rows;
            },
            function (data) {
                console.log(data);
            });
        /*������ϴ������*/
	    $scope.goBackOfWashType = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerOrderMake', { 'typeSelect': 'washTypeNote' });
	    }
	    /*��������ҳ*/
	    $scope.goBackOfMain = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerHome');
	    }
        /*washTypeNoteҳ����ʾ��Ϣ*/
	    $scope.type = customerWashtypeSvr.getWashType();
	}])