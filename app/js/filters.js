angular.module('myApp').filter('startFrom', function() {  
  return function(input, start) {  
  	if (!input) {
       return;
    }         
      return input.slice(start);  
	}
});