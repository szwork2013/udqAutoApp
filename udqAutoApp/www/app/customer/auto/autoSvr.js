angular.module('udqApp')
     .service('autoSvr', ['$http', '$window', '$q', 'APP_CONFIG', function ($http, $window, $q, APP_CONFIG) {
         var baseUrl = APP_CONFIG.server.getUrl();
         /*添加车辆*/
         this.addAutoItem = function (autosInfo) {
             //var data = {
             //    pn: autoInfo.pn,
             //    brand: autoInfo.brand,
             //    color: autoInfo.color,
             //    userId: 2,
             //    model: autoInfo.model,
             //    id: 0,
             //    defaultRegionId: 4
             //};
             var autoInfo = {
                 brand: '奥迪',
                 color: '红色',
                 userId: 2,
                 model: 'SUV',
                 id: 0,
                 defaultRegionId: 4
             };
             /*转换成json格式*/
             //var autoInfoJS = JSON.stringify(data);
             var url = baseUrl + 'fzmgr/auto/saveAuto4App.do';

             var deferred = $q.defer();
             $http({
                 method: 'post',
                 url: url,
                 params: {
                     autoInfo: autoInfo
                 }
             }).success(

         //$http.post(url, autoInfoJS).success(
              function (data, status, headers, config) {
                  deferred.resolve(data);
              }).error(
              function (data, status, headers, config) {
                  deferred.reject("添加失败");
              });
             /*$http.post(url, { autoinfo:autoInfo}).success(
        function (data, status, headers, config) {
            deferred.resolve(data); 
        }).error(
        function (data, status, headers, config) {
            deferred.reject("添加失败");
        });*/
             return deferred.promise;
         }
         /*获取用户下的所有汽车信息*/
         this.getAuto = function (userId) {
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