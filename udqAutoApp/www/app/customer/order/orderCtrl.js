/*
cutomer订单页面
新增订单
查看订单：未洗，已洗。
点击跳转到明细,pop出对话框，显示明细
*/

angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerOrderCtrl', ['$scope', '$ionicPopover', '$state', '$ionicHistory', '$window', '$ionicActionSheet', 'customerOrderSvr', function ($scope, $ionicPopover, $state, $ionicHistory, $window, $ionicActionSheet, customerOrderSvr) {

        $scope.selectOrder = customerOrderSvr.getSelectedOrder();
        $scope.noMoreOrderAvailable = true;

        var promise = customerOrderSvr.getOrdersList();
        promise.then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        $scope.orderList = data.rows;
                        $scope.hasNoOrder = false;
                        console.log("获取订单成功");
                    } else {
                        $scope.hasNoOrder = true;
                    }
                } else {
                    console.log(data.msg);
                }

            },
            function (data) {
                console.log(data);
            }
            );
        /*回跳到我的订单*/
        $scope.goBackOfMain = function () {
            $ionicHistory.clearHistory();
            $state.go('customerHome');
        }
        $scope.goBackOfOrderList = function () {
            $ionicHistory.clearHistory();
            $state.go('customerMyOrder');
        }

        $scope.moreDataCanBeLoaded = function () {
            customerOrderSvr.getOrdersList().then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        if (data.rows.length == $scope.orderList.length) {
                            for (var i = 0; i < data.rows.length; i++) {
                                if ($scope.orderList[i].state == data.rows[i].state) {
                                    return true;
                                }
                                if (i == $scope.orderList.length-1) {
                                    return false;
                                }
                            }
                        }else{
                            return true;
                        }
                    }else {
                        console.log(data.msg);
                        return false;
                    }
                }},
            function (data) {
                return false;
            }
            );
        }
        /*上拉更新*/
        $scope.updateOrders = function () {
            /**/
            customerOrderSvr.getOrdersList().then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        $scope.orderList = data.rows;
                        $scope.hasNoOrder = false;
                        console.log("获取订单成功");
                    } else {
                        $scope.hasNoOrder = true;
                        $scope.noMoreOrderAvailable = false;
                    }
                } else {
                    console.log(data.msg);
                }

            },
            function (data) {
                console.log(data);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        /*下拉刷新*/
        $scope.doRefresh = function () {
            customerOrderSvr.getOrdersList().then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        $scope.orderList = data.rows;
                        $scope.hasNoOrder = false;
                        console.log("获取订单成功");
                    } else {
                        $scope.hasNoOrder = true;
                    }
                } else {
                    console.log(data.msg);
                }

            },
            function (data) {
                console.log(data);
            });
            $scope.$broadcast('scroll.refreshComplete');
        }
        /*支付订单*/
        $scope.payOrder = function (order) {
            switch (order.payType) {
                case 1:
                    order.channel = 'alipay';
                    break;
                case 2:
                    order.channel = 'wx';
                    break;
                case 3:
                    order.channel = 'upacp';
                    break;
                default:
                    order.channel = 'alipay';
                    break;
            }
            $ionicHistory.clearHistory();
            $state.go('customerOrderpay', { 'order': angular.toJson(order), 'state': 'customerMyOrder' });
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
            $scope.selectOrder = order;
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
        /*订单列表-滑动-评价-跳转到订单信息*/
        $scope.judgeOrder = function (order) {
            $ionicHistory.clearHistory();
            $scope.goToSeeOrder(order);
        }
        /*订单信息-确定-评价订单*/
        $scope.judge = function (order) {
            customerOrderSvr.judgeOrder(order).then(
                function (data) {
                    if (data.isSuccess) {
                        console.log('评价成功');
                        $scope.selectOrder.state = 5;
                        $scope.selectOrder.customerGrade = order.gradeUser;
                        //customerOrderSvr.setSelectedOrder(order);
                        //$ionicHistory.clearHistory();
                        //$state.go('customerOrderMgr');
                    } else {
                        console.log(data.msg);
                    }
                },
                function (data) {
                    console.log(data);
                });
        }
        /*分享订单*/
        $scope.shareOrder = function () {
            $ionicActionSheet.show({
                buttons: [
                    { text: '分享至微信朋友圈' },
                    { text: '分享给微信好友' }
                ],
                titleText: '分享',
                cancelText: '取消',
                cancel: function () {
                    // 取消时执行
                },
                buttonClicked: function (index) {
                    if (index == 0) {
                        //title, desc, url, thumb
                            $scope.shareViaWechat();
                    }
                    if (index == 1) {
                            $scope.shareViaWechat();
                    }
                }

            })
        }
        $scope.shareViaWechat = function () {
            Wechat.isInstalled(function (installed) {
                alert("Wechat installed: " + (installed ? "Yes" : "No"));
            }, function (reason) {
                alert("Failed: " + reason);
            });
            var scope = "snsapi_userinfo";
            Wechat.auth(scope, function (response) {
                // you may use response.code to get the access token.
                alert(JSON.stringify(response));
            }, function (reason) {
                alert("Failed: " + reason);
            });
            Wechat.share({
                text: "This is just a test",
                scene: Wechat.Scene.TIMELINE   // share to Timeline
            }, function () {
                alert("Success");
            }, function (reason) {
                alert("Failed: " + reason);
            });
        }
        /*跳转到单个订单查看视图*/
        $scope.goToSeeOrder = function (order) {
            customerOrderSvr.setSelectedOrder(order);
            $ionicHistory.clearHistory();
            $state.go('customerOrderMgr');
        }

        $scope.selectOrder = customerOrderSvr.getSelectedOrder();

    }])