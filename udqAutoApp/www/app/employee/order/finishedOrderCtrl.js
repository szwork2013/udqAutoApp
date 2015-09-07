angular.module('udqApp')
   .controller('employeeFinishedOrderCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', 'networkInfoSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr, networkInfoSvr) {
       var showAlert = function (msg) {
           var alertPopup = $ionicPopup.alert({
               title: '温馨提示',
               template: msg
           });
           alertPopup.then(function (res) {
               console.log(msg);
           });
       }
       var networkInfo = networkInfoSvr.checkConnection();
       if (networkInfo != undefined) {
           showAlert(networkInfo);
       }


       $scope.order = {
           states: [4,5],
           washerId: $window.localStorage['userID']
       };
       var promise = employeeOrderSvr.getOrderByState($scope.order);
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