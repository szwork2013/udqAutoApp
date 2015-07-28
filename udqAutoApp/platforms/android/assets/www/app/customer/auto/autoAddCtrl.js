angular.module('udqApp')
	.controller('customerAutoAddCtrl', ['$scope','$state','$ionicHistory', 'regionSvr',function ($scope,$state,$ionicHistory,regionSvr) {

		/*检查车牌号的正则表达式*/
		$scope.pnRe=/^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;

		/*点击"确认"*/
		$scope.addAuto = function(){
			/*1、检查车牌号、车品牌、颜色、型号、是否选择小区
		      2、调用数据数据服务，添加车辆*/
		};
		/*选择城市后自动联动区域*/
		$scope.cityToRegion = function(mycity) {
			console.log(mycity.name);
			$scope.regions = mycity.regions;
		};
		/*选择区域后自动联动小区*/
		$scope.regionToDistrict = function (myregion) {
			console.log(myregion.name);
			$scope.districts = myregion.districts;
		};
		
		/*$scope.cities = regionSvr.getCities();*/
		$scope.cities = [
			{
				name: '北京',
				regions: [{
					name: '市辖区',
					districts: ['东城区', '西城区', '崇文区', '宣武区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区']
				}, {
					name: '县',
					districts: ['密云县', '延庆县']
				}]
			},
	 		{
				name: '上海',
				regions: [{
					name: '乡镇',
					districts: ['黄浦区', '卢湾区', '徐汇区', '长宁区', '静安区', '普陀区', '闸北区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '南汇区', '奉贤区']
				}, {
					name: '县',
					districts: ['崇明县']
				}]
			}
		];

		/*跳过到主页面*/
		$scope.skipToHome = function(){
			$ionicHistory.clearHistory();
			$state.go('customerHome');
		};

	}])
