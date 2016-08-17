
angular.module('myApp')
//头部导航控制器
.controller('headerCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
	// function refreshen() {
 //    $scope.active = {};
 //    var path = $location.path().split('/')[1];
 //    $scope.active[path + 'IsActive'] = true;
	// }
	// refreshen();
	$scope.showSearch = function() {
		$rootScope.$broadcast('showSearch');
	}
}])

//搜索栏控制器
.controller('searchCtrl', ['$rootScope', '$scope', '$timeout', '$http', function($rootScope, $scope, $timeout, $http) {
	$scope.$on('showSearch', function() {
    $('.search').css('z-index', '100');
    $scope.searchShow = true;
	})
	$scope.close = function($event) {
		var e = $event;
		if (/bg/.test(e.target.className)) {
			$scope.searchShow = false;
			$timeout(function() {
				$('.search').css('z-index', '-100');
			}, 700)
		}
	}
	$scope.index = -1;
	$scope.autoSearch = false;
	$scope.search = function() {	
		// $scope.keyword = encodeURIComponent($scope.keyword);

		if ($scope.keyword != '') {
			$http.get('http://localhost/www/test/baidu.php?keyword=' + $scope.keyword).success(function(data) {
				if (data.s[0] == '') {
					$scope.autoSearch = false;
				} else {
					$scope.autoSearch = true;
					$scope.searchMore = data.s;
				}
			})
			
			// $http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+ $scope.keyword +'&callback=JSON_CALLBACK').success(function (msg){
			// 		console.log(msg);
			// });
		} else {
			$scope.autoSearch = false;
			$scope.index = -1;
		}
	}
}])

// 列表页控制器
.controller('listCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

	$http.get('json/' + 'phones' + '.json').success(function(data) {
		$scope.list = data;
		$scope.bigTotalItems = $scope.list.length;
	});
	// 分页
	$scope.pageSize = 2;
	$scope.maxSize = 5;
	$scope.bigCurrentPage = 1;
	$scope.scrollTop = function(val) {
		angular.element('body').scrollTop(val);
	}
	// $scope.setPage = function (pageNo) {
	//   $scope.bigCurrentPage = pageNo;
	//   angular.element('body').animate({
	// 		'scrollTop': '0'
	// 	})
	// };

	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.active = 0;
	$scope.slides = [
		{
				id: 0,
				image: 'img/phones/motorola-xoom-with-wi-fi.0.jpg',
				text: 'Nice image0'
		},
		{
				id: 1,
				image: 'img/phones/motorola-xoom.0.jpg',
				text: 'Nice image1'
		},
		{
				id: 2,
				image: 'img/phones/dell-streak-7.0.jpg',
				text: 'Nice image2'
		}
	];

	$scope.order = 'name';
	$scope.sortBy = function(way) {
		$scope.order = way;
	}
	// $scope.scroll = function() {
	// 	console.log($(window))
	// 	// $timeout(function() {
	// 	// 	$(window).scroll();
	// 	// }, 1000)
		
	// };
	$scope.tab = function(urll) {
		$http.get('json/' + urll + '.json').success(function(data) {
			$scope.list = data;
			$scope.bigCurrentPage = 1;
			console.log($scope.list)
			if ($scope.list.length < 20) {
				$scope.more = false;
			} else {
				$scope.more = true;
			}
		});
	}
	$scope.selectLast = function (index) {
		// if(index == $scope.list.length-1){
				// console.log('ng-repeat完成')
				$(window).scroll();
		// }
	}
	$scope.more = function() {
		// 懒加载，向后台请求更多数据
		$scope.list = $scope.list.concat($scope.copy);
	}

	// 评分ui
	$scope.rate = 3;
	$scope.max = 5;

}])

// 第二分页控制器
.controller('companyCtrl', ['$scope', '$log', function($scope, $log){
	$scope.oneAtATime = true;
	$scope.slides = [
		{
				id: 0,
				image: 'img/phones/motorola-xoom-with-wi-fi.0.jpg',
				text: 'Nice image0'
		},
		{
				id: 1,
				image: 'img/phones/motorola-xoom.0.jpg',
				text: 'Nice image1'
		},
		{
				id: 2,
				image: 'img/phones/dell-streak-7.0.jpg',
				text: 'Nice image2'
		}
	];
	$scope.isCollapsed = false;

	// 分页ui
  $scope.setPage = function (pageNo) {
    $scope.bigCurrentPage = pageNo;
    console.log(pageNo)
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 500;
  $scope.bigCurrentPage = 1;

  // 评分ui
  $scope.rate = 1;
  $scope.max = 10;
  $scope.isReadonly = false;
}])

// 详情页控制器
.controller('decCtrl', ['$stateParams', '$scope', '$http', function($stateParams, $scope, $http){
	$http.get('json/' + $stateParams.id + '.json').success(function(data) {
		$scope.phone = data;
		$scope.imagesUrl = $scope.phone.images[0];
	});
	$scope.setImg = function(imgurl) {
		$scope.imagesUrl = imgurl;
	};
}])

//登录页面控制器
.controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	var vm = $scope.vm = {};
	var code;
	vm.userdata = {};
	vm.creatCode = function() {
		code = '';
		var codeLength = 4;
		var way = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		for(var i = 0; i < codeLength; i++) {
			var index = Math.floor(Math.random()*(way.length));
			code += way[index];
		}
		vm.codeValue = code;
	};
	vm.validate = function() {
		var inputVal = vm.yzm?vm.yzm.toUpperCase():'';
		if (inputVal.length <= 0) {
			vm.yzmMessage = "请输入验证码";
			vm.valiState = false;
		} else if(inputVal != code) {
			vm.yzmMessage = "验证码错误";
			vm.valiState = false;
		} else {
			vm.yzmMessage = "";
			vm.valiState = true;
		}
	}
	vm.submit = function() {
		console.log('表单提交了')
	}
}])

//注册页控制器
.controller('registerCtrl', ['$scope', '$http', function($scope, $http){
	$scope.userdata = {};
	$scope.submit = function() {
		console.log($scope.userdata)
		$scope.userdata = {};
	}
}])