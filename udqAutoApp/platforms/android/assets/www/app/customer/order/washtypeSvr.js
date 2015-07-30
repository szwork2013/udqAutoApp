angular.module('udqApp')
	.service('washtypeSvr', ['$http', 'APP_CONFIG',function($http,APP_CONFIG){
		return{
			getWashtype:function(){
				var url = APP_CONFIG.server.getUrl+'fzmgr/washType/getWashTypeList4App.do';
				return $http.get(url);
			}
		}
	}])