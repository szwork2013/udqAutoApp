
/*
管理登录页面的控制，包括customer 登录 和  employee 的登录
根据不同的用户类型，跳转到不同的main页面
*/
angular.module('udqApp')
    .controller('loginCtrl', ['$scope', '$state', '$ionicHistory','$ionicPopup','loginSvr', function ($scope, $state, $ionicHistory,$ionicPopup, loginSvr) {
        
        $scope.user = {
            userName : '',
            password : ''
        };

        $scope.login = function () {
            loginSvr.loginCheck($scope.user.userName, $scope.user.password).then(function (data, status, headers, config) {
                //判断是否获取到数据
                if (data.data.data == undefined) {
                    //弹出提示框：data.data.msg
                    showAlert(data.data.msg);
                    return;
                }
                var userType = checkUserType(data.data.data.userType);
                if (userType == 1)
                {
                    //跳转到车主页面
                    $ionicHistory.clearHistory();
                    $state.go('customerHome');
                } else if (userType == 2) {
                    //跳转到洗车工页面
                    $ionicHistory.clearHistory();
                    $state.go('customerHome');
                }else{
                    //其他用户类型登录，暂时不管
                }
            }, function (data, status, headers, config) {
                showAlert(data.data.msg);
            });
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
        // An alert dialog
        var showAlert = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: msg
            });
            alertPopup.then(function (res) {
                console.log('登录失败，ERROR：'+msg);
            });
        };
    }])