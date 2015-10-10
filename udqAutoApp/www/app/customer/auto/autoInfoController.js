angular.module('udqApp')
    .controller('customerAutoInfoController', ['$scope', '$state', '$stateParams', function ($scope,$state, $stateParams) {
        $scope.selectedAuto = angular.fromJson($stateParams.selectedAuto);
        $scope.goBackOfAutoInfo = function () {
            $state.go('customerAutoMgr');
        }
    }])