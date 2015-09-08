angular.module('udqApp')
    .service('popUpSvr', [ '$ionicPopup', function ($ionicPopup) {
        this.confirm = function (msg) {
            var popUp = $ionicPopup.show(
                {
                    template: '<p style="color:black;">' + msg + '</p>',
                    buttons: [
                        {
                            text:'确认',
                            type: 'allbutton'
                        }
                    ]
                });
            popUp.then(function (res) {

            });
            $timeout(function () {
                popUp.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        }
    }])