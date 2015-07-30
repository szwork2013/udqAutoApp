angular.module('udqApp')

	.service('loginSvr', ['$http','$timeout','APP_CONFIG', function($http,$timeout,APP_CONFIG){

	    var doRequest = function (userName, password) {
            
	        //return $http.post(APP_CONFIG.server.getUrl() + 'fzmgr/login4App/login4App.do', 
            //    {
	        //    'username': userName,
	        //    'password': hex_md5(password)
	        //    }
	        //);
	        return $http.post(APP_CONFIG.server.getUrl() + 'fzmgr/login4App/login4App.do?username=' + userName + '&password=' + hex_md5(password));

		}

		return {
		    loginCheck: function (userName, password) {
		        var s = doRequest(userName, password);
		        return s;
		    }
		}
	}])
    