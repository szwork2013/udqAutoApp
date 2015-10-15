angular.module('udqApp')
    .controller('customerOrderMgrController', ['$scope', '$stateParams', '$state', 'APP_CONFIG','customerOrderSvr', function ($scope, $stateParams, $state,APP_CONFIG, customerOrderSvr) {
        var baseUrl = APP_CONFIG.server.getUrl();
        $scope.selectOrder = angular.fromJson($stateParams.selectOrder);
        if ($scope.selectOrder == undefined) {
            $scope.selectOrder = customerOrderSvr.getSelectedOrder();
        }
        if ($scope.selectOrder.photoUrl1 == "") {
            $scope.selectOrder.photoUrl1 = "image/break.png";
        }
        if ($scope.selectOrder.photoUrl2 == "") {
            $scope.selectOrder.photoUrl2 = "image/break.png";
        }
        if ($scope.selectOrder.photoUrl3 == "") {
            $scope.selectOrder.photoUrl3 = "image/break.png";
        }
        if ($scope.selectOrder.userNote == "") {
            $scope.selectOrder.userNote = "无";
        }
        if ($scope.selectOrder.washerNote == "") {
            $scope.selectOrder.washerNote = "无";
        }
        //$scope.max = 5;
        //$scope.ratingVal = 0;
        //$scope.readonly = false;
        //$scope.onChange = function (val) {
        //    $scope.ratingVal = val;
        //}
        /*支付订单*/
        $scope.payOrder = function (order) {
            switch (order.payType) {
                case 1:
                    order.channel = 'alipay';
                    break;
                case 2:
                    order.channel = 'wx';
                    break;
                case 3:
                    order.channel = 'upacp';
                    break;
                default:
                    order.channel = 'alipay';
                    break;
            }
            $state.go('customerOrderpay', { 'order': angular.toJson(order), 'state': 'customerMyOrder', 'orderInfo': '' });
        }
        /*取消订单*/
        $scope.cancelOrder = function (order) {
            customerOrderSvr.cancelOrder(order).then(
                function (data) {
                    if (data.isSuccess) {
                        console.log("取消订单成功");
                        $scope.doRefresh();
                    } else {
                        console.log(data.msg);
                    }
                },
                function (data) {
                    console.log(data.msg);
                });
        }
        /*查看订单*/
        $scope.scanOrder = function (order) {
            $scope.goToSeeOrder(order);
        }

        $scope.InitPopover = function (order) {
            $scope.selectOrder = order;
            if (order.state == 4) {
                /*评价*/
                $ionicPopover.fromTemplateUrl('orderJudge.html', {
                    scope: $scope
                }).then(function (popover) {
                    $scope.popover = popover;
                });
            } else {
                /*查看*/
                $ionicPopover.fromTemplateUrl('orderShow.html', {
                    scope: $scope
                }).then(function (popover) {
                    $scope.popover = popover;
                });
            }

        }
        /*订单列表-滑动-评价-跳转到订单信息*/
        $scope.judgeOrder = function (order) {
            $scope.goToSeeOrder(order);
        }
        /*订单信息-确定-评价订单*/
        $scope.judge = function (order) {
            customerOrderSvr.judgeOrder(order).then(
                function (data) {
                    if (data.isSuccess) {
                        console.log('评价成功');
                        $scope.selectOrder.state = 5;
                        $scope.selectOrder.customerGrade = order.gradeUser;
                        $scope.selectOrder.gradeUserNote = order.gradeUserNote;
                    } else {
                        console.log(data.msg);
                    }
                },
                function (data) {
                    console.log(data);
                });
        }
        /*清空评价*/
        $scope.doClean = function () {
            $scope.selectOrder.gradeUser = 0;
        }
        /*订单信息-点击缩略图片-跳转到大图*/
        $scope.gotoPhoto = function (No) {
            if ($scope.selectOrder['photoUrl' + No] == 'image/break.png') {
                return;
            }
            var image = document.getElementById("img" + No);
            employeeOrderSvr.setImgSrc(image.src);
            if (image.naturalHeight == 0 && image.naturalWidth == 0) {
                return;
            } else {
                $state.go("employeePhoto");
            }
        }
        /*分享订单*/
        $scope.shareOrder = function () {
            $ionicActionSheet.show({
                buttons: [
                    { text: '分享至微信朋友圈' },
                    { text: '分享给微信好友' }
                ],
                titleText: '分享',
                cancelText: '取消',
                cancel: function () {
                    // 取消时执行
                },
                buttonClicked: function (index) {
                    if (index == 0) {
                        //title, desc, url, thumb
                        $scope.shareViaWechat();
                    }
                    if (index == 1) {
                        $scope.shareViaWechat();
                    }
                }

            })
        }
        $scope.shareViaWechat = function () {
            Wechat.isInstalled(function (installed) {
                alert("Wechat installed: " + (installed ? "Yes" : "No"));
            }, function (reason) {
                alert("Failed: " + reason);
            });
            var scope = "snsapi_userinfo";
            Wechat.auth(scope, function (response) {
                // you may use response.code to get the access token.
                alert(JSON.stringify(response));
            }, function (reason) {
                alert("Failed: " + reason);
            });
            Wechat.share({
                text: "This is just a test",
                scene: Wechat.Scene.TIMELINE   // share to Timeline
            }, function () {
                alert("Success");
            }, function (reason) {
                alert("Failed: " + reason);
            });
        }
        $scope.goBackOfOrderList = function () {
            $state.go('customerMyOrder');
        }
    }])
 /*评分*/
//.directive('star', function () {
//    return {
//        template: '<ul class="rating" ng-mouseleave="leave()">' +
//            '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +
//            '\u2605' +
//            '</li>' +
//            '</ul>',
//        scope: {
//            ratingValue: '=',
//            max: '=',
//            readonly: '@',
//            //onHover: '=',
//            //onLeave: '='
//        },
//        controller: function ($scope, customerOrderSvr) {
//            $scope.ratingValue = $scope.ratingValue || 0;
//            $scope.max = $scope.max || 5;
//            $scope.click = function (val) {
//                if ($scope.readonly && $scope.readonly === 'true') {
//                    return;
//                }
//                $scope.ratingValue = val;
//                customerOrderSvr.setRatingValue($scope.ratingValue);
//            };
//            //$scope.over = function (val) {
//            //    $scope.onHover(val);
//            //};
//            //$scope.leave = function () {
//            //    $scope.onLeave();
//            //}
//        },
//        link: function (scope, elem, attrs) {
//            elem.css("text-align", "center");
//            var updateStars = function () {
//                scope.stars = [];
//                for (var i = 0; i < scope.max; i++) {
//                    scope.stars.push({
//                        filled: i < scope.ratingValue
//                    });
//                }
//            };
//            updateStars();

//            scope.$watch('ratingValue', function (oldVal, newVal) {
//                if (newVal) {
//                    updateStars();
//                }
//            });
//            scope.$watch('max', function (oldVal, newVal) {
//                if (newVal) {
//                    updateStars();
//                }
//            });
//        }
//    };
//});