angular.module('udqApp')
    .service('employeeOrderSvr', ['$http', '$window', '$q', 'APP_CONFIG', function ($http, $window, $q, APP_CONFIG) {
        var baseUrl = APP_CONFIG.server.getUrl();
        var _order = {};
        
        /*根据state获取订单信息*/
        this.getOrderByState = function (state) {
            var url = baseUrl + 'fzmgr/order/getOrderByState4App.do?state=' + state;

            var deferred = $q.defer();
            $http.get(url).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject("获取失败");
                });
            return deferred.promise;
        }
        /*接收订单*/
        this.acceptOrder = function (order) {
            var data = {
                orderNo: order.orderNo,
                washerId: 12,
                state: 2
            };
            /*转换成json格式*/
            var orderInfoJS = JSON.stringify(data);
            var url = baseUrl + 'fzmgr/order/handleOrder4App.do';

            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: {
                    orderInfo: orderInfoJS
                }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("失败");
                });
            return deferred.promise;
        }
        /*取消订单*/
        this.cancelOrder = function (order) {
            var data = {
                orderNo: order.orderNo,
                state: 11
            };
            var orderInfoJS = JSON.stringify(data);
            var url = baseUrl + 'fzmgr/order/handleOrder4App.do?orderInfo=';

            var deferred = $q.defer();
            $http.post(url, orderInfoJS).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("失败");
                });
            return deferred.promise;
        }
        /*完成订单*/
        this.finishOrder = function (order) {
            var data = {
                orderNo: order.orderNo,
                state: 4
            };
            var orderInfoJS = JSON.stringify(data);
            var url = baseUrl + 'fzmgr/order/handleOrder4App.do?orderInfo=';

            var deferred = $q.defer();
            $http.post(url, orderInfoJS).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("失败");
                });
            return deferred.promise;
        }
        this.getOrder = function ()
        {
            return _order;
        }
        /*查看某条订单时先保存到此*/
        this.saveOrderInfo = function (order) {
            _order = order;
        }
    }])