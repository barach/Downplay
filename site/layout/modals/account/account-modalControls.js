define(['custom'], function(custom) {


	custom.logger("Modal Controller Factory Ready");
	angular.module('accountModalCtrl', []).	
	factory('accountModalCtrl', function(){
		
		
		return {

			//////////////////////
			/* TEST CONTROLLER */
			ping: function(amount){								
				var test = "account pong: " + amount;
				return 	test;			
			},
			/* END MODAL CONTROLLER */
			//////////////////////
			

			//////////////////////
			/* CREATE MODAL CONTROLLER */
			createModalCtrl: function(){								
				var cntrl = function ($scope, $modalInstance, stBlurredDialog, $localStorage, toaster, $sessionStorage, data) {
					
					// MODAL DATA
					$scope.modalData = {
						//name: data.name
					};		

				  	// SETUP
					$scope.formOptions = {
						uniqueFormId: 'simpleform',
						submitCopy: 'Create Account'
					};	
					$scope.submittedData = new Object; 
					$scope.formData = {};	
					
					
					// UPLOAD ONE OR MULTIPLE IMAGES
					$scope.resizeData = {
						sizes 	: "35, 100, 200",
						quality : "70",
						type    : "image/jpeg"
					};
					
					$scope.quality = 70;  
					//////////////////////// 					
					

					// FORM FIELDS
					$scope.formFields = [
						{
							type: 'email',
							placeholder: 'janedoe@gmail.com',
							key: 'email',
							required: true,
						},
						{
							type: 'text',
							label: 'Username',
							placeholder: 'Username',
							required: true,
						}, 					
						{
							type: 'text',
							label: 'First Name',
							placeholder: 'Jane',
							required: true,
						}, 
						{
							type: 'text',
							label: 'Last Name',
							placeholder: 'Doe',
							required: true,
						}
					];
					$scope.isChecking = false; 
					$scope.isUpload   = false; 
					
					// ON SUBMIT
					$scope.submit = function () {
						

						$scope.isChecking = true; 

						var firebaseData = new Firebase( custom.firebaseRoot() );	
						var auth = new FirebaseSimpleLogin(firebaseData, function(error, user) {	});
													
						auth.createUser($scope.formData.email, "password", function(error, user) {						  
						  
						  
						  if (!error) {
						    console.log('User Id: ' + user.id + ', Email: ' + user.email);	
						    $scope.userId = user.id; 					  	
						  	var root = custom.firebaseRoot();
						  	var userPosts	 = root  + "/users/" + user.id + "/info/";
						  		
						  		// SET DEFAULT USER INFORMATION
				            	var firebase_byUser = new Firebase(userPosts);
				            	var entrydata = 	{	
				            							id: user.id,
				            							email: $scope.formData.email,
				            							permission: "user",		 
				            							
				            							userName: $scope.formData.field_1,
				            							firstName: $scope.formData.field_2,
				            							lastName: $scope.formData.field_3
				            							           											            					
				            						};
										            						
								
				            	firebase_byUser.setWithPriority( entrydata, user.id );	
				            	
				            	
					       		// SET DEFAULT IMAGES
								var userImages	 = root  + "/users/" + user.id + "/images/profile/";
								var firebase_byUser = new Firebase(userImages);
				            	var imageData = 	{	
				            							thumbnail: 'http://dummyimage.com/100x100/000/fff',
				            							small: 'http://dummyimage.com/100x100/000/fff',
				            							standard: 'http://dummyimage.com/100x100/000/fff'		            											            					
				            						};						
								
								firebase_byUser.setWithPriority( imageData, user.id );		// CHANGE OUT FIREBASE
								localStorage.setItem("images", JSON.stringify(imageData) );					// CHANGE OUT LOCALSTORAGE
								
								
								// APPLY
								$scope.isUpload = true; 
				            	$scope.isChecking = false;
				            	$scope.$apply();
						  							    
						  }				
						  else{
						  	alert(error);	
						  	$scope.isChecking = false; 
						  	$scope.$apply();
						  }	  
						});							
						
						
						//$modalInstance.close($scope.modalData);						  	
					};
					
					$scope.uploadImage = function(data){
					
						var root = custom.firebaseRoot();
						var userImages	 = root  + "/users/" + $scope.userId + "/images/profile/";
						var firebase_byUser = new Firebase(userImages);
		            	var entrydata = 	{	
		            							thumbnail: data[0].src,
		            							small: data[1].src,
		            							standard: data[2].src		            											            					
		            						};						
						
						firebase_byUser.setWithPriority( entrydata, $scope.userId );	
						$scope.close();						
					};
					  
					$scope.cancel = function () {
					  	stBlurredDialog.close();
					    $modalInstance.dismiss();
					};
					  
					$scope.close = function(){				  	
					  	stBlurredDialog.close();
					  	$modalInstance.close('');
					};
				};	
				return 	cntrl;		
			},
			/* END MODAL CONTROLLER */	
			//////////////////////	


			
			//////////////////////
			/* MODAL CONTROLLER */
			deleteModalCtrl: function(){								
				var cntrl = function ($scope, $timeout, $modalInstance, stBlurredDialog, $localStorage, toaster, $sessionStorage, $firebase, data) {
					
					
					// DEFAULT 							
					$scope.userForm = {
						password: ''
					};
					$scope.isThinking = false;
					
					
					// SETUP FIREBASE
					var firebaseData = new Firebase( custom.firebaseRoot() );	
					var auth = new FirebaseSimpleLogin(firebaseData, function(error, user) {});	
					

					
					// BEGIN DELETE
					$scope.beginDelete = function () {
							$scope.isThinking = true;
								

							custom.checkUserData(function(returnState, userData){	

								auth.removeUser(userData.user.email, $scope.userForm.password, function(error, success) {
								  if (error) {
								    alert("Password does not match the one in the database.  Please try again.");	
								    $scope.isThinking = false;
								    $scope.$apply();						      
								  }
								  else{					
								  	toaster.pop("success", "User has been deleted", "Signing out momentarily.");	
								  	
								  	// DELETE USER INFORMATION				
								  	var root = custom.firebaseRoot(); 
									var user = root + "/users/" + userData.user.id;
									
		
									var onComplete = function(error, toaster) {
									  if (error){  	
									  	console.log("Error occured.");
									  }
									  else{
										  	$timeout(function(){
										  		custom.setLogout();
										  	}, 1500);			  
									  }
									};
									
									var deleteUser	= new Firebase(user);
									deleteUser.remove(onComplete);									
								  	
								  }
								});								
							

							});
											
										  	
					};
					 
					// CANCEL 
					$scope.cancel = function () {
					  	stBlurredDialog.close();
					    $modalInstance.dismiss();
					};
					
					// CLOSE  
					$scope.close = function(){				  	
					  	stBlurredDialog.close();
					  	$modalInstance.close('');
					};
				};	
				return 	cntrl;		
			},
			/* END MODAL CONTROLLER */	
			//////////////////////		
			
			////////////////////// 
			/* MODAL CONTROLLER */
			editProfileModalCntrl: function(){								
				var cntrl = function ($scope, $modalInstance, stBlurredDialog, $timeout) {
					
						// UPLOAD ONE OR MULTIPLE IMAGES
						$scope.resizeData = {
							sizes 	: "35, 100, 200",
							quality : "70",
							type    : "image/jpeg"
						};
						
						$scope.quality = 70;  
						//////////////////////// 
					
						$scope.uploadImage = function(data){
							custom.checkUserData(function(returnState, userData){	
								var root = custom.firebaseRoot();
								var userImages	 = root  + "/users/" + userData.user.id + "/images/profile/";
								var firebase_byUser = new Firebase(userImages);
				            	var entrydata = 	{	
				            							thumbnail: data[0].src,
				            							small: data[1].src,
				            							standard: data[2].src		            											            					
				            						};						
								

								firebase_byUser.setWithPriority( entrydata, userData.user.id  );		// CHANGE OUT FIREBASE								
								$scope.close();
							});
						};
					
						$scope.close = function () {
						  	stBlurredDialog.close();
						    $modalInstance.close('');
						};

						$scope.cancel = function () {
						  	stBlurredDialog.close();
						    $modalInstance.dismiss('cancel');
						};
						  
					};	
				return 	cntrl;			
			},
			/* END MODAL CONTROLLER */
			//////////////////////		
			
			
			
			////////////////////// 
			/* MODAL CONTROLLER */
			changePasswordCtrl: function(){								
				var cntrl = function ($scope, $modalInstance, stBlurredDialog, $timeout) {
						
						$scope.userData = {
							currentPassword: '',
							newPassword: '',
							confirmPassword: ''
						};
						var fbLogin = new Firebase( custom.firebaseRoot() );
						var auth = new FirebaseSimpleLogin(fbLogin, function(error, user) {		});									
						$scope.isThinking = false;
						
						$scope.update = function(){
						$scope.isThinking = true;
							custom.checkUserData(function(returnState, userData){	
								auth.changePassword(userData.user.email, $scope.userData.currentPassword, $scope.userData.newPassword, function(error, success) {
								  							  
								  if (!error) {
								    console.log('Password changed successfully');
								  	stBlurredDialog.close();
								    $modalInstance.close('changed');
								  }
								  else{							  	
								  	$scope.isThinking = false;
								  	$scope.$apply();
								  	alert(error);
								  }
								});								
							});							
						};
						 
					
						$scope.close = function () {
						  	stBlurredDialog.close();
						    $modalInstance.close('');
						};

						$scope.cancel = function () {
						  	stBlurredDialog.close();
						    $modalInstance.dismiss('cancel');
						};
						  
					};	
				return 	cntrl;			
			},
			/* END MODAL CONTROLLER */
			//////////////////////						
			

			////////////////////// 
			/* MODAL CONTROLLER */
			editProfileDataModalCntrl: function(){								
				var cntrl = function ($scope, $modalInstance, stBlurredDialog, $timeout) {
						
						$scope.pageLoading = true; 
						custom.checkUserData(function(returnState, data){
							$scope.pageLoading = false; 	
							$scope.userData = data.user;
							$scope.$apply();	
						});
						
						$scope.isChecking = false; 
						$scope.update = function(){
							$scope.isChecking = true;

							var infoEntry = new Firebase( custom.firebaseRoot() + '/users/' + $scope.userData.id + "/info/");														
								infoEntry.update({email: $scope.userData.email});	
								infoEntry.update({firstName: $scope.userData.firstName});	
								infoEntry.update({lastName: $scope.userData.lastName});	
								infoEntry.update({userName: $scope.userData.userName});	
							
							$scope.isChecking = false;
							$scope.close();
							
						};
			
						$scope.close = function () {
						  	stBlurredDialog.close();
						    $modalInstance.close('');
						};

						$scope.cancel = function () {
						  	stBlurredDialog.close();
						    $modalInstance.dismiss('cancel');
						};
						  
					};	
				return 	cntrl;			
			},
			/* END MODAL CONTROLLER */
			//////////////////////				
			
			
			//////////////////////
			/* MODAL CONTROLLER */
			loginModalCtrl: function(){								
				var cntrl = function ($scope, $modalInstance, stBlurredDialog, $localStorage, toaster, $sessionStorage, $firebase) {
					
					////////////////////// USE OBJECT OR SCOPE WONT WORK
					$scope.selected = {
						username: "",
						password: "",					
					};
					$scope.isLoading = false; 
					//////////////////////
					
					// FIREBASE
					var fbLogin = new Firebase( custom.firebaseRoot() );	
					//////////////////////
					
					// RESET EMAIL
					$scope.reset = function(){
						
						if ($scope.selected.username != ''){
							
							$scope.isLoading = true; 
							var auth = new FirebaseSimpleLogin(fbLogin, function(error, user) {});

							//PASSWORD RESET							
							auth.sendPasswordResetEmail($scope.selected.username, function(error, success) {
								$scope.isLoading = false;
								$scope.$apply(); 
								if (!error) {
								    alert('Password reset email sent successfully');
								    
								}
								else{
								  	alert("Email address does not match our database. Please try again.");
								}
							});						
						
						
						}
						else{
							alert("Please enter an email.");
						}
						
						
					};
					//////////////////////					
					

					// CONTROLS	
						
					$scope.ok = function () {	
					  	$scope.isLoading = true; 
					  	
					  	
							var checkOnce = false; 
							var auth = new FirebaseSimpleLogin(fbLogin, function(error, user) {
								if (!checkOnce){
								 	if (error == null){
								 		if (user !== null){
								 			checkOnce = true; 							 			
								 			toaster.pop('success', "Logged in!", user.email);
											custom.setLoginData(user);		// SET LOGIN DATA						 			 										 										 		
								 			$modalInstance.close("");
						  					stBlurredDialog.close();					  					
								 		}
								 	}
								 	else{
								 		checkOnce = true; 
										$scope.isLoading = false;
										$scope.$apply(); 
									}
								}
								
							});		
							auth.login('password', {  // PASSWORD IS THE METHOD ()
							  email:		$scope.selected.username,
							  password: 	$scope.selected.password
							});		
			  	
					  	
					};
					
					$scope.cancel = function () {
					  	stBlurredDialog.close();
					    $modalInstance.dismiss();
					};
					  
					$scope.close = function(){				  	
					  	stBlurredDialog.close();
					  	$modalInstance.dismiss();
					};				
					//////////////////////
					
				};	
				
				return 	cntrl;		
			},
			/* END MODAL CONTROLLER */	
			//////////////////////		
					
			
		};
		

	
	});

});