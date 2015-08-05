/*
cutomer订单页面
新增订单
查看订单：未洗，已洗。
点击跳转到明细,pop出对话框，显示明细
*/

angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerOrderCtrl', ['$scope', '$state', '$ionicHistory','$window', 'customerOrderSvr', function ($scope, $state, $ionicHistory,$window, customerOrderSvr) {
        /*回跳到主页*/
        $scope.goBackOfMain = function () {
            $state.go('customerHome');
        }
        
        var promise = customerOrderSvr.getOrdersList($window.localStorage['userID']);
        promise.then(
            function (data) {
                $scope.orderList = data.rows;
            },
            function (data) {
                console.log(data);
            })
        
    }])