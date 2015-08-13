angular.module('udqApp')
   .controller('employeeFinishedOrderCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr) {
       $scope.orderInfo = {
       };
       var promise = employeeOrderSvr.getOrderByState(4,5);
       promise.then(
           function (data) {
               $scope.orderInfo = data.rows;
               console.log("数量：" + data.rows.length);
           }, function (data) {
               console.log(data);
           }
       );
       /*下拉刷新*/
       $scope.doRefresh = function () {
           employeeOrderSvr.getOrderByState(4).then(
           function (data) {
               $scope.orderInfo = data.rows;
               console.log("获取订单成功");
           },
           function (data) {
               console.log(data);
           });
           $scope.$broadcast('scroll.refreshComplete');
       }
       /*按钮-查看某条订单信息*/
       $scope.goToOrderInfo = function (order) {
           $state.go('employeeOrderInfo');
           employeeOrderSvr.setSelectedOrder(order);

       }
   }])