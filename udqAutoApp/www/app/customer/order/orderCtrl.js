/*
cutomer订单页面
新增订单
查看订单：未洗，已洗。
点击跳转到明细,pop出对话框，显示明细
*/

angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerOrderCtrl', ['$scope', '$ionicPopover', '$state', '$ionicHistory', '$stateParams', '$window', '$ionicActionSheet', 'customerOrderSvr', 'employeeOrderSvr', 'LoadingSvr', function ($scope, $ionicPopover, $state, $ionicHistory, $stateParams, $window, $ionicActionSheet, customerOrderSvr, employeeOrderSvr, LoadingSvr) {
        /*回跳到我的订单*/
        $scope.goBackOfMain = function () {
            $state.go('customerHome');
        }

    }])