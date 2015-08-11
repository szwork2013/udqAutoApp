angular.module('udqApp')
   .controller('employeeNewOrderCtrl', ['$scope', '$window', '$state', '$ionicHistory', '$ionicPopup', 'employeeOrderSvr', function ($scope, $window, $state, $ionicHistory, $ionicPopup, employeeOrderSvr) {
       $scope.orderInfo = {
       };
       var promise = employeeOrderSvr.getOrderByState(1);
       promise.then(
           function (data) {
               $scope.orderInfo = data.rows;
               console.log("数量：" + data.rows.length);
           }, function (data) {
               console.log(data);
           }
       );
       /*查看某条订单信息*/
       $scope.goToOrderInfo = function (order) {
           $state.go('employeeOrderInfo');
           employeeOrderSvr.saveOrderInfo(order);
           
       }
       /*接收订单*/
       $scope.acceptOrder = function (order) {
           var confirmPopup = $ionicPopup.confirm({
               title: '提示信息',
               template: '确定接收此订单?'
           });
           confirmPopup.then(function (res) {
               if (res) {
                   employeeOrderSvr.acceptOrder(order);
               } else {
                   console.log('You are not sure');
               }
           });
       };
       
       /*取消订单*/
       $scope.cancelOrder = function (order) {
           var confirmPopup = $ionicPopup.confirm({
               title: '提示信息',
               template: '确定取消此订单?'
           });
           confirmPopup.then(function (res) {
               if (res) {
                   employeeOrderSvr.cancelOrder(order);
               } else {
                   console.log('You are not sure');
               }
           });
       };
   }])