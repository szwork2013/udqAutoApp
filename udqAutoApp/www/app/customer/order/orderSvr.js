angular.module('udqApp')
    .service('customerOrderSvr', ['$http', '$q','APP_CONFIG', function ($http, $q,APP_CONFIG) {
        var bathUrl = APP_CONFIG.server.getUrl();

        var _selectedTypes = [];
        var _selectedTypeId = [];
        var _pn = '';

        this.setType = function (types, typeId) {
            _selectedTypes = types;
            _selectedTypeId = typeId;
        }
        this.getTypes = function () {
            return _selectedTypes;
        }
        this.getTypeId = function () {
            return _selectedTypeId;
        }
        this.setAutoPN = function (pn) {
            _pn = pn;
        }
        this.getPN = function () {
            return _pn;
        }
        /*获取未确认订单*/
        this.getEvaluateOrders = function () {
            var url = bathUrl + '';

            var deferred = $q.defer();
            $http.get(url).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("获取未确认订单失败");
                });
        }
        /*获取已完成订单*/
        this.getFinishedeOrders = function () {
            var url = bathUrl + '';

            var deferred = $q.defer();
            $http.get(url).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("获取已完成订单失败");
                });
        }
        /*订单评价*/
        this.markOrder = function (orderId, mark) {
            /*?orderId=&mark=*/
            var url = bathUrl + '';

            var deferred = $q.defer();
            $http.post(url).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("提交评价失败");
                });
        }
    }])