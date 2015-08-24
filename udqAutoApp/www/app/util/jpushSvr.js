angular.module('udqApp')
    .service('jpushSvr', ['$scope', function ($scope) {
        /*初始化*/
        this.init = function () {
            window.plugins.jPushPlugin.init();
        }
        /*设置别名*/
        this.setAlias = function (id) {
            window.plugins.jPushPlugin.setAlias(id);
        }
        /*获取点击通知内容*/
        this.openNotification = function () {
            window.plugins.jPushPlugin.resetBadge();
        }
        
    }])