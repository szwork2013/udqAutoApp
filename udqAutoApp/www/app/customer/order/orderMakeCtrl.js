angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$window', 'customerWashtypeSvr', 'customerOrderMakeSvr', 'customerOrderSvr', 'regionSvr', 'autoSvr', 'APP_CONFIG', function ($scope, $stateParams, $state, $ionicHistory, $window, customerWashtypeSvr, customerOrderMakeSvr, customerOrderSvr, regionSvr, autoSvr, APP_CONFIG) {


        var typeSelect = $stateParams.typeSelect;
        /*������*/
        $scope.order = {
            washTypeId: [],
            userId: $window.localStorage['userID'],
            autoId: '',
            regionId: '',
            orgId: '',/*ϴ���꣬��Ҫ��*/
            userNote: '',/*�û�������ע*/
            orderTime: '',
            couponId: [],/*�Ż�ȯ*/
            couponAmount: [],/*�Ż�ȯ���*/
            fixedAmount: []
        };

        $scope.types = [];
        $scope.selectedAuto = {};

        $scope.districts = regionSvr.getDistricts();
        /*��ȡ������Ϣ*/
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
                            /*ѡ��ĳ�����С������*/
                            var indexOfAuto = 0;
                            var indexOfRegion = 0;

                            if (typeSelect == undefined) {
                                $scope.selectedAuto.selectedAutoId = customerOrderSvr.getSelectedAutoId();;
                                $scope.selectedAuto.selectedRegionId = customerOrderSvr.getSelectedRegionId(); 
                                if ($scope.selectedAuto.selectedAutoId == undefined || $scope.selectedAuto.selectedRegionId==undefined) {
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
            /*��ȡϴ������*/
            if ($scope.types == undefined) {
                return;
            }
            for (var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].check = 1) {
                    $scope.order.washTypeId.push($scope.types[i].id);
                    $scope.order.fixedAmount.push($scope.types[i].amount);
                }
            }
            /*��ȡ����Id,С��Id*/
            $scope.order.autoId = $scope.selectedAuto.selectedAutoId;
            $scope.order.regionId = $scope.selectedAuto.selectedRegionId;
            
            customerOrderMakeSvr.commitOrder($scope.order).then(
                 function (data) {
                     //����data�ڵ������ж�ʱ��ɹ�
                     if (data.isSuccess) {
                         console.log('�ύ�ɹ�');
                     }
                 },
                 function (data) {
                     console.log(data);
                 });
        }

        /*************************ϴ������******************************/


        $scope.updateWashTypes = function () {
            $scope.types = customerOrderSvr.getTypes();
            if ($scope.types == undefined) {
                customerWashtypeSvr.callWashType().then(
                    function (data) {
                        $scope.types = data.rows;
                        /*1��ʾѡ�У�2��ʾδѡ�У�����ϴ������Ϊѡ�У�����Ĭ��δδѡ��*/
                        for (var i = 0; i < data.rows.length; i++) {
                            if (i == 0) {
                                $scope.types[i].check = 1;
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
            }
        }
        $scope.updateWashTypes();

        /*����Ԥ��ϴ������*/
        $scope.goBackOfWashType = function () {
            customerOrderSvr.setType($scope.types);
            $state.go("customerOrderMake");
        }
        /***************************************************************/
        /*************************����ѡ��******************************/

        /*����ˢ��*/
        $scope.doRefresh = function () {
            autoSvr.getAuto().then(
            function (data) {
                $scope.autoInfo = data.rows;
                console.log("��ȡ�����ɹ�" + data.rows.length);
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
            /*������service*/
            customerOrderSvr.setSelectedAutoId($scope.selectedAuto.selectedAutoId);
            /*��ת*/
            $state.go("customerOrderMake", { 'typeSelect': 'auto' });
        }
        /***************************************************************/
        /*****************************С��ѡ��**************************/
        $scope.doRefreshOfRegion = function () {
            $scope.districts = regionSvr.getDistricts();
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.goBackOfRegionSelect = function () {
            /*���浽service*/
            customerOrderSvr.setSelectedRegionId($scope.selectedAuto.selectedRegionId);
            $state.go('customerOrderMake', { 'typeSelect': 'region' });
        }
        /***************************************************************/
        /****************************ԤԼʱ��***************************/

        $scope.timeSpots = APP_CONFIG.bookTime.getTimeSpots();
        /***************************************************************/
    }])