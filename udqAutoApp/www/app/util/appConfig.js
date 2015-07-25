
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
        server: {
            address: 'www.udianqu.com',
            port: '8080',
            getUrl: function () {
                return this.address + this.port + '/';
            }
        },
        sms: {
            address: '1.2.3',
            port: '5699',
            getUrl: function () {
                return this.address + this.port + '/';
            }
        },
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