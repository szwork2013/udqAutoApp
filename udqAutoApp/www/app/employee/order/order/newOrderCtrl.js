angular.module('udqApp')
   .controller('employeeNewOrderCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr) {
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
           var promise = employeeOrderSvr.acceptOrder(order);
           promise.then(
               function (data) {
                   console.log(data.msg);
               }, function (data) {
                   console.log(data);
               });
       };
       /*取消订单*/
       $scope.cancelOrder = function (order) {
           var promise = employeeOrderSvr.cancelOrder(order);
           promise.then(
               function (data) {
                   console.log(data.msg);
               }, function (data) {
                   console.log(data);
               });
       };
   }])