angular.module('udqApp')
	.service('customerWashtypeSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {
		var url = APP_CONFIG.server.getUrl() + 'fzmgr/washType/getWashTypeList4App.do';
	    var _defaultWashType = {};
	    var _washTypes = [];

	    this.setWashTypes = function(washTypes){
	        _washTypes = washTypes;
	        _defaultWashType = washTypes[0];
	    }

	    this.callWashType = function () {
	        var deferred = $q.defer();

            $http.get(url).success(function(data, status, headers, config) {
            	deferred.resolve(data);
            }).error(function(data, status, headers, config) {
            	deferred.reject('获取洗车类型失败');
            });

            return deferred.promise;
	    }
	}])