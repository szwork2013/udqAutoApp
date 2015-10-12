angular.module('udqApp')
    .controller('customerWashShopCtrl', ['$scope', '$window', '$state', 'APP_CONFIG', '$ionicNavBarDelegate', 'customerMemberInfoSvr', function ($scope, $window, $state, APP_CONFIG, $ionicNavBarDelegate, customerMemberInfoSvr) {
        var baseUrl = APP_CONFIG.server.getUrl();
        /*洗车店信息-获取信息*/
        customerMemberInfoSvr.getWashShopInfo($window.localStorage['userID']).then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows[0] != null) {
                        $scope.hasNoAuto = false;
                        $scope.washShopInfo = data.rows;
                        for (var i = 0; i < $scope.washShopInfo.length; i++) {
                            if ($scope.washShopInfo[i].photoUrl == "" || $scope.washShopInfo[i].photoUrl == undefined || $scope.washShopInfo[i].photoUrl == null) {
                                $scope.washShopInfo[i].photoUrl = "image/mydianqu.png";
                            } else {
                                $scope.washShopInfo[i].photoUrl = baseUrl + $scope.washShopInfo[i].photoUrl;
                            }
                        }
                    } else {
                        $scope.hasNoAuto = true;
                    }

                } else {
                    console.log(data.msg);
                }

            },
            function (data) {
                console.log(data);
            });
        /*返回我的点趣*/
        $scope.goToCenter = function () {
            //$state.go('customerMyDQ');
            $ionicNavBarDelegate.back();
        }
    }])