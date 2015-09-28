angular.module('udqApp')
   .controller('employeePhotographCtrl', ['$scope', '$window', '$state', '$ionicHistory', 'employeeOrderSvr', 'cameraSvr', '$ionicActionSheet', 'fileTransferSvr', 'popUpSvr', function ($scope, $window, $state, $ionicHistory, employeeOrderSvr, cameraSvr, $ionicActionSheet, fileTransferSvr, popUpSvr) {

       $scope.order = employeeOrderSvr.getSelectedOrder();
       if ($scope.order.photoUrl1 == "") {
           $scope.order.photoUrl1 = 'image/break.png';
       }
       if ($scope.order.photoUrl2 == "") {
           $scope.order.photoUrl2 = 'image/break.png';
       }
       if ($scope.order.photoUrl3 == "") {
           $scope.order.photoUrl3 = 'image/break.png';
       }
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
                                   popUpSvr.showAlert('该用户不存在，消息推送失败！');
                               }
                           }
                       },
                     function (data) {
                         console.log(data.msg);
                     });
       }
       /*删除照片*/
       $scope.delete = function (No) {
           if ($scope.order['photoUrl' + No] == '../../image/break.png') {
               return;
           }
           var image = document.getElementById("img" + No);
           image.src = "../../image/break.png";
           //删除Svr中保存的photoUrl
           switch (No) {
               case 1:
                   $scope.order.photoUrl1 = "image/break.png"; break;
               case 2:
                   $scope.order.photoUrl2 = "image/break.png"; break;
               case 3:
                   $scope.order.photoUrl3 = "image/break.png"; break;
           }
           employeeOrderSvr.setSelectedOrder($scope.order);
           //删除后台照片，更新数据库
           employeeOrderSvr.deletePhoto($scope.order.orderNo, No);
           $scope.doRefresh();
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
       /*下拉刷新*/
       $scope.doRefresh = function () {
           $scope.order = employeeOrderSvr.getSelectedOrder();
           $scope.$broadcast('scroll.refreshComplete');
       }

       $scope.showActionsheet = function (No) {
           $ionicActionSheet.show({
               cancelText: '取消',
               buttons: [{ text: '拍照', type:"button-light" }, { text: '从相册中选取' }],
               cancel: function () { console.log("cancel"); },
               buttonClicked: function (index) {
                   switch (index) {
                       case 0: $scope.takePhoto(No); break;
                       case 1: $scope.getPhoto(No); break;
                       default: concel(); break;
                   }
                   return true;
               }
           });
       };
       function concel() {
           console.log("cancel");
       }
       function cFail(message) {
           console.log(message);
       }
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
       /*拍照上传*/
       $scope.takePhoto = function (No) {
           
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
           cameraSvr.takePhoto(30, cSuccess, cFail);
       }
       //从手机相册选择
       $scope.getPhoto = function (No) {
           
           function cSuccess(imgURI) {
               var params = $scope.order;
               var image = document.getElementById("img" + No);
               image.src = imgURI;
               /*拍照后将imgURI临时保存到order中*/
               switch (No) {
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
           cameraSvr.getPhoto(30, cSuccess, cFail);
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