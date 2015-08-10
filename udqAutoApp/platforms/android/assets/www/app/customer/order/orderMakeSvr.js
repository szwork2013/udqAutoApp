angular.module('udqApp')
    .service('customerOrderMakeSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {

        var baseUrl = APP_CONFIG.server.getUrl();
        /*提交订单*/
        this.commitOrder = function (order) {
            /*var orderInfo = {
                washTypeId: order.washTypeId,
                couponId: order.couponId,
                fixedAmount: order.fixedAmount,
                userId: order.userId,
                autoId: order.id,
                regionId: order.regionId,
                orgId: order.orgId,
                userNote: order.userNote,
                orderTime:order.orderTime
            };*/
            var orderInfo = {
                washTypeIds: [1,2,3],
                couponIds: [],
                couponAmounts:[],
                fixedAmounts: [9.9,9.9,9.9],
                userId: 44,
                autoId: 25,
                regionId: 5,
                orgId: 10,
                userNote: 'good',
                orderTime: '2015.08.10 09:36'
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