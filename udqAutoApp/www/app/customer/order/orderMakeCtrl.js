angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$ionicNavBarDelegate', '$ionicPopup', '$ionicActionSheet', '$stateParams', '$state', '$ionicHistory', '$window', 'customerWashtypeSvr', 'customerOrderMakeSvr', 'customerOrderSvr', 'regionSvr', 'autoSvr', 'APP_CONFIG', 'popUpSvr', 'LoadingSvr', function ($scope, $ionicNavBarDelegate, $ionicPopup, $ionicActionSheet, $stateParams, $state, $ionicHistory, $window, customerWashtypeSvr, customerOrderMakeSvr, customerOrderSvr, regionSvr, autoSvr, APP_CONFIG, popUpSvr, LoadingSvr) {

        $scope.lastPageName = $stateParams.lastPageName;
        $scope.orderInfo = angular.fromJson($stateParams.orderInfo);
        switch ($scope.lastPageName) {
            case "customerHome":
                LoadingSvr.show();

                $scope.orderInfo = {};
                $scope.orderInfo.totalAmount = 0;
                /*获取洗车类型，同时计算初始订单金额*/
                customerWashtypeSvr.callWashType().then(
                    function (data) {

                        $scope.orderInfo.types = data.rows;
                        if (data.rows.length != 0) {
                            /*1表示选中，2表示未选中，‘快洗’设置为选中，其他默认未未选中*/
                            for (var i = 0; i < data.rows.length; i++) {
                                if (i == 0) {
                                    $scope.orderInfo.types[i].check = 1;
                                    $scope.orderInfo.types[i].state = true;//锁定
                                    $scope.orderInfo.totalAmount = $scope.orderInfo.types[i].amount;
                                    $scope.totalAmount = $scope.orderInfo.types[i].amount;
                                } else {
                                    $scope.orderInfo.types[i].state = false;
                                    $scope.orderInfo.types[i].check = 2;
                                }
                            }
                        }
                        LoadingSvr.hide();
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                /*获取初始化车辆和小区*/
                autoSvr.getAuto().then(
                    function (data) {
                        if (data.isSuccess) {
                            if (data.rows.length > 0) {
                                $scope.autoInfo = data.rows;
                                /*设置默认的车辆、小区*/
                                if ($scope.autoInfo != undefined && $scope.autoInfo.length > 0) {
                                    $scope.orderInfo.auto = $scope.autoInfo[0];
                                }
                            } else {
                                console.log('用户无车辆信息，未添加车辆');
                            }
                        } else {
                            console.log(data.msg);
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                break;
            dafault:
                break;
        }

        /*数据区*/
        $scope.order = {
            userId: $window.localStorage['userID']
        };

        /*跳转到洗车类型服务详情*/
        $scope.goToTypeNote = function (type) {
            $state.go("customerWashTypeNote", { 'lastPageName': 'customerOrderMake', 'orderInfo':JSON.stringify($scope.orderInfo),'washType': JSON.stringify(type) });
        }
        /*跳转到车辆选择*/
        $scope.goToAutoList = function () {
            /*判断是否登录*/
            if (window.localStorage['loginState'] == 1) {
                $state.go('customerAutoList', { 'lastPageName': 'customerOrderMake','orderInfo':JSON.stringify($scope.orderInfo) });
            } else {
                /*提醒用户尚未登录或者注册*/
                popUpSvr.showAlertOfLogin('用户尚未登录或者注册').then(
                    function (res) {
                        if (res) {
                            $state.go('login');
                        }
                    });;
            }
        }
        /*跳转到小区选择*/
        $scope.goToRegionSelect = function () {
            /*判断是否登录*/
            if (window.localStorage['loginState'] == 1) {
                $state.go('customerRegionSelect', { 'lastPageName': 'customerOrderMake', 'orderInfo': JSON.stringify($scope.orderInfo) });
            } else {
                /*提醒用户尚未登录或者注册*/
                popUpSvr.showAlertOfLogin('用户尚未登录或者注册').then(
                    function (res) {
                        if (res) {
                            $state.go('login');
                        }
                    });;
            }

        }
        /*预约洗车回转*/
        $scope.goBackMain = function () {
            $state.go('customerHome');
        }
        
        /*提交订单*/
        $scope.commitOrder = function () {
            if ($window.localStorage["loginState"] != 1) {
                popUpSvr.showAlertOfLogin('用户尚未登录或者注册').then(
                    function (res) {
                        if (res) {
                            $state.go('login');
                        }
                    });
                return;
            }
            if (!checkOrder()) {
                $state.go('customerOrderpay', { 'order': angular.toJson($scope.order), 'state': 'customerOrderMake','orderInfo':JSON.stringify($scope.orderInfo) });
            }
        }
        var checkOrder = function () {
            /*获取洗车类型*/
            if ($scope.orderInfo.types == undefined) {
                popUpSvr.showAlert('未连接上服务器');
                return true;
            }
            $scope.order.washTypeIds = [];
            $scope.order.fixedAmounts = [];
            for (var i = 0; i < $scope.orderInfo.types.length; i++) {
                if ($scope.orderInfo.types[i].check == 1) {
                    $scope.order.washTypeIds.push($scope.orderInfo.types[i].id);
                    $scope.order.fixedAmounts.push($scope.orderInfo.types[i].amount);
                }
            }
            if ($scope.orderInfo.auto.pn == undefined) {
                popUpSvr.showAlert('请选择车辆');
                return true;
            }
            if ($scope.orderInfo.auto.defaultRegionId == undefined) {
                popUpSvr.showAlert('请选择小区');
                return true;
            }

            $scope.order.totalAmount = $scope.orderInfo.totalAmount;
            /*获取车辆Id,小区Id*/
            $scope.order.autoId = $scope.orderInfo.auto.id;
            $scope.order.regionId = $scope.orderInfo.auto.defaultRegionId;
            $scope.order.autoPosition = $scope.orderInfo.auto.position;
            $scope.order.userNote = $scope.orderInfo.userNote;
        }
        var showAlertOfFail = function (errorMsg) {
            var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: errorMsg
            });
            alertPopup.then(function (res) {
                console.log(errorMsg);
            });
        }
        /*提醒用户尚未登录或者注册，然后跳转到登录页面*/
        var showAlertOfLogin = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: msg
            });
            alertPopup.then(function (res) {
                $state.go('login');
                console.log(msg);
            });
        }

        $scope.changeTotalAmount = function () {
            $scope.orderInfo.totalAmount = 0;
            for (var i = 0; i < $scope.orderInfo.types.length; i++) {
                if ($scope.orderInfo.types[i].check == 1) {
                    $scope.orderInfo.totalAmount += $scope.orderInfo.types[i].amount;
                }
            }
            $scope.orderInfo.totalAmount = $scope.orderInfo.totalAmount.toFixed(2);
        }
    }])