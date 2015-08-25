
/*
管理登录页面的控制，包括customer 登录 和  employee 的登录
根据不同的用户类型，跳转到不同的main页面
*/
angular.module('udqApp')
    .controller('loginCtrl', ['$scope', '$interval', '$state', '$ionicHistory', '$ionicPopup', '$window', 'loginSvr', 'registerSvr', 'jpushSvr', function ($scope, $interval, $state, $ionicHistory, $ionicPopup, $window, loginSvr, registerSvr, jpushSvr) {

        $scope.user = {
            mobile : '',
            psd: ''
        };
        /*回跳*/
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        $scope.tips = '验证码';
        /*获取验证码*/
        $scope.getValidateCode = function () {
            /*判断电话号码是否合法*/
            if (!checkMobile($scope.user.mobile)) {
                showAlert('号码须11位数字，以1开头');
                return;
            }
            /*判断该电话号码是否已经注册,调用短信服务*/
            loginSvr.loginCheck($scope.user).then(
                function (data) {
                    /*判断是否已经注册*/
                    if (data.isSuccess == false) {
                        showAlert('该号码尚未注册');
                    } else {
                        /*已注册，则调用短信服务，并且倒计时*/
                        registerSvr.sendMSG($scope.user.mobile).then(
                            function (data) {
                                if (data.isSuccess) {
                                    console.log(data.msg);
                                    $scope.verifyCode = data.msg;
                                }
                            }, function (data) {
                                console.log(data.msg);
                                showAlert(data.msg);
                            });
                        $scope.countDown();
                    }
                },
                function (data) {
                    showAlert('data');
                });

        }
        /*校验输入是否是合法的电话号码*/
        var checkMobile = function (mobile) {
            var re = /^1\d{10}$/;
            if (re.test(mobile)) {
                return true;
            } else {
                return false;
            }
        }
        /*倒计时*/
        var count;
        $scope.countInterval = 60;
        $scope.verifyDisabled = false;
        /*倒计时*/
        $scope.countDown = function () {
            // Don't start a new countDown if we are already countDowning
            if (angular.isDefined(count)) {
                return;
            }
            $scope.verifyDisabled = true;
            count = $interval(function () {
                if ($scope.countInterval > 0) {
                    $scope.countInterval -= 1;
                    $scope.tips = '还剩:  ' + $scope.countInterval + 's';
                } else {
                    $scope.stopCountDown();
                }
            }, 1000);
        }
        /*停止倒计时*/
        $scope.stopCountDown = function () {
            if (angular.isDefined(count)) {
                $interval.cancel(count);
                $scope.resetCount();
            }
        }
        /*重置*/
        $scope.resetCount = function () {
            $scope.countInterval = 60;
            $scope.verifyDisabled = false;
            $scope.tips = '验证码';
            count = undefined;
        }
        $scope.$on('$destroy', function () {
            /*make sure that the interval is destroyed too*/
            $scope.stopCountDown();
        })
        $scope.login = function () {
            /*检查输入是否合法*/
            if (!checkMobile($scope.user.mobile)) {
                showAlert('号码须11位数字，以1开头');
                return;
            }
            if ($scope.user.psd != $scope.verifyCode) {
                showAlert('验证码不正确');
                return;
            }
            /*1、检查本地是否保存该电话号码
              2、检查该号码是否注册过
            */
            var userType = 2;
            var returnData = {};
                loginSvr.loginCheck($scope.user).then(function (data) {
                    //判断该电话号码是否已经注册
                    if (data.isSuccess == true) {
                        console.log(data.msg);
                        userType = checkUserType(data.data.userType);

                        $window.localStorage['userID'] = data.data.id;
                        $window.localStorage['orgId'] = data.data.orgId;
                        $window.localStorage['loginState'] = 1;
                        $window.localStorage['mobile'] = $scope.user.mobile;
                        $window.localStorage['userName'] = data.data.name;
                        $window.localStorage['userType'] = data.data.userType;
                        $window.localStorage['sex'] = data.data.sex;

                        /*根据用户类型设置别名和标签*/
                        if (userType == 1) {/*洗车工*/
                            jpushSvr.setAlias([data.data.orgId], 'org'+data.data.id);
                        } else if (userType == 2) {/*车主*/
                            jpushSvr.setAlias(['customer'], 'customer'+data.data.id);
                        }
                        
                        /*跳转*/
                        goToHomeByUserType(userType);

                    } else {
                        showAlert(data.msg);
                        return;
                    }
                }, function (data) {
                    showAlert(data);
                });
            }
        //}
        var checkUserType = function (userType) {
            switch (userType) {
                case 4:
                    return 1;
                case 8:
                    return 2;
                default:
                    return 1;
            }
        };
        var goToHomeByUserType = function (userType) {
            if (userType == 1) {
                /*洗车工*/
                $state.go('employeeOrderList');
            } else if (userType == 2) {
                /*车主*/
                $ionicHistory.goBack();

            } else {
                //其他用户类型登录，暂时不管
            }
        }
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