angular.module('udqApp')
	.service('customerMemberInfoSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q,APP_CONFIG) {

	    var baseUrl = APP_CONFIG.server.getUrl();
	    var _userInfo = {};
        
	    /*�����û���Ϣ*/
	    this.editUserInfo = function (name) {
	        var url = baseUrl + '';
	        var userInfo = {
	            userName:name
	        };
	        var deferred = $q.defer();
	        $http({
	            method: 'post',
	            url: url,
	            data: {userInfo:JSON.stringify(userInfo)}
	        }).then(
            function (data, status, headers, config) {
                deferred.resolve(data);
            },
            function (data, status, headers, config) {
                deferred.reject('�޸���Ϣʧ��');
            }
            );
	        return deferred.promise;
	    }
	    /*��ȡ�û���Ϣ*/
	    this.getUserInfo = function(){
	        return _userInfo;
	    }
	    /*����userInfo*/
	    this.setUserInfo = function (userInfo) {
	        _userInfo = userInfo;
	    }
	}])