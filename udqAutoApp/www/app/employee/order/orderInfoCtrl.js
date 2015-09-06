angular.module('udqApp')
   .controller('employeeOrderInfoCtrl', ['$scope', '$ionicPopup', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', 'APP_CONFIG', 'networkInfoSvr', function ($scope,$ionicPopup, $window, $state, $ionicHistory, employeeOrderSvr, APP_CONFIG, networkInfoSvr) {

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

       var baseUrl = APP_CONFIG.server.getUrl();
       $scope.order = employeeOrderSvr.getSelectedOrder();
       if ($scope.order.couponName == "") {
           $scope.order.couponName = "未使用优惠券";
       }
       if ($scope.order.userNote == "") {
           $scope.order.userNote = "无";
       }
       if ($scope.order.customerGrade == "") {
           $scope.order.customerGrade = "无";
       }

       /*点击缩略图-跳转到大图*/
       $scope.gotoPhoto = function (No) {
           var image = document.getElementById("img" + No);
           employeeOrderSvr.setImgSrc(image.src);
           if (image.naturalHeight == 0 && image.naturalWidth  == 0) {
               return;
           } else {
               $state.go("employeePhoto");
           }
       }
       $scope.goBack = function () {
           $ionicHistory.goBack();
       };
   }])