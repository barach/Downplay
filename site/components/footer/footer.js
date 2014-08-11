define(['custom'], function(custom, app) {
	var fileName  = 'footer';
  	custom.logger(fileName + "Controller: Init");
	  return {
	  	///////////////////////////////////////
	    apply: function(app) {
			custom.logger(fileName + "Controller: Loaded");
				app.controller(fileName + 'Controller', function($scope, $modal, cfpLoadingBar, stBlurredDialog, SmoothScroll, toaster, uiModalCtrl) {	   
				    

					
					//////////////////////
					$scope.open = function () {			
							stBlurredDialog.open();
							var control = uiModalCtrl.browserInfoCtrl(); 
							
							
							
							var modalInstance = $modal.open({
						      	templateUrl: 'browserInfoModal.html',
						  		controller: control,
							    resolve: {
							        data: function () {
							        // return $scope.deleteUserObj;
							        }
							    }
							});
						
						
							modalInstance.result.then(
								function (returnData) {  // CLOSE																											
									stBlurredDialog.close();
									custom.logger('Modal dismissed at: ' + new Date());
									}, 
								function () {			// DISMISS	
									stBlurredDialog.close();
						  			custom.logger('Modal dismissed at: ' + new Date());
						    });	
						
					};
					//////////////////////					
					
					
					
					$scope.testScroll = function(){
					  SmoothScroll.$goTo(0).then(function() {
					    return SmoothScroll.$goTo('#trueBottom');
					  }).then(function() {
					    return SmoothScroll.$goTo(0);
					  }).then(function() {
					    return SmoothScroll.$goTo('#trueBottom');
					  }).then(function() {
					    return SmoothScroll.$goTo(0);
					  }).then(function() {
					    return SmoothScroll.$goTo('#trueBottom');
					  });
				   };
				    
				    $scope.fileName = fileName;
				  
				    $scope.master = {};
				
				    $scope.update = function(user) {
				      $scope.master = angular.copy(user);
				    };
				
				    $scope.reset = function() {
				      $scope.user = angular.copy($scope.master);
				    };
				
				    $scope.isUnchanged = function(user) {
				      return angular.equals(user, $scope.master);
				    };
				
				
					$scope.emailSent = false; 
					$scope.sendEmail = function(){
						var contact 		= $scope.user.name;
						var emailAddress 	= $scope.user.email;
						var themessage		= $scope.user.comment; 
						
						
						if (emailAddress != undefined){
							
							 /* RESET FORMS */
							 toaster.pop('success', "Email Sent", "Thanks for the email!  We'll respond as soon as possible!");
							 $scope.user.name = '';
							 $scope.user.email = '';
							 $scope.user.comment = '';
							 $scope.emailSent = true;
							 
					         $.ajax({ url: 'core/common/common.php',
					                 data: {action: "email", name: contact, email: emailAddress, message: themessage },
					                 type: 'post',
					                 success: function() {
									    															
					                 },
									 error: function(){
																	
									 }
					        });



						};				
					};
					


				    $scope.reset();
				   
				    
				});
				

				
				
				
							
								
	    },
	    ///////////////////////////////////////
  };
});
