angular.module('udqApp')
    .service('networkInfoSvr', [function () {
        /*检查网络*/
        this.checkConnection = function() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';

            if (states[networkState] == 'No network connection') {
                return '无网络连接,请连接网络';
            } else {
                return;
            }
        }
    }])