'use strict';

(function(){

	var progressload = angular.module('progressload' , []);

	progressload.directive('uiProload' , ['$document' , '$window', 'viewport', function(document , window, viewport){
		 return {
			 restrict : 'EA',
			 scope : {
				 watch : '='
			 },
			 link : function(scope , ele , attrs){

				 ele.css({
					 '-webkit-transition' : 'opacity 1s',
					 'animation-duration': '1s'
				 })

				 viewport.elements.push({
					 elem : ele ,
					 load : function(key){
						 ele.animate({
						 	width: attrs['uiProload'] + '%'
							}, 2000)

						 // 加载后从列队里删除
						 if(key >=0 ) viewport.elements.del(key);
					 }
				 });
				 viewport.initload();
			 }
		 }
	}])
})()

