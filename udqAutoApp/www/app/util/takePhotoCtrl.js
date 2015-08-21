angular.module('udqApp')
    .controller('takePhotoCtrl', ['$scope', 'cameraSvr', function ($scope, cameraSvr) {
        $scope.takPhoto = function () {
            cameraSvr.getPicture(50,
                function (img) {
                    $scope.imgURI = img;
                    console.log('seess');
                },
                function (data) {
                    console.log('err');
                });
        }
        $scope.ownColor = {
            id: '121',
            value: 'black',
            orgId:23
        };
        
    }])