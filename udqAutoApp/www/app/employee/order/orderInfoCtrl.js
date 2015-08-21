angular.module('udqApp')
   .controller('employeeOrderInfoCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', 'APP_CONFIG', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr,APP_CONFIG) {
       var baseUrl = APP_CONFIG.server.getUrl();
       $scope.order = employeeOrderSvr.getSelectedOrder();
       $scope.order.photoUrl1 = baseUrl +"fzmgr/"+ $scope.order.photoUrl1;
       $scope.order.photoUrl2 = baseUrl + "fzmgr/" + $scope.order.photoUrl2;
       $scope.order.photoUrl3 = baseUrl + "fzmgr/" + $scope.order.photoUrl3;

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