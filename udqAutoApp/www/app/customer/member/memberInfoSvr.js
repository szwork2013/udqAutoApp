angular.module('udqApp')
	.service('customerMemberInfoSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q,APP_CONFIG) {

	    var baseUrl = APP_CONFIG.server.getUrl();
	    var _userInfo = {};
        
	    /*保存用户信息*/
	    this.editUserInfo = function (user) {
	        var url = baseUrl + 'user/editUser4App.do';
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
                deferred.reject('修改信息失败');
            }
            );
	        return deferred.promise;
	    }
	    /*获取用户信息*/
	    this.getUserInfo = function(id){
	        var url = baseUrl + 'user/getUser4App.do';
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
                deferred.reject('获取用户信息失败');
            }
            );
	        return deferred.promise;
	    }
        /*获取洗车店信息*/
	    this.getWashShopInfo = function (id) {
	        var url = baseUrl + 'user/getDirectorInfo4App.do';
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
                deferred.reject('获取用户信息失败');
            }
            );
	        return deferred.promise;
	    }
	    /*设置userInfo*/
	    this.setUserInfo = function (userInfo) {
	        _userInfo = userInfo;
	    }
	    /*充值*/
	    this.recharge = function (balance) {
	        var data = {
	            userId: balance.userId,
	            channel: balance.channel,
	            amount: balance.amount
	        };

	        url = baseUrl + 'userBalance/recharge4App.do';

	        var deferred = $q.defer();
	        $http({
	            url: url,
	            method: 'post',
	            data: {
	                balanceInfo: JSON.stringify(data)
	            }
	        }).success(function (data, status, headers, config) {
	            deferred.resolve(data);
	        })
                .error(function (data, status, headers, config) {
                    deferred.reject('提交失败');
                });
	        return deferred.promise;
	    }
	}])