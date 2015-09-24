angular.module('udqApp')
    .controller('customerRechargeCtrl', ['$scope', '$window', '$ionicHistory', '$stateParams', '$state', 'customerMemberInfoSvr', 'popUpSvr', function ($scope, $window, $ionicHistory,$stateParams, $state, customerMemberInfoSvr, popUpSvr) {
        var backParam = $stateParams.backParam;
        $scope.balance = {
            userId: $window.localStorage['userID'],
            channel: '',
            amount: 0.01
        }
        if ($scope.balance.channel == undefined || $scope.balance.channel == "") {
            $scope.balance.channel = 'alipay';/*设置支付方式初始值：支付宝*/
        }

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
            }
        };
        $scope.disabled = false;
        /*充值*/
        $scope.recharge = function () {
            customerMemberInfoSvr.recharge($scope.balance).then(
                 function (data) {
                     //根据data内的数据判断时候成功
                     if (data.isSuccess) {
                         pingpp.createPayment(data.data,
                             function (result) {
                                 /*支付成功*/
                                // $scope.balance = data.data;                                 
                                 $state.go(backParam);
                             },
                         function (result) {
                             /*fail和cancel*/
                             if (result == 'fail') {
                                 popUpSvr.showAlert('支付失败，请重试！');
                             } else if (result == 'cancel') {
                                 console.log('未充值');
                             }
                         });
                     }
                 },
                 function (data) {
                     console.log(data);
                     return true;
                 });
            //$scope.disabled = true;

        }
        /*回跳到前一个页面*/
        $scope.goBack = function () {

            $state.go(backParam);
        }
    }])