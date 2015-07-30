angular.module('udqApp')
    .service('autoSvr', ['$http', '$window', 'APP_CONFIG', function ($http, $window, APP_CONFIG) {
        var auto = [];
        return {
            getAutoInfo: function () {
                return auto;
            },
            /*获取用户下的所有汽车信息*/
            getAuto: function () {
                var url = APP_CONFIG.server.getUrl() + 'fzmgr/auto/getAutoByUserId4App.do';
                return $http.get(url);
            },
            /*删除一条车辆信息*/
            deleteAutoItem: function (id) {
                var url = APP_CONFIG.server.getUrl() + 'fzmgr/auto/deleteAuto4App.do?id=' + id;
                return $http.post(url);
            },
            addAutoItem: function (autoInfo) {
                var data = {
                    pn: autoInfo.pn,
                    brand: autoInfo.brand,
                    color: autoInfo.color,
                    userId:2,
                    model:autoInfo.model,
                    id: 0,
                    defaultRegionId:autoInfo.defaultRegionId
                };
                var jsStr = angular.toJson(data, false);
                var url = APP_CONFIG.server.getUrl() + 'fzmgr/auto/saveAuto4App.do?autoInfo=' + jsStr;
                return $http.post(url);
            }
        }
    }])