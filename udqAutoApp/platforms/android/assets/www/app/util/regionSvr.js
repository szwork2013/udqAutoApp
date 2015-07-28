angular.module('udqApp')
	.service('regionSvr',['$q',function($q){
		var cities = [];
		var doRequest = function(){
			var deferred = $q.defer();
			var url = 'http://192.168.1.102:8080/fzmgr/region/getRegion4App.do';
			$http.post(url).then(function(data, status, headers, config){
				deferred.resolve(data);
			}, function(data, status, headers, config){
				deferred.reject('there is an error.');
			});

		};
		return{
			/*注册服务*/
			getRegion:function(){
				var s = doRequest(userName,phoneNumber,password);
				return s;
			},
			setCities:function(citiesArray){
				cities = citiesArray;
			},
			getCities:function(){
				return cities;
			}

		}
	}])