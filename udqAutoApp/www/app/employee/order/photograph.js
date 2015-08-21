angular.module('udqApp')
   .controller('employeePhotographCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', 'cameraSvr', '$ionicPopup', 'fileTransferSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr, cameraSvr, $ionicPopup, fileTransferSvr) {
       
       $scope.order = employeeOrderSvr.getSelectedOrder();
       /*完成按钮*/
       $scope.finish = function () {
           employeeOrderSvr.finishOrder($scope.order)
               .then(
                       function (data) {
                           if (data.isSuccess) {
                               console.log("操作成功");
                               $state.go('employeeOrderList.acceptedOrder');
                           } else {
                               console.log(data.msg);
                           }
                       },
                     function (data) {
                         console.log(data.msg);
                     });
       }
       /*删除照片*/
       $scope.delete = function (No) {
           var image = document.getElementById("img" + No);
           image.src = "";
           //image.style.display = "none";
           //var currentBtn = document.getElementById("btn" + No);
           //currentBtn.style.display = "block";
           $scope.doRefresh();
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
       $scope.doRefresh = function () {
           //employeeOrderSvr.getSelectedOrder().then(
           //function (data) {
           //    $scope.order = data;
           //    console.log("成功刷新");
           //},
           //function (data) {
           //    console.log(data);
           //});
           //$scope.$broadcast('scroll.refreshComplete');
       }
       /*拍照上传*/
       $scope.takePhoto = function (No) {
           /*
               传输成功
               */
           function tSuccess(result) {
               console.log(result);
           }
           /*
           传输失败
           */
           function tFail(error) {
               console.log(error);
           }
           /*
           传输进度
           */
           function tProgress(event) {

           }
           function cSuccess(imgURI) {
               var params = $scope.order;
               var image = document.getElementById("img"+No);
               image.src = imgURI;
               //image.style.display = "block";
               //var currentBtn = document.getElementById("btn"+No);
               //currentBtn.style.display = "none";
               fileTransferSvr.uploadWashPhoto(imgURI, params, No, tSuccess, tFail, tProgress)

           }
           function cFail(message) {
               console.log(message);
           }
           cameraSvr.getPicture(50, cSuccess, cFail);
       }

       $scope.goBackToOrder = function () {
           $state.go('employeeOrderList.acceptedOrder');
       }
   }])