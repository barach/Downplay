define(['custom'], function(custom) {

	
	var fileName  = 'offcanvas';
  	custom.logger(fileName + "Controller: Init");
	  return {
	  	///////////////////////////////////////
	    apply: function(app) {
			custom.logger(fileName + "Controller: Loaded");
				app.controller(fileName + 'Controller', function($scope, stBlurredDialog, $timeout, SmoothScroll, $location) {	   
				    


					$scope.offcanvasToggle = function(location){	
					
						   $location.path("/" + location);
							
					       $timeout(function(){					             
					            SmoothScroll.$goTo(0).then(function() {
					            	custom.offcanvas('toggle');
					           		stBlurredDialog.close();
					           	});
					        },800);
	
					};

					$scope.close = function(){
					           custom.offcanvas('toggle');
					           stBlurredDialog.close();
					};	

				});				
	    },
	    ///////////////////////////////////////
  };
});
