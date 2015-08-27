angular.module('udqApp')
   .controller('employeePhotographCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', 'cameraSvr', '$ionicPopup', 'fileTransferSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr, cameraSvr, $ionicPopup, fileTransferSvr) {
      
       $scope.order = employeeOrderSvr.getSelectedOrder();
       //$scope.imgUrlInfo = employeeOrderSvr.getImgUrlInfo();
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
                               if (data.msg == "操作失败") {
                                   showAlert('消息推送失败！');
                               }
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
           //删除Svr中保存的photoUrl
           switch (No) {
               case 1:
                   $scope.order.photoUrl1 = ""; break;
               case 2:
                   $scope.order.photoUrl2 = ""; break;
               case 3:
                   $scope.order.photoUrl3 = ""; break;
           }
           employeeOrderSvr.setSelectedOrder($scope.order);
           //删除后台照片，更新数据库
           employeeOrderSvr.deletePhoto($scope.order.orderNo, No);
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
       /*下拉刷新*/
       $scope.doRefresh = function () {
           $scope.order = employeeOrderSvr.getSelectedOrder();
           $scope.$broadcast('scroll.refreshComplete');
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
               /*拍照候将imgURI临时保存到order中*/
               switch(No){
                   case 1:
                       $scope.order.photoUrl1 = imgURI;
                       break;
                   case 2:
                       $scope.order.photoUrl2 = imgURI;
                       break;
                   case 3:
                       $scope.order.photoUrl3 = imgURI;
                       break;
               }
               employeeOrderSvr.setSelectedOrder($scope.order);
               /*上传图片到服务器*/
               fileTransferSvr.uploadWashPhoto(imgURI, params, No, tSuccess, tFail, tProgress)

           }
           function cFail(message) {
               console.log(message);
           }
           cameraSvr.getPicture(30, cSuccess, cFail);
       }

       $scope.goBackToOrder = function () {
           $state.go('employeeOrderList.acceptedOrder');
       }
       /*提示窗*/
       var showAlert = function (msg) {
           var alertPopup = $ionicPopup.alert({
               title: '温馨提示',
               template: msg
           });
           alertPopup.then(function (res) {
               console.log(msg);
           });
       };
   }])