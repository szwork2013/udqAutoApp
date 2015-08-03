angular.module('udqApp')
	.service('registerSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {
		var baseUrl = APP_CONFIG.server.getUrl();
		/*注册服务*/
		this.register= function(userInfo){
			var deferred = $q.defer();/*声明延后执行，表示要去监控后面的执行*/

				var data= {
					   name:userInfo.userName,
					   mobile:userInfo.phoneNumber,
					   psd: hex_md5(userInfo.password),
					   id:0
					  };
				var jsStr = angular.toJson(data,false);
			
				$http.post(baseUrl+'fzmgr/login4App/registUser.do?userInfo='+jsStr).success(function(data, status, headers, config){
					deferred.resolve(data);
				}).error(function(data, status, headers, config){
					deferred.reject(data);
				});
				return deferred.promise;/*返回承诺，这里并不是最终数据，而是访问最终数据的API*/
		}
	}])