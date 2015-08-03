angular.module('udqApp')
    .controller('customerOrderShowCtrl', ['$scope', 'customerOrderSvr', function ($scope, customerOrderSvr) {
        $scope.orders = customerOrderSvr.getEvaluateOrders();
    }])