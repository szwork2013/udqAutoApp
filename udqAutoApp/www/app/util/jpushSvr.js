angular.module('udqApp')
    .service('jpushSvr', [function () {
        /*开启推送服务*/
        this.init = function () {
            try {
                //由于phonegap插件采用了Lazy load的特性，   所以这里建议在js文件能执行的最开始就加
                window.plugins.jPushPlugin.init();
                /*设置调试模式*/
                if (device.platform != "Android") {
                    window.plugins.jPushPlugin.setDebugModeFromIos();
                    window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                } else {
                    window.plugins.jPushPlugin.setDebugMode(true);
                }
            } catch (exception) {
                console.log(exception);
            }
            
        }
        /*停止极光推送服务*/
        this.stopPush = function(){
            window.plugins.jPushPlugin.stopPush();
        }
        /*恢复推送服务*/
        this.resumePush = function(){
            window.plugins.jPushPlugin.resumePush();
        }
        /*设置标签和别名*/
        this.setTagsWithAlias = function (tags, alias) {
            window.plugins.jPushPlugin.setTagsWithAlias(tags, alias);
        }
        /*获取点击通知内容*/
        this.openNotification = function () {
            if (window.plugins.jPushPlugin.isPlatformIOS()) {
                /*复位Badge*/
                window.plugins.jPushPlugin.resetBadge();
            } else {
                /*清除通知*/
                window.plugins.jPushPlugin.clearLocalNotifications();
            }
            
        }
        
    }])