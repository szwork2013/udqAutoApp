angular.module('udqApp')
    .controller('customerRegionSelectCtrl', ['$scope', '$ionicHistory', 'regionSvr', function ($scope, $ionicHistory, regionSvr) {

        $scope.districts = regionSvr.getDistricts();

        $scope.goBack = function(){
            $ionicHistory.goBack();
        }
    }])