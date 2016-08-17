angular.module('myApp')
// 自定义表单验证指令
.directive('email', function() {
	return {
		restrict: 'AE',
		scope: {
			testmail: '=email'
		},
		require: 'ngModel',
		link: function(scope, ele, attr, ngModelCtrl) {
			var reg = /^1[34578]\d{9}$/g;
			ngModelCtrl.$validators.email =function(val) {
				return reg.test(val);
			}
		}
	}
})
.directive('compare', function($filter) {
	return {
		restrict: 'AE',
		scope: {
			orgText: '=compare'
		},
		require: 'ngModel',
		link: function(sco, ele, att, con) {
			con.$validators.compare = function(v) {
				if (att.id == 'code') {
					v = $filter('uppercase')(v);
				}

				return v == sco.orgText;
			}
			sco.$watch('orgText', function() {
				con.$validate();
			})
		}
	}
})
.directive('repeatEnd', function() {
	return {
		link: function(scope, ele, attrs) {
			if(scope.$last) {
				scope.$eval(attrs.repeatEnd)
			}
		}
	}
})
// 进度条指令
.directive('progress', ['$interval', function($interval) {
	return {
		restrict: 'A',
		scope: {
			jd: '@progress'
		},
		link: function(scope, ele, attr) {
			// ele.animate({
			//  width: scope.jd + '%'
			// }, 2000)
			var startVal = 0;
			var endVal = scope.jd;
			var speed = endVal / 2000;
			var timer = $interval(function() {
				ele.css({
					width: startVal + speed + "%"
				})
				console.log(startVal)
				if (startVal === endVal) {
					$interval.cancel(timer)
				}
			})
		}
	}
}])
.directive('uiLazyload', ['$document', '$window', 'viewport', function($document, $window, viewport) {
	 return {
		 restrict : 'EA',
		 scope : {
			 watch : '='
		 },
		 link : function(scope , ele , attrs){

			 ele.css({
				 'background' : '#fff',
				 'opacity' : 0,
				 'transition' : 'opacity 0.5s',
				 '-webkit-transition' : 'opacity 0.5s',
				 'animation-duration': '0.5s'
			 })

			 viewport.elements.push({
				 elem : ele ,
				 load : function(key){

					 ele.attr('src' ,attrs['uiLazyload']);

					 ele.on('load' , function(){
						 ele.css({
							 'opacity' : '1'
						 })
					 })

					 // 加载后从列队里删除
					 if(key >=0 ) viewport.elements.del(key);
				 }
			 });
			 viewport.initload();
		 }
	 }
}])
// 进度条、数字动画
.directive('uiProload' , ['$document' , '$window', 'viewport', '$interval', function(document , window, viewport, $interval){
	 return {
		 restrict : 'EA',
		 scope : {
			 watch : '='
		 },
		 link : function(scope , ele , attrs){

			 ele.css({
				 'overflow': 'visible !important'
			 })

			 viewport.elements.push({
					elem : ele ,
					load : function(key){
						var startVal = 0;
						var endVal = attrs['uiProload'];
						var speed = endVal / 100;

						ele.animate({
							width: endVal + '%'
						}, 2000)

						var timer = $interval(function() {
							startVal += speed;
							ele.children('p').text(Math.ceil(startVal) + '%');
							if (Math.ceil(startVal) == endVal) {
								$interval.cancel(timer);
							}
						}, 20)
					 // 加载后从列队里删除
					 if(key >=0 ) viewport.elements.del(key);
				 }
			 });
			 viewport.initload();
		 }
	 }
}])
// 返回顶部按钮
.directive('goTop', function(){
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// replace: true,
		link: function(scope, iElm, iAttrs, controller) {
			angular.element(window).scroll(function() {
				if (angular.element(window).scrollTop() > 200) {
					iElm.fadeIn(500);
				} else {
					iElm.fadeOut(500);
				}
			});
			iElm.on('click', function() {
				angular.element('body').animate({
					'scrollTop': '0'
				})
			})
			iElm.hover(function() {
				iElm.css({background: '#f00'})
			}, function() {
				iElm.css({background: '#39f'})
			})
		}
	};
})
// 搜索栏百度搜索指令
.directive('autoSearch', function() {
	return {
		restrict: 'A',
		controller: function($scope) {
			$scope.done = function(ele, index) {
				var chose = $('#menu li').eq(index);
				chose.css({'background': '#39f'}).siblings().css({'background': 'yellow'})
				ele.val(chose.text());
			};
		},
		link: function(scope, ele, attrs, controller) {

			ele.on('keydown', function(e) {

				if (e.keyCode == 40) {
					scope.index++;
					if (scope.index > 9) {
						scope.index = 0;
					}
					scope.done(ele, scope.index);
				}
				if (e.keyCode == 38) {
					scope.index--;
					if (scope.index < 0) {
						scope.index = 9;
					}
					scope.done(ele, scope.index);
				}
			})
		}
	}
})
.directive('hover', function() {
	return {
		restrict: 'AE',
		link: function(scope, ele, attrs) {
			var ps = scope.$parent;
			ele.on('mouseenter', function() {
				ps.index = ele.index();
				ps.done(ele, ps.index);
			});
			ele.on('mouseout', function() {
				$('#menu li').css({'background': 'yellow'});
			})
			ele.on('click', function() {
				$('#search').val(ele.text());
				ps.autoSearch = false;
				ps.index = -1;
			});
		}
	}
})
.directive('test', function() {
	return {
		restrict: 'E',
		scope: {
			val: '=',
			greet: '&'
		},
		replace: true,
		template: '<p>我只是想试试</p>',
		link: function(scope, ele, attr) {
			scope.$watch('val', function(newValue, oldValue, scope) {
				console.log('我看到你变化了')
			});
			ele.on('click', function() {
				scope.val = '2016';
			})
		}
	}
})
