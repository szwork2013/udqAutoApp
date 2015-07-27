
/*
管理登录页面的控制，包括customer 登录 和  employee 的登录
根据不同的用户类型，跳转到不同的main页面
*/
angular.module('udqApp')
    .controller('loginCtrl', ['$scope', '$state', '$ionicHistory', 'loginSvr', function ($scope, $state, $ionicHistory, loginSvr) {
        
        $scope.user = {
            userName : '',
            password : ''
        };

        $scope.login = function () {
            loginSvr.loginCheck($scope.user.userName, $scope.user.password).then(function (data, msg, xhr) {
                console.log("登录成功");
                
            }, function (data, msg, xhr) {
                console.log(data.error);
            });
        }
        var checkUserType = function (userType) {
            switch (userType) {
                case 1:
                    break;
                case 2:
                    break;
                case 4:
                    break;
                case 8:
                    break;
            }
        };
    }])