angular.module('udqApp')
    .controller('customerAutoInfoController', ['$scope', '$state', '$stateParams', '$ionicNavBarDelegate', function ($scope, $state, $stateParams, $ionicNavBarDelegate) {
        $scope.selectedAuto = angular.fromJson($stateParams.selectedAuto);
        $scope.goBackOfAutoInfo = function () {
            //$state.go('customerAutoMgr');
            $ionicNavBarDelegate.back();
        }
    }])