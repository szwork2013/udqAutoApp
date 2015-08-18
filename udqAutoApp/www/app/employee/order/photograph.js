angular.module('udqApp')
   .controller('employeephotographCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr) {
       var order = employeeOrderSvr.getSelectedOrder();

       $scope.goBack = function () {
           $ionicHistory.goBack();
       };
   }])