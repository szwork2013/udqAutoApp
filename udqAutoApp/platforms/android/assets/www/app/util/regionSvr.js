angular.module('udqApp')
	.service('regionSvr',['$rootScope','$scope',function($rootScope,$scope){
		var doRequest = function(userName,phoneNumber,password){
			var url = 'http://192.168.1.102:8080/fzmgr/login4App/login4App.do?userName='+userName+'&phoneNumber='+phoneNumber+'&password='+password;
			$http.post(url);

		};
		return{
			/*注册服务*/
			register:function(userName,phoneNumber,password){
				var s = doRequest(userName,phoneNumber,password);
				return s;
			};
		}
	}])