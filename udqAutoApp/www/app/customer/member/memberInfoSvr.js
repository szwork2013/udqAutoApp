angular.module('udqAdd')
	.service('CustomerMemberInfoSvr', ['$http', function($http){
	    var _userInfo = {};

	    /*�����û���Ϣ*/
	    this.editUserInfo = function(){

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