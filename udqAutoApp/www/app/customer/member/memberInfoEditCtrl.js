angular.module('udqApp')
	.controller('customerMemberInfoEditCtrl', ['$scope', 'networkInfoSvr', function ($scope, networkInfoSvr) {
	    $scope.saveMemberInfo = function () {

	    };



	    var showAlert = function (msg) {
	        var alertPopup = $ionicPopup.alert({
	            title: 'Œ¬‹∞Ã· æ',
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
	    $scope.cityToRegion = function () {
	        console.log($scope.city);
	        $scope.regions = $scope.city.regions;
	    }
	    $scope.regionToDistrict = function () {
	        console.log($scope.region);
	        $scope.districts = $scope.region.districts;
	    }
	}]);
