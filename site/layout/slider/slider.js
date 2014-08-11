define(['custom'], function(custom) {

	
	var fileName  = 'slider';
  	custom.logger(fileName + "Controller: Init");
	  return {
	  	///////////////////////////////////////
	    apply: function(app) {
			custom.logger(fileName + "Controller: Loaded");
				app.controller(fileName + 'Controller', function($scope) {	   
				    		
			            // 1st ngRepeat demo
			            $scope.slides = [	{id: 1, label: 'slide', img: 'http://lorempixel.com/1000/300/technics/4/'},
			            					{id: 2, label: 'slide', img: 'http://lorempixel.com/1000/300/business/5/'},
			            					{id: 3, label: 'slide', img: 'http://lorempixel.com/1000/300/nightlife/6/'}
			            				];				    
				    
				    
				});				
	    },
	    ///////////////////////////////////////
  };
});
