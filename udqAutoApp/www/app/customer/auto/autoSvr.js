angular.module('udqApp')
     .service('autoSvr', ['$http', '$window', '$q', 'APP_CONFIG', function ($http, $window, $q, APP_CONFIG) {
         var baseUrl = APP_CONFIG.server.getUrl();
         var _selectedDistrictId;
         var _selectedRegionId;
         var _selectedCityId;

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

         /*添加车辆*/
         this.addAutoItem = function (autosInfo) {

             /*转换成json格式*/
             var autoInfoJS = JSON.stringify(autosInfo);
             var url = baseUrl + 'fzmgr/auto/saveAuto4App.do';

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
             var url = baseUrl + 'fzmgr/auto/getAutoByUserId4App.do?userId=' + userId;


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
             var url = baseUrl + 'fzmgr/auto/deleteAuto4App.do?id=' + id;

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