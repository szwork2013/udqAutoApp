angular.module('udqApp')
	.service('customerMemberInfoSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q,APP_CONFIG) {

	    var baseUrl = APP_CONFIG.server.getUrl();
	    var _userInfo = {};
        
	    /*�����û���Ϣ*/
	    this.editUserInfo = function (user) {
	        var url = baseUrl + 'fzmgr/user/editUser4App.do';
	        var deferred = $q.defer();
	        $http({
	            method: 'post',
	            url: url,
	            data: { userInfo: JSON.stringify(user) }
	        }).then(
            function (data, status, headers, config) {
                deferred.resolve(data.data);
            },
            function (data, status, headers, config) {
                deferred.reject('�޸���Ϣʧ��');
            }
            );
	        return deferred.promise;
	    }
	    /*��ȡ�û���Ϣ*/
	    this.getUserInfo = function(id){
	        var url = baseUrl + 'fzmgr/user/getUser4App.do';
	        var deferred = $q.defer();
	        $http({
	            method: 'post',
	            url: url,
	            data: { id: id }
	        }).then(
            function (data, status, headers, config) {
                deferred.resolve(data.data);
            },
            function (data, status, headers, config) {
                deferred.reject('��ȡ�û���Ϣʧ��');
            }
            );
	        return deferred.promise;
	    }
	    /*����userInfo*/
	    this.setUserInfo = function (userInfo) {
	        _userInfo = userInfo;
	    }
	}])