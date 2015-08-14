﻿/*提供照相服务*/
angular.module('udqApp')
    .service('fileTransferSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {

        /*
        上传洗车照片
        imgURI,文件路径 来自于getPicture返回的imgURI
        params:参数，一般要包括orderId

        */
        this.uploadWashPhoto = function (imgURI,params, successCallBack, failCallBack, progressCallBack) {

            var svrURI = encodeURI(APP_CONFIG.server.getUrl() + "fzmgr/upload/addWashPhoto.do");

            var opts = new FileUploadOptions();

            opts.fileKey = "washPhoto";
            opts.fileName = imgURI.substr(imageURI.lastIndexOf('/') + 1);
            opts.mimeType = "image/jpeg";
            opts.params = params;   
            var ft = new FileTransfer();

            ft.upload(imageURI, svrURI, successCallBack, failCallBack, fileUploadOptions);
            ft.onprogress = progressCallBack;


        }

    }])