/*
cutomer 的注册页面
才用向导方式操作
1.添加电话，验证电话， 填写称呼。
2.进入车辆登记，
3.继续添加，保存
*/
angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerRegisterCtrl', ['$scope', '$state', '$ionicHistory', '$ionicPopup', 'registerSvr', 'regionSvr', function ($scope, $state, $ionicHistory, $ionicPopup, registerSvr, regionSvr) {

        $scope.userInfo = {
            userName:'',
            phoneNumber:'',
            password:''
        };
        $scope.confirmPassword = '';
        /*获取验证码*/
        $scope.getValidateCode = function () {
        	/*调用短信服务*/
        	/*判断该电话号码是否已经注册*/

        };
        /*下一步*/
        $scope.goToAddAuto = function () {
        	/*跳转到信息编辑页面*/
            $state.go('customerAutoAdd');
            
        };
        /*注册*/
        $scope.register = function(){
            var promise = registerSvr.register($scope.userInfo);
        	promise.then(function(data){
                /*返回的数据如何判断是否注册成功
                成功，调用regionSvr.setCities()服务,保存regions信息
                      保存用户注册ID*/
        	    if (data.isSuccess) {
        	        showAlertOfSuccess();
        	    } else {
        	        showAlertOfFail(data.msg);
        	    }
                
        	}, function(msg){
        		showAlertOfFail(msg);
        	});
        };

        /*成功注册后的popup提示*/
        var showAlertOfSuccess = function () {
            var alertPopup = $ionicPopup.alert({
                template: '注册成功！'
            });
            alertPopup.then(function (res) {
                
                $scope.goToAddAuto();
            });
        };
        /*失败注册后的popup提示*/
        var showAlertOfFail = function (errorMsg) {
            var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: errorMsg
            });
            alertPopup.then(function (res) {
                console.log(errorMsg);
            });
        };



    }])