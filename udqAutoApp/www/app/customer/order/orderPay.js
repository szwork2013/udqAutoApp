angular.module('udqApp')
    .controller('customerOrderPayCtrl', ['$scope', '$window', '$ionicHistory','$stateParams', '$state', 'customerOrderMakeSvr', 'customerOrderSvr', 'customerMemberInfoSvr', 'popUpSvr', function ($scope, $window, $ionicHistory, $stateParams, $state, customerOrderMakeSvr, customerOrderSvr,customerMemberInfoSvr, popUpSvr) {
        var saveOrderPayInfo = function () {
            customerOrderSvr.setState(state);
            customerOrderSvr.setOrder($scope.order);
        }
        var getOrderPayInfo = function () {
            state = customerOrderSvr.getState();
            $scope.order = customerOrderSvr.getOrder();
        }
        var state;
        var orderParam = angular.fromJson($stateParams.order);/*洗车页面传递过来的订单信息*/
        var orderInfo = angular.fromJson($stateParams.orderInfo);
        if (orderParam == undefined) {//从充值页面返回时
            getOrderPayInfo();
        } else {//从洗车页面跳转到此页时
            state = $stateParams.state;/*前一个页面的state*/
            $scope.order = orderParam;
            if ($scope.order.channel == undefined) {
                $scope.order.channel = 'alipay';/*设置支付方式初始值：支付宝*/
            }
        }
        
        /*获取用户信息*/
        customerMemberInfoSvr.getUserInfo($window.localStorage['userID']).then(
            function (data) {
                if (data.isSuccess) {
                    $scope.user = data.data;
                } else {
                    console.log(data.msg);
                }
            },
            function (data) {
                console.log(data);
            });
        $scope.payMethod = {
            alipay: {
                name: "alipay",
                text: "支付宝",
                imgUri: "image/logo/64x64.png"
            },
            wx: {
                name: "wx",
                text: "微信支付",
                imgUri: "image/logo/icon64_appwx_logo.png"
            },
            udq: {
                name: "udq",
                text: "余额支付",
                imgUri: "image/logo/amount.png"
            }
        };

        $scope.disabled = false;
        /*提交订单*/
        $scope.commitOrder = function () {
            /*余额支付 余额不足时提示*/
            if ($scope.order.channel == "udq" && $scope.order.totalAmount > $scope.user.balance) {
                popUpSvr.confirmRecharge("您的余额不足，请充值或选择其他支付方式！").then(
                    function (res) {
                        if (res) {
                            saveOrderPayInfo();
                            $state.go('customerRecharge', { 'backParam': 'customerOrderpay' });
                        } else {
                            console.log('you are not sure');
                        }
                    });
                return
            }
            customerOrderMakeSvr.commitOrder($scope.order).then(
                 function (data) {
                     //根据data内的数据判断是否成功
                     if (data.isSuccess) {
                         $scope.disabled = false;
                         /*余额支付则不需要createPayment  payType==100 */
                         if (data.data.payType == 100) {
                             $scope.order = data.data;
                             customerOrderSvr.setSelectedOrder($scope.order);
                             $state.go('customerOrderMgr');
                         } else {
                             pingpp.createPayment(data.data.charge,
                             function (result) {
                                 /*支付成功*/
                                 $scope.order = data.data;
                                 $scope.order.state = 1;
                                 customerOrderSvr.setSelectedOrder($scope.order);
                                 $state.go('customerOrderMgr');
                             },
                         function (result) {
                             /*fail和cancel*/
                             $scope.disabled = false;
                             if (result == 'fail') {
                                 popUpSvr.showAlert('支付失败，请重试！');
                             } else if (result == 'cancel') {
                                 console.log('取消支付');
                             }
                         });
                         }
                     }
                 },
                 function (data) {
                     console.log(data);
                     return true;
                 });
            $scope.disabled = true;

        }
        /*回跳到前一个页面*/
        $scope.goBack = function () {
            if (state == "customerOrderMake") {
                $state.go("customerOrderMake", { 'lastPage': 'customerOrderpay', 'orderInfo': JSON.stringify(orderInfo) });
            } else if (state == "customerMyOrder") {
                $state.go("customerMyOrder");

            }
        }

        $scope.alertPopup = function () {
            $ionicPopup.alert({
                title: '错误',
                template: '支付失败，请重试！',
                okType: 'button-asertive'
            });
        }
            

    }])