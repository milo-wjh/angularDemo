'use strict';

(function(){

	var lazyload = angular.module('lazyload' , []);

	lazyload.directive('uiLazyload' , ['$document' , '$window', 'viewport',function(document , window, viewport){

		 // var $ = function(ele){
			//  return angular.element(ele);
		 // }

		 // var elements = (function(){
			// 	 var _uid =0 ;
			// 	 var _list = [];

			// 	 return {

			// 		 // 获取图片集合
			// 		 push : function(ele){
			// 			 _list[_uid ++] = ele ;
			// 		 },

			// 		 // 从集合中删除已load的子集
			// 		 del : function(key){
			// 			_list[key] && delete _list[key] ;
			// 		 },

			// 		 get : function(){
			// 			 return _list  ;
			// 		 },

			// 		 size : function(){
			// 			 return _list.length ;
			// 		 }

			// 	 }

		 // })();


		 // //  元素是否在可视区域
		 // var isVisible = function(ele){
			//  var element = ele[0];
			//  var o = {};
			//  var offsetTop = element.offsetTop;
			//  var offsetLeft = element.offsetLeft;
			//  while(element = element.offsetParent) {
			//  	offsetTop += element.offsetTop;
			//  	offsetLeft += element.offsetLeft;
			//  }
			//  o.left = offsetLeft;
			//  o.top = offsetTop;

			//  if($(window)[0].parent.innerHeight < o.top
			// 		&&  $(window)[0].pageYOffset + $(window)[0].parent.innerHeight < o.top 
			// 		||  $(window)[0].pageYOffset >( o.top + ele[0].height)) {
			// 	 return false;
			//  }else{
			// 	 return true;
			//  }

			//  // var  rect = ele[0].getBoundingClientRect();
   //  //    rect.offsetTop = ele[0].offsetTop
   //  //    if($(window)[0].parent.innerHeight < rect.offsetTop
   //  //       &&  $(window)[0].pageYOffset + $(window)[0].parent.innerHeight < rect.offsetTop 
   //  //       ||  $(window)[0].pageYOffset >( rect.offsetTop + rect.height)) {
   //  //      return false;
   //  //    }else{
   //  //      return true;
   //  //    }
		 // }

		 // //  检查图片是否可见
		 // var checkImage = function(){
			//  var eles = elements.get();
			//  angular.forEach(eles ,function(v , k){
			// 	 // console.log(v)
			// 	 isVisible(v.elem) ? eles[k].load(k) : false ;
			//  })
		 // }

		 // var initLazyload = function(){
			// 	checkImage();
			// 	$(window).on('scroll' , checkImage)
		 // }


	}])
})()

