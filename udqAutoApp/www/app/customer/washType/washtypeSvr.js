angular.module('udqApp')
 	.service('customerWashtypeSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {
 	    var url = APP_CONFIG.server.getUrl() + 'washType/getWashTypeList4App.do';
 	    var _washtype = {};
 	    this.setWashType = function (washtype) {
 	        _washtype = washtype;
 	    }
 	    this.getWashType = function () {
 	        return _washtype;
 	    }
 	    this.callWashType = function () {
 	        var deferred = $q.defer();

 	        $http.get(url).success(function (data, status, headers, config) {
 	            deferred.resolve(data);
 	        }).error(function (data, status, headers, config) {
 	            deferred.reject('获取洗车类型失败');
 	        });

 	        return deferred.promise;
 	    }
 	}])