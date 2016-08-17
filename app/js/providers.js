angular.module('providers', [])
.factory('viewport', ['$document', '$window', function($document, $window){
		var $ = function(ele){
		 return angular.element(ele);
		}
		var _uid =0 ;
		var _list = [];
		var elements = function(){

			 return {

				 // 获取图片集合
				 push : function(ele){
					 _list[_uid ++] = ele ;
				 },

				 // 从集合中删除已load的子集
				 del : function(key){
					_list[key] && delete _list[key] ;
				 },

				 get : function(){
					 return _list  ;
				 },

				 size : function(){
					 return _list.length ;
				 }

			 }

		};
		//  元素是否在可视区域
		var isVisible = function(ele){
			var element = ele[0];
			var o = {};
			var offsetTop = element.offsetTop;
			var offsetLeft = element.offsetLeft;
			while(element = element.offsetParent) {
				offsetTop += element.offsetTop;
				offsetLeft += element.offsetLeft;
			}
			o.left = offsetLeft;
			o.top = offsetTop;

			if($(window)[0].parent.innerHeight < o.top
				&&  $(window)[0].pageYOffset + $(window)[0].parent.innerHeight < o.top 
				||  $(window)[0].pageYOffset >( o.top + ele[0].height)) {
			 return false;
			}else{
			 return true;
			}

		 // var  rect = ele[0].getBoundingClientRect();
		//    rect.offsetTop = ele[0].offsetTop
		//    if($(window)[0].parent.innerHeight < rect.offsetTop
		//       &&  $(window)[0].pageYOffset + $(window)[0].parent.innerHeight < rect.offsetTop 
		//       ||  $(window)[0].pageYOffset >( rect.offsetTop + rect.height)) {
		//      return false;
		//    }else{
		//      return true;
		//    }
		}

		//  检查图片是否可见
		var checkImage = function(){
			var eles = elements().get();
			angular.forEach(eles ,function(v , k){
			 isVisible(v.elem) ? eles[k].load(k) : false ;
			})
		}

		var initload = function(){
			checkImage();
			$(window).on('scroll' , checkImage)
		}
	return {
		'elements': elements(),
		'isVisible': isVisible,
		'checkImage': checkImage,
		'initload': initload
	}
}])
// .factory('autoAdd',['$interval' ,function($interval) {
// 	return function autoAdd(startVal, endVal) {
// 		var start = startVal || 0;
// 		var time = 2000;
// 		var speed = (endVal - startVal) / time;

// 		timer = $interval(function() {
// 			startVal += speed;
// 			if (startVal === endVal) {
// 				$interval.cancel(timer);
// 			}
// 		})
// 	}
// }])