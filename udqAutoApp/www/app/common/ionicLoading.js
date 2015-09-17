angular.module('udqApp')
.service('LoadingSvr', ['$ionicLoading', function ($ionicLoading) {
    this.show = function () {
        $ionicLoading.show({
            template: 'Loading...'
        });
    }
    this.hide = function () {
        $ionicLoading.hide();
    }
}])