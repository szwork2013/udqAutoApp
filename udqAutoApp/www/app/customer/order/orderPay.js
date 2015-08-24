angular.module('udqApp')
    .controller('customerOrderPayCtrl', ['$scope', '$stateParams','$state', 'customerOrderMakeSvr', function ($scope, $stateParams,$state, customerOrderMakeSvr) {
        
        var orderParam = angular.fromJson($stateParams.order);/*传递过来的订单信息*/
        var state = $stateParams.state;/*前一个页面的state*/
        $scope.order = orderParam;
        if ($scope.order.channel == undefined) {
            $scope.order.channel = 'alipay';/*设置支付方式初始值：支付宝*/
        }
        /*提交订单*/
        $scope.commitOrder = function () {
            customerOrderMakeSvr.commitOrder($scope.order).then(
                 function (data) {
                     //根据data内的数据判断时候成功
                     if (data.isSuccess) {
                         console.log('提交成功');
                         pingpp.createPayment(JSON.stringify(data.data.charge), function (result, error) {
                             if (result == "success") {
                                 // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                                 /*从data中获取新添加的order*/
                                 customerOrderSvr.setSelectedOrder(order);
                                 $state.go('customerOrderMgr');
                             } else if (result == "fail") {
                                 // charge 不正确或者微信公众账号支付失败时会在此处返回

                             } else if (result == "cancel") {
                                 // 微信公众账号支付取消支付
                             }
                         });
                     }
                 },
                 function (data) {
                     console.log(data);
                     return true;
                 });

        }
        /*回跳到前一个页面*/
        $scope.goBack = function () {
            $state.go(state, { 'typeSelect': 'payOrderReturn' });
        }

    }])