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

		    /*
            post 的参数要使用data，而不是 params.这一点尤为重要，否则会出现乱码，因为params是追加到url后面，无法用到 utf-8编码。
            */
				$http({
				    method: 'post',
				    url: "http://localhost:8080/fzmgr/login4App/registUser.do",
				    /*headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },*/  /*这个设置已经在 app.js中设置过了，不用单独设置  */
				    data: { userInfo: JSON.stringify(data) } /* 必须使用 data 来传递参数 */
				}).success(function (data, status, headers, config) {
				    deferred.resolve(data);
				}).error(function (data, status, headers, config) {
				    deferred.reject(data);
				});

                /* 原来的代码
				$http.post(baseUrl+'fzmgr/login4App/registUser.do?userInfo='+jsStr).success(function(data, status, headers, config){
					deferred.resolve(data);
				}).error(function(data, status, headers, config){
					deferred.reject(data);
				});
                */

				return deferred.promise;/*返回承诺，这里并不是最终数据，而是访问最终数据的API*/
		}
	}])