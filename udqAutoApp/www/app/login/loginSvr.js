angular.module('udqApp')

	.service('loginSvr', ['$http', '$timeout', '$q', 'APP_CONFIG', function ($http, $timeout, $q, APP_CONFIG) {
	    var baseUrl = APP_CONFIG.server.getUrl();
	    
	    this.loginCheck = function (user) {
	        var url = baseUrl + 'fzmgr/login/login4App.do';
	        var userInfo = {
	            mobile: user.mobile,
	        };
	        var userInfoJS = JSON.stringify(userInfo);

	        var deferred = $q.defer();
	        //$http.post(url, { userInfo: userInfoJS })
	        $http({
	            method: 'post',
	            url: url,
	            data: {
                    userInfo:userInfoJS
	            }
	        }).success(
                function (data, status, headers, config) {

                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject("登录失败");
                });
	        return deferred.promise;

	    }
	}])
    