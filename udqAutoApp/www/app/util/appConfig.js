
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
            address: 'http://192.168.1.4',
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
        },
        /*
        预约时间配置
        */
        bookTime:{
            timeSpots:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            getTimeSpots:function(){
                return this.timeSpots;
            }
        }
    });

/*




*/