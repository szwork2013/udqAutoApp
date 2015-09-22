angular.module('udqApp')
    .service('employeeOrderSvr', ['$http', '$window', '$q', 'APP_CONFIG', function ($http, $window, $q, APP_CONFIG) {
        var baseUrl = APP_CONFIG.server.getUrl();
        var _selectedOrder;
        var _src;
        var _imgUrlInfo;
        
        this.getSelectedOrder = function () {
            if (_selectedOrder.photoUrl1 == baseUrl) {
                _selectedOrder.photoUrl1 = "image/break.png";
            }
            if (_selectedOrder.photoUrl2 == baseUrl) {
                _selectedOrder.photoUrl2 = "image/break.png";
            }
            if (_selectedOrder.photoUrl3 == baseUrl) {
                _selectedOrder.photoUrl3 = "image/break.png";
            }
            return _selectedOrder;
        }
        /*从数据库中取的photoUrl需要做处理*/
        this.setSelectedOrder = function (order) {
            _selectedOrder = order;
            if (order.state == 4 || order.state == 5) {
                _selectedOrder.photoUrl1 = baseUrl + order.photoUrl1;
                _selectedOrder.photoUrl2 = baseUrl + order.photoUrl2;
                _selectedOrder.photoUrl3 = baseUrl + order.photoUrl3;
            }
        }
        this.getImgSrc = function () {
            return _src;
        }
        this.setImgSrc = function (src) {
            _src = src;
        }
        ///*拍照后未经后台处理的photoUrl临时放到order中*/
        //this.setImgUrlInfo = function (order) {
        //    _imgUrlInfo = order;
        //}
        //this.getImgUrlInfo = function () {
        //    return _imgUrlInfo;
        //}
        /*删除照片*/
        this.deletePhoto = function (orderNo, No) {
            //var data = {
            //    orderNo: orderNo,
            //    photoUrl: 'photoUrl'+No
            //};
            //var orderInfoJS = JSON.stringify(data);
            var url = baseUrl + 'order/deletePhoto4App.do?orderNo='+orderNo+'&No='+No;

            var deferred = $q.defer();
            $http.post(url).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("失败");
                });
            return deferred.promise;
        }
        /*根据state获取订单信息*/
        this.getOrderByState = function (order) {
            var orderInfoJS = JSON.stringify(order);
            var url = baseUrl + 'order/getOrderByState4App.do';

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
                }).error(function (data, status, headers, config) {
                    deferred.reject("获取失败");
                });
            return deferred.promise;
        }
        /*接收订单*/
        this.acceptOrder = function (order) {
            var data = {
                orderNo: order.orderNo,
                washerId: $window.localStorage['userID'],
                state: 2
            };
            /*转换成json格式*/
            var orderInfoJS = JSON.stringify(data);
            var url = baseUrl + 'order/handleOrder4App.do';

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
                userId: order.userId,
                autoPN: order.autoPN,
                orderNo: order.orderNo,
                state: 11
            };
            var orderInfoJS = JSON.stringify(data);
            var url = baseUrl + 'order/handleOrder4App.do';

            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { orderInfo: orderInfoJS }
            }).success(
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
                userId: order.userId,
                autoPN: order.autoPN,
                orderNo: order.orderNo,
                washerNote: order.washerNote,
                state: 4
            };
            var orderInfoJS = JSON.stringify(data);
            var url = baseUrl + 'order/handleOrder4App.do';

            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { orderInfo: orderInfoJS }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("失败");
                });
            return deferred.promise;
        }
    }])