angular.module('udqApp')
   .controller('employeeOrderInfoCtrl', ['$scope', '$ionicPopup', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', 'APP_CONFIG', function ($scope,$ionicPopup, $window, $state, $ionicHistory, employeeOrderSvr, APP_CONFIG) {

       //var baseUrl = APP_CONFIG.server.getUrl();
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
       if ($scope.order.gradeUserNote == "" || $scope.order.gradeUserNote == undefined) {
           $scope.order.gradeUserNote = "无";
       }

       /*点击缩略图-跳转到大图*/
       $scope.gotoPhoto = function (No) {
           if ($scope.order['photoUrl' + No] == 'image/break.png') {
               return;
           }
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