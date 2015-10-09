angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$ionicPopup', '$ionicActionSheet', '$stateParams', '$state', '$ionicHistory', '$window', 'customerWashtypeSvr', 'customerOrderMakeSvr', 'customerOrderSvr', 'regionSvr', 'autoSvr', 'APP_CONFIG', 'popUpSvr', 'LoadingSvr', function ($scope, $ionicPopup, $ionicActionSheet, $stateParams, $state, $ionicHistory, $window, customerWashtypeSvr, customerOrderMakeSvr, customerOrderSvr, regionSvr, autoSvr, APP_CONFIG, popUpSvr,LoadingSvr) {
        
        /*从服务中获取选择的洗车类型、车辆以及小区*/
        var getWashTypeAndSelectAutoInfo = function () {
            $scope.types = customerOrderSvr.getTypes();
            $scope.auto = customerOrderSvr.getSelectedAuto();
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
            customerOrderSvr.setSelectedAuto($scope.auto);
        }
        $scope.auto = {};
        $scope.selectedAuto = {};
        /*数据区*/
        $scope.order = {
            userId: $window.localStorage['userID']
        };
        var backParam = $stateParams.backParam;/*以前一个页面的参数来确定返回时的页面*/
        var typeSelect = $stateParams.typeSelect;
        switch (typeSelect) {
            case 'main':
                LoadingSvr.show();
                /*获取洗车类型，车辆信息，小区信息*/
                $scope.totalAmount = 0;
                customerWashtypeSvr.callWashType().then(
                    function (data) {
                        $scope.types = data.rows;
                        $scope.types[0].imgUri = "image/circleImg/device.png";
                        $scope.types[1].imgUri = "image/circleImg/device.png";
                        $scope.types[2].imgUri = "image/circleImg/device.png";
                        if (data.rows.length != 0) {
                            /*1表示选中，2表示未选中，‘快洗’设置为选中，其他默认未未选中*/
                            for (var i = 0; i < data.rows.length; i++) {
                                if (i == 0) {
                                    $scope.types[i].check = 1;
                                    $scope.types[i].state = true;//锁定
                                    $scope.totalAmount = $scope.types[i].amount;
                                } else {
                                    $scope.types[i].state = false;
                                    $scope.types[i].check = 2;
                                }
                            }
                        }
                        LoadingSvr.hide();
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
                                    $scope.auto = $scope.autoInfo[0];
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
            case 'washTypeNote':
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
            case 'goToWashTypeNote':
                /*从服务获取洗车类型描述*/
                $scope.type = customerOrderSvr.getSelectedType();
                break;
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
        
        /*跳转到洗车类型服务详情*/
        $scope.goToTypeNote = function (type) {
            saveWashTypeAndSelectAutoInfo();
            customerOrderSvr.setSelectedType(type);
            $state.go("customerWashtypeNote", { 'typeSelect': 'goToWashTypeNote' });
        }
        /*保存选择，跳转到车辆选择*/
        $scope.goToAutoList = function () {
            /*判断是否登录*/
            if (window.localStorage['loginState'] == 1) {
                saveWashTypeAndSelectAutoInfo();
                $state.go('customerAutoList', { 'typeSelect': 'goToAuto' });
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
        /*保存选择，跳转到小区选择*/
        $scope.goToRegionSelect = function () {
            /*判断是否登录*/
            if (window.localStorage['loginState'] == 1) {
                saveWashTypeAndSelectAutoInfo();
                $state.go('customerRegionSelect', { 'typeSelect': 'goToRegion' });
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
        /*(洗车类型、车辆选择、小区选择、时间预约)*/
        $scope.goBack = function () {
            alert("sb");
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
                saveWashTypeAndSelectAutoInfo();
                $state.go('customerOrderpay', { 'order': angular.toJson($scope.order), 'state': 'customerOrderMake' });
            }


        }
        var checkOrder = function () {
            /*获取洗车类型*/
            if ($scope.types == undefined) {
                popUpSvr.showAlert('未连接上服务器');
                return true;
            }
            $scope.order.washTypeIds = [];
            $scope.order.fixedAmounts = [];
            for (var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].check == 1) {
                    $scope.order.washTypeIds.push($scope.types[i].id);
                    $scope.order.fixedAmounts.push($scope.types[i].amount);
                }
            }
            if ($scope.selectedAuto.selectedAutoId == undefined) {
                popUpSvr.showAlert('请选择车辆');
                return true;
            }
            if ($scope.selectedAuto.selectedRegionId == undefined) {
                popUpSvr.showAlert('请选择小区');
                return true;
            }
            //if ($scope.auto.position == undefined || $scope.auto.position == "") {
            //    popUpSvr.showAlert('请填写车位');
            //    return true;
            //}
            $scope.order.totalAmount = $scope.totalAmount;
            /*获取车辆Id,小区Id*/
            $scope.order.autoId = $scope.selectedAuto.selectedAutoId;
            $scope.order.regionId = $scope.selectedAuto.selectedRegionId;
            $scope.order.autoPosition = $scope.auto.position;

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
        /*************************洗车类型服务详情******************************/
        /*返回预定洗车界面*/
        $scope.goBackOfWashTypeNote = function () {
            if (backParam == "washTypeIntroduce") {
                $state.go("customerWashTypeIntroduce");
            } else {
                $state.go("customerOrderMake", { 'typeSelect': 'washTypeNote' });
            }
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
            $state.go('customerAutoAdd', { 'backName': 'customerAutoList' });
        }
        $scope.goBackOfAuto = function (auto) {
            /*保存在service*/
            if ($scope.autoInfo != undefined && $scope.autoInfo.length > 0&&auto!=undefined) {
                customerOrderSvr.setSelectedAuto(auto);
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
                for (var i = 0; i < $scope.districts.length; i++) {
                    if ($scope.districts[i].id == $scope.selectedAuto.selectedRegionId) {
                        $scope.auto = customerOrderSvr.getSelectedAuto();
                        $scope.auto.defaultRegionId = $scope.selectedAuto.selectedRegionId;
                        $scope.auto.regionName = $scope.districts[i].name;
                    }
                }
                customerOrderSvr.setSelectedAuto($scope.auto);
            }

            $state.go('customerOrderMake', { 'typeSelect': 'regionReturn' });
        }
        $scope.on_select = function () {
            //$("#selected").attr("class", "ion-selected");
            var radio = document.getElementById("selected");
            radio.style.backgroundColor = "#ccc"
        }
        $scope.changeTotalAmount = function () {
            $scope.totalAmount = 0;
            for (var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].check == 1) {
                    $scope.totalAmount += $scope.types[i].amount;
                }
            }
            $scope.totalAmount = $scope.totalAmount.toFixed(2);
        }
    }])