angular.module('udqApp')
	.service('customerMemberInfoSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q,APP_CONFIG) {

	    var baseUrl = APP_CONFIG.server.getUrl();
	    var _userInfo = {};
        
	    /*保存用户信息*/
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
                deferred.reject('修改信息失败');
            }
            );
	        return deferred.promise;
	    }
	    /*获取用户信息*/
	    this.getUserInfo = function(){
	        return _userInfo;
	    }
	    /*设置userInfo*/
	    this.setUserInfo = function (userInfo) {
	        _userInfo = userInfo;
	    }
	}])