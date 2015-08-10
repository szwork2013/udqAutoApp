/*
cutomer订单页面
新增订单
查看订单：未洗，已洗。
点击跳转到明细,pop出对话框，显示明细
*/

angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerOrderCtrl', ['$scope', '$ionicPopover', '$state', '$ionicHistory', '$window', 'customerOrderSvr', function ($scope, $ionicPopover, $state, $ionicHistory, $window, customerOrderSvr) {

        $scope.selectedOrder = customerOrderSvr.getSelectedOrder();
        /*回跳到主页*/
        $scope.goBackOfMain = function () {
            $state.go('customerHome');
        }
        
        var promise = customerOrderSvr.getOrdersList();
        promise.then(
            function (data) {
                $scope.orderList = data.rows;
                console.log("获取订单成功");
            },
            function (data) {
                console.log(data);
            }
            );

        /*下拉刷新*/
        $scope.doRefresh = function () {
            customerOrderSvr.getOrdersList().then(
            function (data) {
                $scope.orderList = data.rows;
                console.log("获取订单成功");
            },
            function (data) {
                console.log(data);
            });
            $scope.$broadcast('scroll.refreshComplete');
        }
        /*取消订单*/
        $scope.cancelOrder = function (order) {
            customerOrderSvr.cancelOrder(order).then(
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
        }
        /*查看订单*/
        $scope.scanOrder = function (order) {
            $scope.goToSeeOrder(order);
        }
        $scope.InitPopover = function (order) {
            $scope.selectedOrder = order;
            if (order.state == 4) {
                /*评价*/
                $ionicPopover.fromTemplateUrl('orderJudge.html', {
                    scope: $scope
                }).then(function (popover) {
                    $scope.popover = popover;
                });
            } else {
                /*查看*/
                $ionicPopover.fromTemplateUrl('orderShow.html', {
                    scope: $scope
                }).then(function (popover) {
                    $scope.popover = popover;
                });
            }
            
        }
        /*评价订单*/
        $scope.judgeOrder = function (order) {
            // .fromTemplateUrl() method
            
            
            /*弹出框获取评价框*/
            //order.gradeUser = 3;
            //customerOrderSvr.judgeOrder(order);
        }
        /*分享订单*/
        $scope.shareOrder = function (order) {

        }
        /*跳转到单个订单查看视图*/
        $scope.goToSeeOrder = function (order) {
            customerOrderSvr.setSelectedOrder(order);
            $state.go('customerOrderMgr');
        }
        
    }])