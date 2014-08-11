define(['custom'], function(custom) {

	
	var fileName  = 'parallax';
  	custom.logger(fileName + "Controller: Init");
	  return {
	  	///////////////////////////////////////
	    apply: function(app) {
			custom.logger(fileName + "Controller: Loaded");
				app.controller(fileName + 'Controller', function($scope, $timeout, cfpLoadingBar) {
					
					custom.parallaxStart();	   
				    
					// INIT
					$scope.init = function(){
						 cfpLoadingBar.start();
					};	
					
				    // fake the initial load so first time users can see it right away:
				    $timeout(function() {
				      cfpLoadingBar.complete();
				    }, 750);
				   
							
				
	    
				});				
	    },
	    ///////////////////////////////////////
  };
});
