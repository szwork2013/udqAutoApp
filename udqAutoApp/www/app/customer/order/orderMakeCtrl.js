angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$ionicActionSheet', '$stateParams', '$state', '$ionicHistory', '$window', 'customerWashtypeSvr', 'customerOrderMakeSvr', 'customerOrderSvr', 'regionSvr', 'autoSvr', 'APP_CONFIG', function ($scope, $ionicActionSheet, $stateParams, $state, $ionicHistory, $window, customerWashtypeSvr, customerOrderMakeSvr, customerOrderSvr, regionSvr, autoSvr, APP_CONFIG) {


        var typeSelect = $stateParams.typeSelect;
        /*数据区*/
        $scope.order = {
            washTypeId: [],
            userId: $window.localStorage['userID'],
            autoId: '',
            regionId: '',
            orgId: '',/*洗车店，需要？*/
            userNote: '',/*用户订单备注*/
            orderTime: '',
            couponId: [],/*优惠券*/
            couponAmount: [],/*优惠券金额*/
            fixedAmount: [],
            channel: ''/*支付方式*/
        };

        $scope.types = [];
        $scope.selectedAuto = {};

        $scope.districts = regionSvr.getDistricts();
        /*获取地域信息*/
        regionSvr.doRequest().then(
            function (data) {
                if ($scope.districts == undefined) {
                    regionSvr.getCitiesFromData(data);
                    $scope.districts = regionSvr.getDistricts();
                }

                autoSvr.getAuto().then(
                    function (data) {
                        $scope.autoInfo = data.rows;

                        if ($scope.autoInfo.length == 0) {

                        } else {
                            /*选择的车辆、小区索引*/
                            var indexOfAuto = 0;
                            var indexOfRegion = 0;

                            if (typeSelect == undefined) {
                                $scope.selectedAuto.selectedAutoId = customerOrderSvr.getSelectedAutoId();;
                                $scope.selectedAuto.selectedRegionId = customerOrderSvr.getSelectedRegionId();
                                if ($scope.selectedAuto.selectedAutoId == undefined || $scope.selectedAuto.selectedRegionId == undefined) {
                                    $scope.selectedAuto.selectedAutoId = $scope.autoInfo[0].id;
                                    $scope.selectedAuto.selectedRegionId = $scope.autoInfo[0].defaultRegionId;
                                }
                            } else {

                                $scope.selectedAuto.selectedAutoId = customerOrderSvr.getSelectedAutoId();

                                for (var i = 0; i < $scope.autoInfo.length; i++) {
                                    if ($scope.selectedAuto.selectedAutoId == $scope.autoInfo[i].id) {
                                        indexOfAuto = i;
                                    }
                                }
                                if (typeSelect == 'auto') {
                                    $scope.selectedAuto.selectedRegionId = $scope.autoInfo[indexOfAuto].defaultRegionId;

                                } else {
                                    $scope.selectedAuto.selectedRegionId = customerOrderSvr.getSelectedRegionId();
                                }
                            }
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
            },
            function (data) {
                console.log(data);
            }
        );


        /*跳转到洗车类型选择*/
        $scope.goToWashType = function () {
            $state.go('customerWashtype');
        }
        /*跳转到车辆选择*/
        $scope.goToAutoList = function () {
            $state.go('customerAutoList');
        }
        /*跳转到小区选择*/
        $scope.goToRegionSelect = function () {
            $state.go('customerRegionSelect');
        }
        /*跳转到预约时间选择*/
        $scope.goToOrderTime = function () {
            $state.go('customerOrderTime');
        }
        /*预约洗车回转*/
        $scope.goBackMain = function () {
            $state.go('customerHome');
        }
        /*(洗车类型、车辆选择、小区选择、时间预约)*/
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        /*提交订单*/
        $scope.commitOrder = function () {
            /*选择支付方式*/
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '支付宝' },
                    { text: '微信支付' },
                    { text: '银联支付' },
                    { text: '易宝支付' },
                    { text: '京东支付' },
                    { text: 'Apple Pay' }
                ],
                titleText: '选择支付方式',
                cancelText: '取消',
                cancel: function () {
                    /*取消选择*/
                },
                buttonClicked: function (index) {
                    switch (index) {
                        case 0:/*支付宝*/
                            $scope.order.channel = 'alipay';
                            break;
                        case 1:/*微信支付*/
                            $scope.order.channel = 'wx';
                            break;
                        case 2:/*银联支付*/
                            $scope.order.channel = 'upacp';
                            break;
                        case 3:/*易宝支付*/
                            $scope.order.channel = 'yeepay_wap';
                            break;
                        case 4:/*京东支付*/
                            $scope.order.channel = 'jdpay_wap';
                            break;
                        case 5:/*Apple Pay*/
                            $scope.order.channel = 'apple_pay';
                            break;
                    }
                }
            });
            /*获取洗车类型*/
            if ($scope.types == undefined) {
                return;
            }
            for (var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].check = 1) {
                    $scope.order.washTypeId.push($scope.types[i].id);
                    $scope.order.fixedAmount.push($scope.types[i].amount);
                }
            }
            /*获取车辆Id,小区Id*/
            $scope.order.autoId = $scope.selectedAuto.selectedAutoId;
            $scope.order.regionId = $scope.selectedAuto.selectedRegionId;

            customerOrderMakeSvr.commitOrder($scope.order).then(
                 function (data) {
                     //根据data内的数据判断时候成功
                     if (data.isSuccess) {
                         console.log('提交成功');
                     }
                 },
                 function (data) {
                     console.log(data);
                 });
        }

        /*************************洗车类型******************************/


        $scope.updateWashTypes = function () {
            $scope.totalAmount = 0;
            $scope.types = customerOrderSvr.getTypes();
            if ($scope.types == undefined) {
                customerWashtypeSvr.callWashType().then(
                    function (data) {
                        $scope.types = data.rows;
                        /*1表示选中，2表示未选中，‘快洗’设置为选中，其他默认未未选中*/
                        for (var i = 0; i < data.rows.length; i++) {
                            if (i == 0) {
                                $scope.types[i].check = 1;
                                $scope.totalAmount = $scope.types[i].amount;
                            } else {
                                $scope.types[i].check = 2;
                            }

                        }
                        customerWashtypeSvr.setWashTypes($scope.types);
                    },
                    function (data) {
                        console.log(data);
                    }
                );
            } else {
                for (var i = 0; i < $scope.types.length; i++) {
                    if ($scope.types[i].check == 1) {
                        $scope.totalAmount += $scope.types[i].amount;
                    }
                }
                $scope.totalAmount = $scope.totalAmount.toFixed(2);
            }
        }
        $scope.updateWashTypes();

        /*返回预定洗车界面*/
        $scope.goBackOfWashType = function () {
            customerOrderSvr.setType($scope.types);
            $state.go("customerOrderMake");
        }
        /***************************************************************/
        /*************************车辆选择******************************/

        /*下拉刷新*/
        $scope.doRefresh = function () {
            autoSvr.getAuto().then(
            function (data) {
                $scope.autoInfo = data.rows;
                console.log("获取车辆成功" + data.rows.length);
            }, function (data) {
                console.log(data);
            }
            );
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.goToAddauto = function () {
            $state.go('customerAutoAdd', { 'backName': 'customerAutoList' });
        }
        $scope.goBackOfAuto = function () {
            /*保存在service*/
            customerOrderSvr.setSelectedAutoId($scope.selectedAuto.selectedAutoId);
            /*跳转*/
            $state.go("customerOrderMake", { 'typeSelect': 'auto' });
        }
        /***************************************************************/
        /*****************************小区选择**************************/
        $scope.doRefreshOfRegion = function () {
            $scope.districts = regionSvr.getDistricts();
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.goBackOfRegionSelect = function () {
            /*保存到service*/
            customerOrderSvr.setSelectedRegionId($scope.selectedAuto.selectedRegionId);
            $state.go('customerOrderMake', { 'typeSelect': 'region' });
        }
        /***************************************************************/
        /****************************预约时间***************************/

        $scope.timeSpots = APP_CONFIG.bookTime.getTimeSpots();
        /***************************************************************/
    }])