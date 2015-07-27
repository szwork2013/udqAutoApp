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

        };
        /*下一步*/
        $scope.goToMemberInfoEdit = function () {
        	/*跳转到信息编辑页面*/
            $state.go('customerMemberInfoEdit');
            /*获取区域信息*/
            
        };
        /*注册*/
        $scope.register = function(){
        	regionSvr.register(userName,phoneNumber,password);
        };


    }])