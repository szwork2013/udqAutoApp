angular.module('udqApp')
   .controller('employeeFinishedOrderCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', 'LoadingSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr, LoadingSvr) {

       $scope.order = {
           states: [4,5],
           washerId: $window.localStorage['userID']
       };
       LoadingSvr.show();
       var promise = employeeOrderSvr.getOrderByState($scope.order);
       promise.then(
           function (data) {
               LoadingSvr.hide();
               $scope.orderInfo = data.rows;
               console.log("数量：" + data.rows.length);
           }, function (data) {
               console.log(data);
           }
       );
       /*下拉刷新*/
       $scope.doRefresh = function () {
           employeeOrderSvr.getOrderByState($scope.order).then(
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