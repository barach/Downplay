define(['custom'], function(custom) {

	
	var fileName  = 'home';
  	custom.logger(fileName + "Controller: Init");
	  return {
	  	///////////////////////////////////////
	    apply: function(app) {
			custom.logger(fileName + "Controller: Loaded");
				app.controller(fileName + 'Controller', function($scope, $timeout, cfpLoadingBar) {	   
				    
				  
				    
					// INIT
					$scope.init = function(){
						custom.parallaxStart();	   
						$scope.sampleText = "Start Typing here...";	
					};	
					

	    
				});				
	    },
	    ///////////////////////////////////////
  };
});
