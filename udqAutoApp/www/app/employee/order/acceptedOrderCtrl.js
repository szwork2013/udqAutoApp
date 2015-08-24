angular.module('udqApp')
   .controller('employeeAcceptedOrderCtrl', ['$scope', '$window', '$state', '$ionicHistory','$ionicPopup', 'employeeOrderSvr', function ($scope, $window, $state, $ionicHistory,$ionicPopup, employeeOrderSvr) {
       $scope.order = {
           states: [2,3],
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
       /*查看某条订单信息*/
       $scope.goToOrderInfo = function (order) {
           $state.go('employeeOrderInfo');
           employeeOrderSvr.setSelectedOrder(order);
       }
       /*完成-跳转*/
       $scope.gotoPhotograph = function (order) {
           $state.go('employeePhotograph');
           employeeOrderSvr.setSelectedOrder(order);
           $scope.doRefresh();
       }
       ///*完成订单*/
       //$scope.finishOrder = function (order) {
       //    var confirmPopup = $ionicPopup.confirm({
       //        title: '提示信息',
       //        template: '确定已完成此订单?'
       //    });
       //    confirmPopup.then(function (res) {
       //        if (res) {
       //            employeeOrderSvr.finishOrder(order).then(
       //                function (data) {
       //                    if (data.isSuccess) {
       //                        console.log("操作成功");
       //                        $scope.doRefresh();
       //                    } else {
       //                        console.log(data.msg);
       //                    }
       //                },
       //              function (data) {
       //                  console.log(data.msg);
       //            });
       //        } else {
       //            console.log('You are not sure');
       //        }
       //    });
       //};
   }])