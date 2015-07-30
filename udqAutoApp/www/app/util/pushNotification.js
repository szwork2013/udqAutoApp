angular.module('udqApp')
    .factory('jPush', function () {
        var isPushNotify;
        return {
            setBadge: function (badge) {
                if (isPushNotify) {
                    console.log('jpush: set badge', badge);
                    puglings.jpush.setBadge(badge);
                }
            },
            setAlias: function (alias) {
                if (isPushNotify) {
                    console.log('jpush: set alias', alias);
                    plugins.jPushPlugin.setAlias(alias);
                }
            },
            check: function () {
                if (window.jpush && push) {
                    plugins.jPushPlugin.receiveNotificationIniOSCallback(window.jpush);
                    window.jpush = null;
                }
            },
            init: function (notificationCallback) {
                console.log('jpush: start init-----------------------');
                isPushNotify = window.plugins && window.plugins.jPushPlugin;
                if (isPushNotify) {
                    console.log('jpush: init');
                    plugins.jPushPlugin.init();
                    plugins.jPushPlugin.setDebugMode(true);
                    plugins.jPushPlugin.openNotificationInAndroidCallback = notificationCallback;
                    plugins.jPushPlugin.receiveNotificationIniOSCallback = notificationCallback;
                }
            }
        };
    })