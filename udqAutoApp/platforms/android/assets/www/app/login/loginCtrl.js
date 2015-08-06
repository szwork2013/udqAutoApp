
/*
管理登录页面的控制，包括customer 登录 和  employee 的登录
根据不同的用户类型，跳转到不同的main页面
*/
angular.module('udqApp')
    .controller('loginCtrl', ['$scope', '$state', '$ionicHistory', '$ionicPopup', '$window', 'loginSvr', function ($scope, $state, $ionicHistory, $ionicPopup, $window,loginSvr) {
        
        $scope.user = {
            mobile : '',
            psd: ''
        };
        /*回跳*/
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        $scope.login = function () {
            /*1、检查本地是否保存该电话号码
              2、检查该号码是否注册过
            */
            var userType = 2;
            var returnData = {};
            if ($window.localStorage['mobile'] !=undefined&& $window.localStorage['mobile'] == $scope.user.mobile) {
                uerType = $window.localStorage['userType'];
                $window.localStorage['loginState'] = 1;
            } else {
                loginSvr.loginCheck($scope.user).then(function (data) {
                    //判断是否登录
                    if (data.isSuccess == true) {
                        console.log(data.msg);
                        userType = checkUserType(data.data.userType);

                        $window.localStorage['userID'] = data.data.id;
                        $window.localStorage['loginState'] = 1;
                        $window.localStorage['mobile'] = $scope.user.mobile;
                    } else {
                        showAlert(data.msg);
                        return;
                    }

                }, function (data) {
                    showAlert(data);
                });
            }

            if (userType == 1) {
                /*洗车工*/
                $ionicHistory.goBack();
            } else if (userType == 2) {
                /*车主*/
                $ionicHistory.goBack();

            } else {
                //其他用户类型登录，暂时不管
            }
        }
        var checkUserType = function (userType) {
            switch (userType) {
                case 4:
                    return 1;
                case 8:
                    return 2;
                default:
                    return 0;
            }
        };
        /*点击注册*/
        $scope.register = function () {
            $state.go('customerRegister');
        };
        /*登录出现问题*/
        var showAlert = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: msg
            });
            alertPopup.then(function (res) {
                console.log(msg);
            });
        };
    }])