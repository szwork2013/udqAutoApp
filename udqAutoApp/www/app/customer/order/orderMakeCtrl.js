angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$state', '$ionicHistory', '$window', 'customerWashtypeSvr', 'customerOrderMakeSvr', 'customerOrderSvr', 'regionSvr', 'autoSvr', function ($scope, $state, $ionicHistory, $window, customerWashtypeSvr, customerOrderMakeSvr, customerOrderSvr, regionSvr, autoSvr) {


        $scope.order = {
            washTypeId: '',
            userId: '',
            autoId: '',
            regionId: '',
            orgId: '',/*洗车店，需要？*/
            userNote: '',/*用户订单备注*/
            orderTime: '',
            couponId: '',/*优惠券*/
            couponAmount: '',/*优惠券金额*/
            fixedAmount: ''
        };

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
            customerOrderMakeSvr.commitOrder(order).then(
                 function (data) {
                     //根据data内的数据判断时候成功
                 },
                 function (data) {
                     console.log(data);
                 });
        }

        /*************************洗车类型******************************/
        $scope.types = [];
        /*选中的洗车类型数组和类型ID数组*/
        $scope.selectedTypes = customerOrderSvr.getTypes();
        $scope.selectedTypeId = customerOrderSvr.getTypeId();

        $scope.updateWashTypes = function () {
            customerWashtypeSvr.callWashType().then(
                function (data) {
                    $scope.types = data.rows;
                    customerWashtypeSvr.setWashTypes($scope.types);
                },
                function (data) {
                    console.log(data);
                }
            );
        }
        $scope.updateWashTypes();

        /*选取洗车类型*/
        $scope.selectwashTypes = function ($event, type) {
            var checkbox = $event.target;
            var index = $scope.selectedTypeId.indexOf(type.id);

            /*选中状态并且之前未被选中过*/
            if (checkbox.checked && index == 1) {
                $scope.selectedTypes.push(type);
                $scope.selectedTypeId.push(type.id);

            } else if (!checkbox.checked && index > 1) {
                /*取消选中状态并且之前选中过*/

                $scope.selectedTypes.splice(index, 1);
                $scope.selectedTypeId.splice(index, 1);
            }
        }
        $scope.goBackOfWashType = function () {
            customerOrderSvr.setType($scope.selectedTypes, $scope.selectedTypeId);
            $state.go("customerOrderMake");
        }
        /***************************************************************/
        /*************************车辆选择******************************/

        $scope.autoInfo = [];
        $scope.pn = customerOrderSvr.getPN();
        /*获取userId为2*/
        var promise = autoSvr.getAuto(2);
        promise.then(
            function (data) {
                $scope.autoInfo = data.rows;
                console.log("amount:" + data.rows.length);
            }, function (data) {
                console.log(data);
            }
        );
        $scope.goToAddauto = function () {
            $state.go('customerAutoAdd');
        }
        $scope.goBackOfAuto = function () {
            customerOrderSvr.setAutoPN($scope.pn);
            $state.go("customerOrderMake");
        }
        /***************************************************************/
        /*****************************小区选择**************************/
        $scope.districts = regionSvr.getDistricts();
        /***************************************************************/
        /****************************预约时间***************************/

        $scope.timeSpots = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
        /***************************************************************/
    }])