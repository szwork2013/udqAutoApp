angular.module('udqApp')
     .service('autoSvr', ['$http', '$window', '$q', 'APP_CONFIG', function ($http, $window, $q, APP_CONFIG) {
         var baseUrl = APP_CONFIG.server.getUrl();
         var _autoInfo;
         var _defaultRegionId;
         var _backName;
         var _backParam;
         this.getBackParam = function () {
             return _backParam;
         }
         this.setBackParam = function (backParam) {
             _backParam = backParam;
         }
         this.getBackName = function () {
             return _backName;
         }
         this.setBackName = function (backName) {
             if (backName == 'customerAutoMgr' || backName == 'customerAutoList') {
                 _backName = backName;
             }
         }
         this.getAutoInfo = function () {
             return _autoInfo;
         }
         this.setAutoInfo = function (autoInfo) {
             _autoInfo = autoInfo;
             _autoInfo.selectedRegionPid = autoInfo.selectedCityId;
             _autoInfo.selectedDistrictPid = autoInfo.selectedRegionId;
         }
         /*添加车辆*/
         this.addAutoItem = function (autosInfo) {
             var auto = {
                 id: 0,
                 userId: autosInfo.userId,
                 pn: autosInfo.pn,
                 brand: autosInfo.brand,
                 model: autosInfo.model,
                 color: autosInfo.color,
                 defaultRegionId: autosInfo.selectedDistrictId,
                 position: autosInfo.position
             };
             /*转换成json格式*/
             var autoInfoJS = JSON.stringify(auto);
             var url = baseUrl + 'auto/saveAuto4App.do';

             var deferred = $q.defer();
             $http({
                 method: 'post',
                 url: url,
                 data: {autoInfo: autoInfoJS}
             }).success(

              function (data, status, headers, config) {
                  deferred.resolve(data);
              }).error(
              function (data, status, headers, config) {
                  deferred.reject("添加失败");
              });
             return deferred.promise;
         }
         /*获取用户下的所有汽车信息*/
         this.getAuto = function () {
             var userId = $window.localStorage['userID'];
             var url = baseUrl + 'auto/getAutoByUserId4App.do?userId=' + userId;


             var deferred = $q.defer();
             $http.get(url).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(function (data, status, headers, config) {
                     deferred.reject("获取失败");
                 });
             return deferred.promise;
         }
         /*删除一条车辆信息*/
         this.deleteAutoItem = function (id) {
             var url = baseUrl + 'auto/deleteAuto4App.do?id=' + id;

             var deferred = $q.defer();
             $http.post(url).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(function (data, status, headers, config) {
                     deferred.reject("删除失败");
                 });
             return deferred.promise;
         }

     }])