/*
cutomer 的注册页面
才用向导方式操作
1.添加电话，验证电话， 填写称呼。
2.进入车辆登记，
3.继续添加，保存
*/
angular.module('udqApp') /*车主的模块用cust,洗车的用user，系统公用的部分用udqApp*/
    .controller('customerRegisterCtrl', ['$scope', '$interval', '$state', '$ionicHistory', '$ionicPopup', '$window', 'registerSvr', 'regionSvr', 'loginSvr', 'jpushSvr', 'networkInfoSvr', function ($scope, $interval, $state, $ionicHistory, $ionicPopup, $window, registerSvr, regionSvr, loginSvr, jpushSvr, networkInfoSvr) {
        var showAlert = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: msg
            });
            alertPopup.then(function (res) {
                console.log(msg);
            });
        }
        var networkInfo = networkInfoSvr.checkConnection();
        if (networkInfo != undefined) {
            showAlert(networkInfo);
        }


        $scope.userInfo = {
            sex:1
        };
        $scope.confirmPassword = '';
        $scope.tips = '验证码';
        /*获取验证码*/
        $scope.getValidateCode = function () {
            /*判断电话号码是否合法*/
            if (!checkMobile($scope.userInfo.mobile)) {
                showAlertOfFail('号码须11位数字，以1开头');
                return;
            }
            /*判断该电话号码是否已经注册,调用短信服务*/
            loginSvr.loginCheck($scope.userInfo).then(
                function (data) {
                    /*判断是否已经注册*/
                    if (data.isSuccess == true) {
                        showAlertOfFail('该号码已经注册');
                    } else {
                        /*尚未注册，则调用短信服务，并且倒计时*/
                        registerSvr.sendMSG($scope.userInfo.mobile).then(
                            function (data) {
                                if(data.isSuccess){
                                    console.log(data.msg);
                                    $scope.verifyCode = data.msg;
                                }
                            }, function (data) {
                                console.log(data);
                                showAlertOfFail(data);
                            });
                        $scope.countDown();
                        $scope.registerDisabled = false;
                    }
                },
                function (data) {
                    showAlertOfFail('注册操作失败');
                });
            
        }
        /*校验输入是否是合法的电话号码*/
        var checkMobile = function (mobile) {
            var re = /^1\d{10}$/;
            if(re.test(mobile)){
                return true;
            }else{
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
                    $scope.tips = '还剩:  ' + $scope.countInterval+'s';
                } else {
                    $scope.stopCountDown();
                }
            },1000);
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
        /*下一步*/
        $scope.goToAddAuto = function () {
        	/*跳转到信息编辑页面*/
            $state.go('customerHome');
            
        }
        $scope.registerDisabled = true;
        /*注册*/
        $scope.register = function () {
            /*校验验证码是否输入*/
            if ($scope.userInfo.psd != $scope.verifyCode) {
                showAlertOfFail('验证码输入不正确');
                return;
            }
            var promise = registerSvr.register($scope.userInfo);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        $window.localStorage['loginState'] = 1;
                        $window.localStorage['mobile'] = $scope.userInfo.phoneNumber;
                        $window.localStorage['userName'] = $scope.userInfo.userName;
                        $window.localStorage['userID'] = data.data.id;
                        $window.localStorage['sex'] = data.data.sex;
                        $window.localStorage['userType'] = 2;
                        jpushSvr.setTagsWithAlias(['customer'], "customer"+data.data.id);

        	            showAlertOfSuccess();
        	        } else {
        	            showAlertOfFail(data.msg);
        	        }
        	}, function(data){
        		showAlertOfFail('注册失败');
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
        }
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }



    }])