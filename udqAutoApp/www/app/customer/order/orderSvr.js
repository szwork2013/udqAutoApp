angular.module('udqApp')
     .service('customerOrderSvr', ['$http', '$q', '$window', 'APP_CONFIG', function ($http, $q, $window, APP_CONFIG) {
         var baseUrl = APP_CONFIG.server.getUrl();

         var _types;
         var _selectedAuto;
         var _selectedAutoId;
         var _selectedDistrictId;
         var _selectedRegionId;
         var _selectedCityId;
         var _selectOrgId;
         var _userNote;
         var _selectedType;
         var _selectedOrder = {};/*我的订单中当前选中的订单*/
         /*支付页面保存的参数*/
         var _state;
         var _order;
         var _ratingValue;

         //this.getRatingValue = function () {
         //    return _state;
         //}
         //this.setRatingValue = function (ratingValue) {
         //    _state = state;
         //}

         this.getState = function () {
             return _state;
         }
         this.setState = function (state) {
             _state = state;
         }

         this.getOrder = function () {
             return _order;
         }
         this.setOrder = function (order) {
             _order = order;
         }

         this.getSelectedAuto = function () {
             return _selectedAuto;
         }
         this.setSelectedAuto = function (auto) {
             _selectedAuto = auto;
         }

         this.getUserNote = function () {
             return _userNote;
         }
         this.setUserNote = function (note) {
             _userNote = note;
         }

         this.getSelectedOrgId = function () {
             return _selectOrgId;
         }
         this.setSelectedOrgId = function (id) {
             _selectOrgId = id;
         }
         this.getSelectedDistrictId = function () {
             return _selectedDistrictId;
         }
         this.setSelectedDistrictId = function (id) {
             _selectedDistrictId = id;
         }
         this.getSelectedRegionId = function () {
             return _selectedRegionId;
         }
         this.setSelectedRegionId = function (id) {
             _selectedRegionId = id;
         }
         this.getSelectedCityId = function () {
             return _selectedCityId;
         }
         this.setSelectedCityId = function (id) {
             _selectedCityId = id;
         }

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
         this.setSelectedOrder = function (order) {
             _selectedOrder = order;
             _selectedOrder.photoUrl1 = baseUrl + order.photoUrl1;
             _selectedOrder.photoUrl2 = baseUrl + order.photoUrl2;
             _selectedOrder.photoUrl3 = baseUrl + order.photoUrl3;
         }

         this.setType = function (types) {
             _types = types;
         }
         this.getTypes = function () {
             return _types;
         }

         this.getSelectedAutoId = function () {
             return _selectedAutoId;
         }
         this.setSelectedAutoId = function (autoId) {
             _selectedAutoId = autoId;
         }

         this.getSelectedType = function () {
             return _selectedType;
         }
         this.setSelectedType = function (type) {
             _selectedType = type;
         }
         /*获取所有订单*/
         this.getOrdersList = function (orderDate) {
             var userId = $window.localStorage['userID'];
             var url = baseUrl + 'order/getOrderByUserId4App.do?userId=' + userId+'&orderDate='+orderDate;

             var deferred = $q.defer();
             $http.get(url).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(
                 function (data, status, headers, config) {
                     deferred.reject("get order List failed");
                 });
             return deferred.promise;
         }
         /*获取未确认订单*/
         this.getEvaluateOrders = function () {
             var url = baseUrl + '';

             var deferred = $q.defer();
             $http.get(url).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(
                 function (data, status, headers, config) {
                     deferred.reject("获取未确认订单失败");
                 });
             return deferred.promise;
         }
         /*获取已完成订单*/
         this.getFinishedeOrders = function () {
             var url = baseUrl + '';

             var deferred = $q.defer();
             $http.get(url).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(
                 function (data, status, headers, config) {
                     deferred.reject("获取已完成订单失败");
                 });
             return deferred.promise;
         }
         /*取消订单*/
         this.cancelOrder = function (order) {
             var url = baseUrl + 'order/handleOrder4App.do';
             var orderInfo = {
                 userId: order.userId,
                 autoPN: order.autoPN,
                 orderNo: order.orderNo,
                 state: 10
             };

             var deferred = $q.defer();
             $http({
                 method: 'post',
                 url: url,
                 data: {
                     orderInfo: JSON.stringify(orderInfo)
                 }
             }).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(
                 function (data, status, headers, config) {
                     deferred.reject("取消订单失败");
                 });
             return deferred.promise;
         }
         /*订单评价*/
         this.judgeOrder = function (order) {
             var url = baseUrl + 'order/handleOrder4App.do';
             var orderInfo = {
                 orderNo: order.orderNo,
                 gradeUser: order.gradeUser,
                 gradeUserNote:order.gradeUserNote,
                 state: 5
             };
             var deferred = $q.defer();

             $http({
                 method: 'post',
                 url: url,
                 data: {
                     orderInfo: JSON.stringify(orderInfo)
                 }
             }).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(
                 function (data, status, headers, config) {
                     deferred.reject("评价订单失败");
                 });
             return deferred.promise;
         }
     }])