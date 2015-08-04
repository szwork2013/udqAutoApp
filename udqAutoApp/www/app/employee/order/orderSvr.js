angular.module('udqApp')
    .service('employeeOrderSvr', ['$http', '$q', function ($http, $q) {
        var baseUrl = APP_CONFIG.server.getUrl();
        var doRequest = function (url,dataJS,msg) {
            var deferred = $q.defer();

            /*未传递参数*/
            if(dataJS==0){
                $http.get(url).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(msg);
                });
                return deferred.promise;
            }
            /*传递了参数*/
            $http.post(url, userJS).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(msg);
                });
            return deferred.promise;
        }
        /*查看待确认订单*/
        this.getWaitConfirmOrders=function(){
            var url = baseUrl+'';
            return doRequest(url,0,'获取待确认订单失败');
        }
        /*查看待洗车订单*/
        this.getWaitWashOrders = function () {
            var url = baseUrl + '';
            return doRequest(url, 0, '获取待洗车订单失败');
        }
        /*查看已完成订单*/
        this.getFinishedOrders = function () {
            var url = baseUrl + '';
            return doRequest(url, 0, '获取已完成订单失败');
        }
        /*接收待确认订单*/
        this.acceptWaitConfirmOrder = function (orderId) {
            /**/
            var url = baseUrl + '?orderId=' + orderId;
            return doRequest(url, 0, '接收待确认订单失败');
        }
        /*拒绝待确认订单*/
        this.rejectWaitConfirmOrder = function (orderId) {
            /**/
            var url = baseUrl + '?orderId=' + orderId;
            return doRequest(url, 0, '拒绝待确认订单失败');
        }
        /*反馈已完成订单*/
        this.feedBackFinishedOrder = function () {

        }
    }])