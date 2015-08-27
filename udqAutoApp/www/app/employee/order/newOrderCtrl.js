angular.module('udqApp')
   .controller('employeeNewOrderCtrl', ['$scope', '$window', '$state', '$ionicHistory', '$ionicPopup', 'employeeOrderSvr', function ($scope, $window, $state, $ionicHistory, $ionicPopup, employeeOrderSvr) {
       $scope.order = {
           state: 1,
           orgId: $window.localStorage['orgId']
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
       /*查看某条订单信息*/
       $scope.goToOrderInfo = function (order) {
           $state.go('employeeOrderInfo');
           employeeOrderSvr.setSelectedOrder(order);
           
       }
       /*接收订单*/
       $scope.acceptOrder = function (order) {
           employeeOrderSvr.acceptOrder(order).then(
                         function (data) {
                             if (data.isSuccess) {
                                 console.log("操作成功");
                                 $scope.doRefresh();
                             } else {
                                 console.log(data.msg);
                                 if (data.msg == "此订单已被接收") {
                                     showAlert('此订单已被接收');
                                 }
                             }
                         },
                         function (data) {
                           console.log(data.msg);
                         });
       }
       
       /*取消订单*/
       $scope.cancelOrder = function (order) {
           var confirmPopup = $ionicPopup.confirm({
               title: '提示信息',
               template: '确定取消此订单?'
           });
           confirmPopup.then(function (res) {
               if (res) {
                   employeeOrderSvr.cancelOrder(order).then(
                        function (data) {
                            if (data.isSuccess) {
                                console.log("取消订单成功");
                                $scope.doRefresh();
                            } else {
                                console.log(data.msg);
                            }
                        },
                function (data) {
                    console.log(data.msg);
                });
               } else {
                   console.log('You are not sure');
               }
           });
       };
       /*提示窗*/
       var showAlert = function (msg) {
           var alertPopup = $ionicPopup.alert({
               title: '温馨提示',
               template: msg
           });
           alertPopup.then(function (res) {
               console.log(msg);
           });
       };
   }])