angular.module('udqApp')
    .controller('customerOrderPayCtrl', ['$scope', '$ionicHistory', '$ionicPopup', '$stateParams', '$state', 'customerOrderMakeSvr', 'customerOrderSvr', 'networkInfoSvr', function ($scope, $ionicHistory, $ionicPopup, $stateParams, $state, customerOrderMakeSvr, customerOrderSvr, networkInfoSvr) {
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
                         pingpp.createPayment(data.data.charge,
                             function (result) {
                                 /*支付成功*/
                                 customerOrderSvr.setSelectedOrder($scope.order);
                                 $ionicHistory.clearHistory();
                                 $state.go('customerOrderMgr');
                             },
                         function (result) {
                             /*fail和cancel*/
                             if (result == 'fail') {
                                 $scope.alertPopup();
                             } else if (result == 'cancel') {
                                 console.log('取消支付');
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

        $scope.alertPopup = function () {
            $ionicPopup.alert({
                title: '错误',
                template: '支付失败，请重试！',
                okType: 'button-asertive'
            });
        }
            

    }])