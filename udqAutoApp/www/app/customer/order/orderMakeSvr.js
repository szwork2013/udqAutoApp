angular.module('udqApp')
    .service('customerOrderMakeSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {

        var baseUrl = APP_CONFIG.server.getUrl();
        /*提交订单*/
        this.commitOrder = function (order) {
            var orderInfo = {
                washTypeIds: order.washTypeIds,
                couponIds: [],
                fixedAmounts: order.fixedAmounts,
                userId: order.userId,
                autoId: order.autoId,
                autoPosition:order.autoPosition,
                regionId: order.regionId,
                orgId: order.regionId,
                userNote: order.userNote,
                channel: order.channel,
                /*未支付的订单选择支付需要下面的参数*/
                orderNo: order.orderNo,
                finalAmount:order.finalAmount
            };

            url = baseUrl + 'order/submitOrder4App.do';

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