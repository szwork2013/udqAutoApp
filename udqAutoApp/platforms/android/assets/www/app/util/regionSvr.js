angular.module('udqApp')
	.service('regionSvr',['$rootScope','$scope',function($rootScope,$scope){
		var doRequest = function(){
			$http.post('http://192.168.1.102:8080/fzmgr/login4App/login4App.do');

		};
		return{
			/*注册服务*/
			register:function(userName,phoneNumber,password){
				var s = doRequest();
				return s;
			};
		}
	}])