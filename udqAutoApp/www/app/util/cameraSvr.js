/*提供照相服务*/
angular.module('udqApp')
    .service('cameraSvr', ['$q', 'APP_CONFIG',function ($q, APP_CONFIG) {

        //function onPhotoSuccess(imageURI) {

        //    var serverURI = encodeURI(APP_CONFIG.server.getUrl() + "fzmgr/upload/addWashPhoto.do");

        //    var fileUploadOptions = new FileUploadOptions();

        //    fileUploadOptions.fileKey = "carPhoto";
        //    fileUploadOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        //    fileUploadOptions.mimeType = "image/jpeg";
        //    //fileUploadOptions.chunkedMode = false;

        //    //fileUploadOptions.headers = {
        //    //    Connection: "close"
        //    //};

        //    function tfSuccess(result) {
        //        $ionicPopup.alert({
        //            title: '提示',
        //            template: 'ok!'
        //        });
        //    }

        //    function tfFail(error) {
        //        $ionicPopup.alert({
        //            title: '提示',
        //            template: '失败!' +JSON.stringify(error)
        //        });
        //    }

        //    var fileTransfer = new FileTransfer();


        //    fileTransfer.upload(imageURI, serverURI, tfSuccess, tfFail, fileUploadOptions);

        //}

        //function onPhotoFail(message) {
        //    $ionicPopup.alert({
        //        title: '提示',
        //        template: message
        //    });
        //}

        //function onGetPictureSuccess(imageData) {
        //    var serverURI = encodeURI(APP_CONFIG.server.getUrl() + "fzmgr/upload/addWashPhoto4App.do");

        //    $http({
        //        method: 'post',
        //        url: serverURI,
        //        data: {
        //            orderId: 101,
        //            imgData: imageData,
        //            imgType: 'jpg'
        //        }
        //    }).success(function (data, status, headers, config) {
        //        $ionicPopup.alert({
        //            title: '提示',
        //            template: JSON.stringify(data)
        //        });
        //    }).error(function (data, status, headers, config) {
        //        $ionicPopup.alert({
        //            title: '提示',
        //            template: JSON.stringify(data)
        //        });
        //    });
        //}

        //this.getPhoto = function () {
        //    var deferred = $q.defer();

        //    navigator.camera.getPicture(onGetPictureSuccess, onPhotoFail, {
        //        quality: 25,
        //        destinationType: navigator.camera.DestinationType.DATA_URL,
        //        encodingType: navigator.camera.EncodingType.JPEG,
        //        mediaType: navigator.camera.MediaType.PICTURE,
        //        sourceType: navigator.camera.PictureSourceType.CAMERA,
        //        //popoverOptions: CameraPopoverOptions,
        //        saveToPhotoAlbum: true
        //    });
        //}

        /*
        获取照片
        success ：成功的回调函数，有一个imageURI 参数，表示照片路径
        fail:失败的回调函数，有一个message 参数，表示错误信息
        quality:照片质量:一般设定50.
        */
        this.getPicture = function (imgQuality, successCallBack, failCallBack) {

            navigator.camera.getPicture(successCallBack, failCallBack, {
                quality: imgQuality,
                destinationType: navigator.camera.DestinationType.FILE_URL,
                encodingType: navigator.camera.EncodingType.JPEG,
                mediaType: navigator.camera.MediaType.PICTURE,
                sourceType: navigator.camera.PictureSourceType.CAMERA,
                //popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            });
        }


    }])