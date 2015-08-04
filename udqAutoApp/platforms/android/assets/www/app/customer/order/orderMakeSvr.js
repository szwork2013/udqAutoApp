angular.module('udqApp')
    .service('customerOrderMakeSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {

        var url = APP_CONFIG.server.getUrl() + 'fzmgr/order/submitOrder4App.do?order=';

        this.commitOrder = function (order) {
            url = url + angular.toJson(order, false);
            var deferred = $q.defer();
            $http.post(url)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject('提交失败');
                });
            return deferred.promise;
        }
    }])