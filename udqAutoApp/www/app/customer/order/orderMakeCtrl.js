angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$state', '$ionicHistory', '$window', 'customerWashtypeSvr', 'customerOrderMakeSvr', 'customerOrderSvr', 'regionSvr', 'autoSvr', function ($scope, $state, $ionicHistory, $window, customerWashtypeSvr, customerOrderMakeSvr, customerOrderSvr, regionSvr, autoSvr) {


        $scope.order = {
            washTypeId: '',
            userId: '',
            autoId: '',
            regionId: '',
            orgId: '',/*ϴ���꣬��Ҫ��*/
            userNote: '',/*�û�������ע*/
            orderTime: '',
            couponId: '',/*�Ż�ȯ*/
            couponAmount: '',/*�Ż�ȯ���*/
            fixedAmount: ''
        };

        /*��ת��ϴ������ѡ��*/
        $scope.goToWashType = function () {
            $state.go('customerWashtype');
        }
        /*��ת������ѡ��*/
        $scope.goToAutoList = function () {
            $state.go('customerAutoList');
        }
        /*��ת��С��ѡ��*/
        $scope.goToRegionSelect = function () {
            $state.go('customerRegionSelect');
        }
        /*��ת��ԤԼʱ��ѡ��*/
        $scope.goToOrderTime = function () {
            $state.go('customerOrderTime');
        }
        /*ԤԼϴ����ת*/
        $scope.goBackMain = function () {
            $state.go('customerHome');
        }
        /*(ϴ�����͡�����ѡ��С��ѡ��ʱ��ԤԼ)*/
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }


        /*�ύ����*/
        $scope.commitOrder = function () {
            customerOrderMakeSvr.commitOrder(order).then(
                 function (data) {
                     //����data�ڵ������ж�ʱ��ɹ�
                 },
                 function (data) {
                     console.log(data);
                 });
        }

        /*************************ϴ������******************************/
        $scope.types = [];
        /*ѡ�е�ϴ���������������ID����*/
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

        /*ѡȡϴ������*/
        $scope.selectwashTypes = function ($event, type) {
            var checkbox = $event.target;
            var index = $scope.selectedTypeId.indexOf(type.id);

            /*ѡ��״̬����֮ǰδ��ѡ�й�*/
            if (checkbox.checked && index == 1) {
                $scope.selectedTypes.push(type);
                $scope.selectedTypeId.push(type.id);

            } else if (!checkbox.checked && index > 1) {
                /*ȡ��ѡ��״̬����֮ǰѡ�й�*/

                $scope.selectedTypes.splice(index, 1);
                $scope.selectedTypeId.splice(index, 1);
            }
        }
        $scope.goBackOfWashType = function () {
            customerOrderSvr.setType($scope.selectedTypes, $scope.selectedTypeId);
            $state.go("customerOrderMake");
        }
        /***************************************************************/
        /*************************����ѡ��******************************/

        $scope.autoInfo = [];
        $scope.pn = customerOrderSvr.getPN();
        /*��ȡuserIdΪ2*/
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
        /*****************************С��ѡ��**************************/
        $scope.districts = regionSvr.getDistricts();
        /***************************************************************/
        /****************************ԤԼʱ��***************************/

        $scope.timeSpots = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
        /***************************************************************/
    }])