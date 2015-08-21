/*
cutomer 的主页面
功能菜单
*/

angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerHomeCtrl', ['$scope', '$state', '$ionicHistory', '$window', '$ionicTabsDelegate', 'cameraSvr', '$ionicPopup','fileTransferSvr', function ($scope, $state, $ionicHistory, $window, $ionicTabsDelegate, cameraSvr, $ionicPopup,fileTransferSvr) {
    	/*轮播图片*/
        $scope.images = [];
        $scope.image;
        /*跳转到我要洗车*/
        $scope.goToBookWash = function () {
            $state.go('customerOrderMake');
        }
        /*跳转到洗车服务类型介绍界面*/
    	$scope.goToWashTypeIntroduce = function () {
    	    $state.go('customerWashTypeIntroduce');
    	}
        /*跳转到我的订单*/
    	$scope.goToMyOrder = function () {
    	    /*判断是否已经登录*/
    	    if ($window.localStorage['loginState'] == '1') {
    	        $state.go('customerMyOrder');
    	    } else {
    	        $state.go('login');
    	    }
    	};
        /*跳转到'我的点趣'*/
    	$scope.goToMyDQ = function () {

    	    /*photo test!!!!!----------------------------测试only----------------------------*/

    	    /*
            传输成功
            */
    	    function tSuccess(result) {
    	        $ionicPopup.alert({
    	            title: '提示',
    	            template: 'ok!'
    	        });
    	    }
    	    /*
            传输失败
            */
    	    function tFail(error) {
    	        $ionicPopup.alert({
    	            title: '提示',
    	            template: '失败!' + JSON.stringify(error)

    	        });
    	    }
    	    /*
            传输进度
            */
    	    function tProgress(event) {

    	    }

    	    function cSuccess(imgURI) {
    	        var params = { orderId: 101 };
    	        fileTransferSvr.uploadWashPhoto(imgURI, params, tSuccess, tFail, tProgress);

    	    }
    	    function cFail(message) {
    	        console.log(message);
    	    }


    	    cameraSvr.getPicture(50, cSuccess, cFail);


    	    /*判断是否已经登录*/
    	    if ($window.localStorage['loginState'] == '1') {
    	        $state.go('customerMyDQ');
    	    } else {
    	        $state.go('login');
    	    }

    	};
        /*跳转到车辆列表*/
    	$scope.goToAutoList = function () {
    	    /*判断是否已经登录*/
    	    $state.go('customerAutoMgr');
    	    if ($window.localStorage['loginState'] == '1') {
    	        $state.go('customerAutoMgr');
    	    } else {
    	        $state.go('login');
    	    }
    	}
    }])