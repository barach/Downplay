define(['custom', 'konami'], function(custom, konami, app) {
	var fileName  = 'header';
  	custom.logger(fileName + "Controller: Init");
	  return {
	  	///////////////////////////////////////
	    apply: function(app) {
			custom.logger(fileName + "Controller: Loaded");
			
				app.controller(fileName + 'Controller', function($scope, $timeout, $rootScope, psResponsive, $localStorage, $sessionStorage, $detection, stBlurredDialog, $modal, toaster, uiModalCtrl, accountModalCtrl) {	   
				   $scope.fileName = fileName;
				  

				  

					///////////////////////	  INIT
					$scope.pageStatus = {
						isLoading: true,
						hasData: '',						
						hasErrors: false,	
						errorMsg: ''										
					};

					$scope.init = function(){
				  		$scope.userData = [];				  		  		
				  		custom.checkUserData(function(returnState, data){	
				  			$scope.pageStatus.isLoading = false; 
				  			$scope.pageStatus.hasData = returnState; 							  			
				  		});
				  		
			  			// GET LOGSTATE
			  			 custom.fetchLogState(function(state){				  			 		
			  			 	$scope.logState = state;				  			 		
			  			 });				  		
			  		
					};
					///////////////////////	 
					

				  	// DETECT AND APPLY STICKY IF IT WORKS
				  	if ($detection.isAndroid()){
				  		$scope.stickyWorks = true;
				  	}
				  	else if($detection.isiOS()){				  		
				  		$scope.stickyWorks = false;
				  	}
				  	else if($detection.isWindowsPhone()){
				  		$scope.stickyWorks = true;
				  	}
				  	else{				  		
				  		// PC OR DESKTOP
				  		$scope.stickyWorks = true;
				  	}
				   
				    $rootScope.responsive = psResponsive;
					$scope.offcanvasToggle = function(){
						 stBlurredDialog.open();	
							custom.offcanvas('toggle');
					};
				   
		
				});			
				
				



				
								
					
	    },
	    ///////////////////////////////////////
  };
});
