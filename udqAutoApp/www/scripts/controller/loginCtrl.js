
/*
管理登录页面的控制，包括customer 登录 和  employee 的登录
根据不同的用户类型，跳转到不同的main页面
*/
angular.module('app.controller', []) 
    .controller('loginCtrl', ['$scope', '$state', '$ionicHistory', function ($scope, $state, $ionicHistory) {
        $scope.goToOrder = function () {
            $ionicHistory.clearHistory();
            $state.go('customer_main');
        };
    }])