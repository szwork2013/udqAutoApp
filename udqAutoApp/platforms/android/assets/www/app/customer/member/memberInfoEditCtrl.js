angular.module('udqApp')
	.controller('customerMemberInfoEditCtrl',['$scope',function($scope){
		$scope.saveMemberInfo = function(){
			
		};
		
	$scope.cityToRegion = function() {
		console.log($scope.city);
		$scope.regions = $scope.city.regions;
	}
	$scope.regionToDistrict=function(){
		console.log($scope.region);
		$scope.districts=$scope.region.districts;
	}
	$scope.cities = [
	{
		name: '成都',
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
			name: '市辖区',
			districts: ['黄浦区', '卢湾区', '徐汇区', '长宁区', '静安区', '普陀区', '闸北区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '南汇区', '奉贤区']
		}, {
			name: '县',
			districts: ['崇明县']
		}]
	}];
	$scope.regions;
	$scope.districts;
	$scope.city = $scope.cities[0];
	$scope.region = $scope.city.regions[0];
	}]);
