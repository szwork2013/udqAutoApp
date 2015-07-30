angular.module('udqApp')

	.service('loginSvr', ['$http','$timeout','APP_CONFIG', function($http,$timeout,APP_CONFIG){

	    var doRequest = function (userName, password) {
	        try
	        {
	            //return $http.post(APP_CONFIG.server.getUrl() + 'fzmgr/login4App/login4App.do', { 'userName': '123', 'password': '3333' });
	            return $http.post(APP_CONFIG.server.getUrl() + 'fzmgr/login4App/login4App.do?username=' + userName + '&password=' + hex_md5(password));
	        } catch (e) {
	            alert(e);
	        }
	        //

	        
		    //return $http.post('http://192.168.1.102:8080/fzmgr/login4App/login4App.do', {username:userName,password:password} );
		   // var url = 'http://192.168.1.101:8080/fzmgr/login4App/login4App.do?username=' + username + '&password=' + password + '&callback=JSON_CALLBACK';
		   // return $http.jsonp(url);
		}

		return {
		    loginCheck: function (userName, password) {
		        var s = doRequest(userName, password);
		        return s;
		    }
		}
	}])
    