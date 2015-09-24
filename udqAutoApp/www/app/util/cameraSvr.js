/*提供照相服务*/
angular.module('udqApp')
    .service('cameraSvr', ['$q', 'APP_CONFIG',function ($q, APP_CONFIG) {


        /*
        获取照片
        success ：成功的回调函数，有一个imageURI 参数，表示照片路径
        fail:失败的回调函数，有一个message 参数，表示错误信息
        quality:照片质量:一般设定50.
        */
        //this.getPicture = function (imgQuality, successCallBack, failCallBack) {

        //    navigator.camera.getPicture(successCallBack, failCallBack, {
        //        quality: imgQuality,
        //        destinationType: navigator.camera.DestinationType.FILE_URL,
        //        encodingType: navigator.camera.EncodingType.JPEG,
        //        //mediaType: navigator.camera.MediaType.PICTURE,
        //        //sourceType: navigator.camera.PictureSourceType.CAMERA,
        //        ////popoverOptions: CameraPopoverOptions,
        //        //saveToPhotoAlbum: true
        //    });
        //}
        //调用相机拍照
        this.takePhoto = function (imgQuality, successCallBack, failCallBack) {

            navigator.camera.getPicture(successCallBack, failCallBack, {
                quality: imgQuality,
                destinationType: navigator.camera.DestinationType.FILE_URI
            });
        }
        //从手机相册选取
        this.getPhoto = function (imgQuality, successCallBack, failCallBack) {

            navigator.camera.getPicture(successCallBack, failCallBack, {
                quality: imgQuality,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
            });
        }



    }])