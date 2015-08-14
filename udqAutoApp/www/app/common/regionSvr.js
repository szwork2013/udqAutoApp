angular.module('udqApp')
 	.service('regionSvr', ['$http', '$q', 'APP_CONFIG', function ($http, $q, APP_CONFIG) {

 	    var baseUrl = APP_CONFIG.server.getUrl();
 	    var _cities;
 	    var _districts;

 	    ///*注册服务*/
 	    //this.initRegionSvr = function () {
 	    //    _cities = [];
 	    //    _districts = [];

 	    //    var promise = doRequest();
 	    //    promise.then(
        //        function (data) {
        //            console.log(data);
        //            _cities = getCitiesFromData(data);
        //        },
        //        function (data) {
        //            console.log(data);
        //        });
            
 	    //}
 	    this.getCities = function () {
 	        return _cities;
 	    }
 	    this.getDistricts = function () {
 	        return _districts;
 	    }

 	    this.doRequest = function () {
 	        var url = baseUrl + 'fzmgr/region/getRegion4App.do';

 	        var deferred = $q.defer();
 	        $http({
 	            url: url,
 	            method: 'get'
 	        }).success(function (data, status, headers, config) {
 	            deferred.resolve(data);
 	        })
                .error(function (data, status, headers, config) {
                    deferred.reject('获取地域信息失败');
                });
 	        return deferred.promise;
 	    }
 	    /*将获取的数据转化成我想要的数据形式*/
 	    this.getCitiesFromData = function (data) {
 	        _districts = [];
 	        var tempCities = [];
 	        if (data == undefined) {
 	            return tempCities;
 	        }
 	        var regionObj = data[0].children;

 	        for (var i = 0; i < regionObj.length; i++) {
 	            var city = {};
 	            /*获取城市的名字和ID*/
 	            city.name = regionObj[i].name;
 	            city.id = regionObj[i].id;
 	            /*如果该城市下有区域，则获取下面的区域信息*/
 	            if (regionObj[i].children.length == 0) {
 	                continue;
 	            }
 	            var regions = [];
 	            for (var j = 0; j < regionObj[i].children.length; j++) {
 	                var region = {};
 	                region.name = regionObj[i].children[j].name;
 	                region.id = regionObj[i].children[j].id;

 	                /*如果该区域下有小区，则获取下面的小区信息*/
 	                if (regionObj[i].children[j].children.length == 0) {
 	                    continue;
 	                }
 	                var districts = [];
 	                for (var c = 0; c < regionObj[i].children[j].children.length; c++) {
 	                    var district = {};
 	                    district.name = regionObj[i].children[j].children[c].name;
 	                    district.id = regionObj[i].children[j].children[c].id;

 	                    districts.push(district);
 	                    _districts.push(district);
 	                }
 	                region.districts = districts;

 	                /*将区域添加到区域s里面*/
 	                regions.push(region);
 	            }
 	            city.regions = regions;
 	            /*将城市添加到城市列表里面*/
 	            tempCities.push(city);
 	        }

 	        return tempCities;

 	    }

 	}])