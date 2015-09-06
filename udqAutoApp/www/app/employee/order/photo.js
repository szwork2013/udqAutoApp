angular.module('udqApp')
   .controller('employeePhotoCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', 'networkInfoSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr, networkInfoSvr) {
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


       var src = employeeOrderSvr.getImgSrc();
       var pho = document.getElementById("photo");
       pho.src = src;
       $scope.goBack = function () {
           $ionicHistory.goBack();
       }
   }])