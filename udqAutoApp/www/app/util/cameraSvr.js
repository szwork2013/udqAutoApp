/*提供照相服务*/
angular.module('udqApp')
    .service('cameraSvr', ['$http', '$q', 'APP_CONFIG','$ionicPopup', function ($http, $q, APP_CONFIG,$ionicPopup) {

        function onPhotoSuccess(imageURI) {

            var serverURI = encodeURI(APP_CONFIG.server.getUrl() + "upload/addWashPhoto.do");

            var fileUploadOptions = new FileUploadOptions();

            fileUploadOptions.fileKey = "carPhoto";
            fileUploadOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            fileUploadOptions.mimeType = "image/jpeg";

            //    fileUploadOptions.chunkedMode = false;

            function tfSuccess(result) {
                $ionicPopup.alert({
                    title: '提示',
                    template: 'ok!'
                });
            }

            function tfFail(error) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '失败!' +JSON.stringify(error)
                });
            }

            var fileTransfer = new FileTransfer();


            fileTransfer.upload(imageURI, serverURI, tfSuccess, tfFail, fileUploadOptions);

        }

        function onPhotoFail(message) {
            $ionicPopup.alert({
                title: '提示',
                template: message
            });
        }

        this.getPhoto = function () {

            navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, {
                quality: 25,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                encodingType: navigator.camera.EncodingType.JPEG,
                mediaType: navigator.camera.MediaType.PICTURE,
                //popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            });
        }




    }])