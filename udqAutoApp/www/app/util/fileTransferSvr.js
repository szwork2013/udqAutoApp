/*提供照相服务*/
angular.module('udqApp')
    .service('fileTransferSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {
        var baseUrl = APP_CONFIG.server.getUrl();
        /*
        上传洗车照片
        imgURI,文件路径 来自于getPicture返回的imgURI
        params:参数，一般要包括orderId

        */
        this.uploadWashPhoto = function (imgURI,params,No, successCallBack, failCallBack, progressCallBack) {

            var svrURI = encodeURI(APP_CONFIG.server.getUrl() + "upload/addWashPhoto4App.do");

            var opts = new FileUploadOptions();

            opts.fileKey = "washPhoto";
            //opts.fileName = imgURI.substr(imgURI.lastIndexOf('/') + 1);
            opts.fileName = params.orderNo + '_' + No;
            opts.mimeType = "image/jpeg";
            opts.params = params;   
            var ft = new FileTransfer();

            ft.upload(imgURI, svrURI, successCallBack, failCallBack, opts);
            ft.onprogress = progressCallBack;


        }

    }])