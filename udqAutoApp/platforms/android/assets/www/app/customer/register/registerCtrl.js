/*
cutomer 的注册页面
才用向导方式操作
1.添加电话，验证电话， 填写称呼。
2.进入车辆登记，
3.继续添加，保存
*/
angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerRegisterCtrl', ['$scope', '$state', '$ionicHistory','regionSvr', function ($scope, $state, $ionicHistory,regionSvr) {

        /*获取验证码*/
        $scope.getValidateCode = function () {
        	/*调用短信服务*/
        	/*判断该电话号码是否已经注册*/

        };
        /*下一步*/
        $scope.goToLogin = function () {
        	/*跳转到信息编辑页面*/
            $state.go('login');
            
        };
        /*注册*/
        $scope.register = function(){
        	regionSvr.register(userName,phoneNumber,password).then(function(data, status, headers, config){
        		showAlertOfSuccess();
        		$scope.goToLogin();
        	}, function(data, status, headers, config){
        		showAlertOfFail(data.data.msg);
        	});
        };

        /*成功注册后的popup提示*/
        var showAlertOfSuccess = function (msg) {
            var alertPopup = $ionicPopup.alert({
                template: '注册成功！'
            });
        };
        /*失败注册后的popup提示*/
        var showAlertOfFail = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: msg
            });
            alertPopup.then(function (res) {
                console.log('登录失败，ERROR：'+msg);
            });
        };



    }])