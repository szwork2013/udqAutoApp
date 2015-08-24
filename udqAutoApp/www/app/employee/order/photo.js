angular.module('udqApp')
   .controller('employeePhotoCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr) {
       var src = employeeOrderSvr.getImgSrc();
       var pho = document.getElementById("photo");
       pho.src = src;
       $scope.goBack = function () {
           $ionicHistory.goBack();
       }
   }])