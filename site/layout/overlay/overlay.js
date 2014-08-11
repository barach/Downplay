define(['custom'], function(custom) {

	var fileName  = 'overlay';
  	custom.logger(fileName + "Controller: Init");
	  return {
	  	///////////////////////////////////////
	    apply: function(app) {
			custom.logger(fileName + "Controller: Loaded");
				app.controller(fileName + 'Controller', function($scope, stBlurredDialog) {	   
				    
				    ///////////////////////  VARIABLES
				    $scope.greeting = 'Overlay';		
					///////////////////////	    
				    
				    $scope.isCanvasOpen = false;
				    	  
				   	$scope.offCanvasRevel = function(){
				   		
				   		$scope.isCanvasOpen = custom.offcanvas('toggle');
				   		if ( $scope.isCanvasOpen){
				   			stBlurredDialog.open(); 	
				   		}else{
				   			stBlurredDialog.close(); 
				   		}
				   		
				   	};


				});				
	    },
	    ///////////////////////////////////////
  };
});
