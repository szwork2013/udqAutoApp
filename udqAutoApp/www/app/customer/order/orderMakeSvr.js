angular.module('udqApp')
    .service('customerOrderMakeSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {

        var baseUrl = APP_CONFIG.server.getUrl();
        /*提交订单*/
        this.commitOrder = function (order) {
            var orderInfo = {
                washTypeIds: order.washTypeId,
                couponIds: [],
                fixedAmounts: order.fixedAmount,
                userId: order.userId,
                autoId: order.autoId,
                regionId: order.regionId,
                orgId: order.regionId,
                userNote: order.userNote,
                channel:order.channel
            };

            url = baseUrl + 'fzmgr/order/submitOrder4App.do';

            var deferred = $q.defer();
            $http({
                url: url,
                method: 'post',
                data: {
                    orderInfo: JSON.stringify(orderInfo)
                }
            }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject('提交失败');
                });
            return deferred.promise;
        }
    }])