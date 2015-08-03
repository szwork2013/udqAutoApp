angular.module('udqApp')

	.service('loginSvr', ['$http', '$timeout', '$q', 'APP_CONFIG', function ($http, $timeout, $q, APP_CONFIG) {
	    var baseUrl = APP_CONFIG.server.getUrl();
	    
	    this.loginCheck = function (user) {
	        var url = baseUrl + 'fzmgr/login4App/login4App.do?userInfo=';

	        var data = {
	            username: user.userName,
	            psd: hex_md5(user.password)
	        };
	        var userJS = JSON.stringify(data);

	        var deferred = $q.defer();

	        $http.post(url, userJS).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("登录失败");
                });
	        return deferred.promise;

	    }
	}])
    