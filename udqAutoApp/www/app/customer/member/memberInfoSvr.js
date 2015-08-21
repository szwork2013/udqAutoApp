angular.module('udqApp')
	.service('customerMemberInfoSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q,APP_CONFIG) {

	    var baseUrl = APP_CONFIG.server.getUrl();
	    var _userInfo = {};
        
	    /*保存用户信息*/
	    this.editUserInfo = function (user) {
	        var url = baseUrl + 'fzmgr/user/editUser4App.do';
	        var userInfo = {
	            userName: user.name,
                sex:user.sex
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
	        var url = baseUrl + 'fzmgr/user/getUser4App.do';
	        var userInfo = {
	            userName: user.name,
	            sex: user.sex
	        };
	        var deferred = $q.defer();
	        $http({
	            method: 'post',
	            url: url,
	            data: { userInfo: JSON.stringify(userInfo) }
	        }).then(
            function (data, status, headers, config) {
                deferred.resolve(data);
            },
            function (data, status, headers, config) {
                deferred.reject('获取用户信息失败');
            }
            );
	        return deferred.promise;
	    }
	    /*设置userInfo*/
	    this.setUserInfo = function (userInfo) {
	        _userInfo = userInfo;
	    }
	}])