
/*
app 配置信息
包括: 
后台服务器地址
短信服务地址
消息通知服务地址
*/
angular.module('udqApp')
    .constant('APP_CONFIG', 
    {
        /*
        后台服务配置
        */
        server: {
            address: 'http://192.168.1.100',
            port: '8080',
            getUrl: function () {
                return this.address + ':' + this.port + '/';

            }
        },
        /*
        短信配置
        */
        sms: {
            address: '1.2.3',
            port: '5699',
            getUrl: function () {
                return this.address + this.port + '/';
            }
        },
        /*
        消息推送服务配置
        */
        pushNotify: {
            address: '3.2.1',
            port: '7899',
            getUrl: function () {
                return this.address + this.port + '/';
            }
        }
    });

/*




*/