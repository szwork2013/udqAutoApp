angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$ionicPopup', '$ionicActionSheet', '$stateParams', '$state', '$ionicHistory', '$window', 'customerWashtypeSvr', 'customerOrderMakeSvr', 'customerOrderSvr', 'regionSvr', 'autoSvr', 'APP_CONFIG', 'networkInfoSvr', function ($scope, $ionicPopup, $ionicActionSheet, $stateParams, $state, $ionicHistory, $window, customerWashtypeSvr, customerOrderMakeSvr, customerOrderSvr, regionSvr, autoSvr, APP_CONFIG, networkInfoSvr) {
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


        /*从服务中获取选择的洗车类型、车辆以及小区*/
        var getWashTypeAndSelectAutoInfo = function () {
            $scope.types = customerOrderSvr.getTypes();
            $scope.selectedAuto.selectedAutoId = customerOrderSvr.getSelectedAutoId();
            $scope.selectedAuto.selectedRegionId = customerOrderSvr.getSelectedRegionId();
            $scope.order.userNote = customerOrderSvr.getUserNote();
        }
        /*保存选择的洗车类型，选择的车辆以及选择的小区*/
        var saveWashTypeAndSelectAutoInfo = function () {
            customerOrderSvr.setType($scope.types);
            customerOrderSvr.setSelectedAutoId($scope.selectedAuto.selectedAutoId);
            customerOrderSvr.setSelectedRegionId($scope.selectedAuto.selectedRegionId);
            customerOrderSvr.setUserNote($scope.order.userNote);
        }

        $scope.selectedAuto = {};
        /*数据区*/
        $scope.order = {
            userId: $window.localStorage['userID']
        };
        var typeSelect = $stateParams.typeSelect;
        switch (typeSelect) {
            case 'main':
                /*获取洗车类型，车辆信息，小区信息*/
                $scope.totalAmount = 0;
                customerWashtypeSvr.callWashType().then(
                    function (data) {
                        $scope.types = data.rows;
                        if (data.rows.length != 0) {
                            /*1表示选中，2表示未选中，‘快洗’设置为选中，其他默认未未选中*/
                            for (var i = 0; i < data.rows.length; i++) {
                                if (i == 0) {
                                    $scope.types[i].check = 1;
                                    $scope.totalAmount = $scope.types[i].amount;
                                } else {
                                    $scope.types[i].check = 2;
                                }
                            }
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                autoSvr.getAuto().then(
                    function (data) {
                        if (data.isSuccess) {
                            if (data.rows.length > 0) {
                                $scope.autoInfo = data.rows;
                                $scope.hasNoAuto = false;
                                /*设置默认的车辆、小区*/
                                if ($scope.autoInfo != undefined && $scope.autoInfo.length > 0) {
                                    $scope.selectedAuto.selectedAutoId = $scope.autoInfo[0].id;
                                    $scope.selectedAuto.selectedRegionId = $scope.autoInfo[0].defaultRegionId;
                                }
                            } else {
                                console.log('用户无车辆信息，未添加车辆');
                                $scope.hasNoAuto = true;
                            }
                        } else {
                            console.log(data.msg);
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                regionSvr.doRequest().then(
                    function (data) {
                        if (data != undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.districts = regionSvr.getDistricts();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );

                break;
            case 'washTypeReturn':
            case 'autoReturn':
            case 'regionReturn':
            case 'payOrderReturn':
                /*计算金额*/
                getWashTypeAndSelectAutoInfo();
                $scope.totalAmount = 0;
                if ($scope.types != undefined && $scope.types.length > 0) {
                    for (var i = 0; i < $scope.types.length; i++) {
                        if ($scope.types[i].check == 1) {
                            $scope.totalAmount += $scope.types[i].amount;
                        }
                    }
                    $scope.totalAmount = $scope.totalAmount.toFixed(2);
                }
                /*获取车辆、小区*/
                autoSvr.getAuto().then(
                    function (data) {
                        if (data.isSuccess) {
                            if (data.rows.length > 0) {
                                $scope.autoInfo = data.rows;
                                $scope.hasNoAuto = false;
                            } else {
                                console.log('用户无车辆信息，未添加车辆');
                                $scope.hasNoAuto = true;
                            }
                        } else {
                            console.log(data.msg);
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                regionSvr.doRequest().then(
                    function (data) {
                        if ($scope.districts == undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.districts = regionSvr.getDistricts();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                break;
            case 'goToWashType':
                /*从服务获取洗车类型*/
                $scope.types = customerOrderSvr.getTypes();
                break;
            case 'washTypeNote':

            case 'goToAuto':
                /*从后台获取车辆信息*/
                autoSvr.getAuto().then(
                    function (data) {
                        if (data.isSuccess) {
                            if (data.rows.length > 0) {
                                $scope.autoInfo = data.rows;
                                $scope.hasNoAuto = false;
                                $scope.selectedAuto.selectedAutoId = customerOrderSvr.getSelectedAutoId();
                            } else {
                                console.log('用户无车辆信息，未添加车辆');
                                $scope.hasNoAuto = true;
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
            case 'goToRegion':
                /*从后台获取小区*/
                regionSvr.doRequest().then(
                    function (data) {
                        if ($scope.districts == undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.districts = regionSvr.getDistricts();
                            $scope.selectedAuto.selectedRegionId = customerOrderSvr.getSelectedRegionId();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                break;
        }

        /*保存选择，跳转到洗车类型选择*/
        $scope.goToWashType = function () {
            saveWashTypeAndSelectAutoInfo();
            $ionicHistory.clearHistory();
            $state.go('customerWashtype', { 'typeSelect': 'goToWashType' });
        }
        /*保存选择，跳转到车辆选择*/
        $scope.goToAutoList = function () {
            /*判断是否登录*/
            if (window.localStorage['loginState'] == 1) {
                saveWashTypeAndSelectAutoInfo();
                $ionicHistory.clearHistory();
                $state.go('customerAutoList', { 'typeSelect': 'goToAuto' });
            } else {
                /*提醒用户尚未登录或者注册*/
                showAlertOfLogin('用户尚未登录或者注册');
            }


        }
        /*保存选择，跳转到小区选择*/
        $scope.goToRegionSelect = function () {
            /*判断是否登录*/
            if (window.localStorage['loginState'] == 1) {
                saveWashTypeAndSelectAutoInfo();
                $ionicHistory.clearHistory();
                $state.go('customerRegionSelect', { 'typeSelect': 'goToRegion' });
            } else {
                /*提醒用户尚未登录或者注册*/
                showAlertOfLogin('用户尚未登录或者注册');
            }

        }
        /*预约洗车回转*/
        $scope.goBackMain = function () {
            $ionicHistory.clearHistory();
            $state.go('customerHome');
        }
        /*(洗车类型、车辆选择、小区选择、时间预约)*/
        $scope.goBack = function () {
            $ionicHistory.clearHistory();
            alert("sb");
        }
        /*前去订单*/
        $scope.commitOrder = function () {
            if ($window.localStorage["loginState"] != 1) {
                showAlertOfLogin('用户尚未登录或者注册');
                return;
            }
            if (!checkOrder()) {
                saveWashTypeAndSelectAutoInfo();
                $ionicHistory.clearHistory();
                $state.go('customerOrderpay', { 'order': angular.toJson($scope.order), 'state': 'customerOrderMake' });
            }


        }
        var checkOrder = function () {
            /*获取洗车类型*/
            if ($scope.types == undefined) {
                showAlertOfFail('未连接上服务器');
                return true;
            }
            $scope.order.washTypeId = [];
            $scope.order.fixedAmount = [];
            for (var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].check == 1) {
                    $scope.order.washTypeId.push($scope.types[i].id);
                    $scope.order.fixedAmount.push($scope.types[i].amount);
                }
            }
            if ($scope.selectedAuto.selectedAutoId == undefined) {
                showAlertOfFail('请选择车辆');
                return true;
            }
            if ($scope.selectedAuto.selectedRegionId == undefined) {
                showAlertOfFail('请选择小区');
                return true;
            }
            /*获取车辆Id,小区Id*/
            $scope.order.autoId = $scope.selectedAuto.selectedAutoId;
            $scope.order.regionId = $scope.selectedAuto.selectedRegionId;

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
                $ionicHistory.clearHistory();
                $state.go('login');
                console.log(msg);
            });
        }
        /*************************洗车类型******************************/
        /*返回预定洗车界面*/
        $scope.goBackOfWashType = function () {
            if ($scope.types != undefined && $scope.types.length > 0) {
                customerOrderSvr.setType($scope.types);
            }
            $ionicHistory.clearHistory();
            $state.go("customerOrderMake", { 'typeSelect': 'washTypeReturn' });
        }
        /*查看洗车类型服务详情*/
        $scope.goToTypeNote = function (type) {
            customerOrderSvr.setType($scope.types);
            $ionicHistory.clearHistory();
            $state.go("customerWashtypeNote");
        }
        /***************************************************************/
        /*************************车辆选择******************************/
        /*下拉刷新*/
        $scope.doRefresh = function () {
            autoSvr.getAuto().then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        $scope.autoInfo = data.rows;
                        console.log("获取车辆成功" + data.rows.length);
                    }
                } else {
                    console.log(data.msg);
                }
            }, function (data) {
                console.log(data);
            }
            );
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.goToAddauto = function () {
            /*保存在service*/
            if ($scope.autoInfo != undefined && $scope.autoInfo.length > 0) {
                customerOrderSvr.setSelectedAutoId($scope.selectedAuto.selectedAutoId);
                /*选择车辆改变，则联动小区也改变*/
                var indexOfAuto = 0;
                for (var i = 0; i < $scope.autoInfo.length; i++) {
                    if ($scope.selectedAuto.selectedAutoId == $scope.autoInfo[i].id) {
                        indexOfAuto = i;
                    }
                }
                $scope.selectedAuto.selectedRegionId = $scope.autoInfo[indexOfAuto].defaultRegionId;

            }
            $ionicHistory.clearHistory();
            $state.go('customerAutoAdd', { 'backName': 'customerAutoList' });
        }
        $scope.goBackOfAuto = function () {
            /*保存在service*/
            if ($scope.autoInfo != undefined && $scope.autoInfo.length > 0) {
                customerOrderSvr.setSelectedAutoId($scope.selectedAuto.selectedAutoId);
                /*选择车辆改变，则联动小区也改变*/
                var indexOfAuto = 0;
                for (var i = 0; i < $scope.autoInfo.length; i++) {
                    if ($scope.selectedAuto.selectedAutoId == $scope.autoInfo[i].id) {
                        indexOfAuto = i;
                    }
                }
                $scope.selectedAuto.selectedRegionId = $scope.autoInfo[indexOfAuto].defaultRegionId;

            }

            /*跳转*/
            $ionicHistory.clearHistory();
            $state.go("customerOrderMake", { 'typeSelect': 'autoReturn' });
        }
        /***************************************************************/
        /*****************************小区选择**************************/
        $scope.doRefreshOfRegion = function () {
            $scope.districts = regionSvr.getDistricts();
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.goBackOfRegionSelect = function () {
            /*保存到service*/
            if ($scope.districts != undefined && $scope.districts.length > 0) {
                customerOrderSvr.setSelectedRegionId($scope.selectedAuto.selectedRegionId);
            }
            $ionicHistory.clearHistory();
            $state.go('customerOrderMake', { 'typeSelect': 'regionReturn' });
        }
    }])