angular.module('udqAdd')
	.service('CustomerMemberInfoSvr', ['$http', function($http){
	    var _userInfo = {};

	    /*保存用户信息*/
	    this.editUserInfo = function(){

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