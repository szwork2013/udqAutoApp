angular.module('udqApp')
   .controller('employeeOrderInfoCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr) {
       
       $scope.order = employeeOrderSvr.getOrder();

       $scope.goBack = function () {
           $ionicHistory.goBack();
       };
   }])