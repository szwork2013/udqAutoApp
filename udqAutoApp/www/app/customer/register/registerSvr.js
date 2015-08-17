angular.module('udqApp')
	.service('registerSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {
	    var baseUrl = APP_CONFIG.server.getUrl();
	    /*注册服务*/
	    this.register = function (user) {
	        var url = baseUrl + 'fzmgr/login/registUser4App.do';
	        var deferred = $q.defer();/*声明延后执行，表示要去监控后面的执行*/

	        var userInfo = {
	            name: user.userName,
	            mobile: user.mobile,
	            sex: user.sex,
	            id: 0
	        };

	        $http({
	            method: 'post',
	            url: url,
	            data: {
	                userInfo: JSON.stringify(userInfo)
	            }
	        }).success(function (data, status, headers, config) {
	            deferred.resolve(data);
	        }).error(function (data, status, headers, config) {
	            deferred.reject(data);
	        });

	        return deferred.promise;
	    }
	    /*调用短信服务*/
	    this.sendMSG = function (mobile) {
	        var url = baseUrl + 'fzmgr/login/sendVerifCode4App.do?mobile=' + mobile;
	        var deferred = $q.defer();
	        $http.post(url)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
	        return deferred.promise;
	    }
	}])