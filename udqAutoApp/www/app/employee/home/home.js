angular.module('udqApp')
	.controller('employeeHomeCtrl', ['$scope', '$ionicHistory', '$state', 'networkInfoSvr', function ($scope, $ionicHistory, $state, networkInfoSvr) {
	    var showAlert = function (msg) {
	        var alertPopup = $ionicPopup.alert({
	            title: '温馨提示',
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


	    /*待确认*/
	    $scope.goToToBeConfirmed = function () {
	        $state.go('employeeOrderToBeConfirmed');
		};
		/*待洗车*/
		$scope.goToToBeWash = function(){

		};
		/*已完成*/
		$scope.goToDone = function(){

		};
	}]);
