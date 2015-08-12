angular.module('udqApp')
   .controller('employeeOrderInfoCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr) {
       
       $scope.order = employeeOrderSvr.getSelectedOrder();

       $scope.goBack = function () {
           $ionicHistory.goBack();
       };
   }])