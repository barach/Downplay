define(['custom'], function(custom) {


	custom.logger("Modal Controller Factory Ready");
	angular.module('uiModalCtrl', []).	
	factory('uiModalCtrl', function(){
		
		
		return {

			//////////////////////
			/* TEST CONTROLLER */
			ping: function(amount){								
				var test = "ponged: " + amount;
				return 	test;			
			},
			/* END MODAL CONTROLLER */
			//////////////////////
			
			////////////////////// 
			/* MODAL CONTROLLER */
			foundationModalCtrl: function(){								
				var cntrl = function ($scope, $modalInstance, items, stBlurredDialog, $timeout) {
				
					  $scope.items = items;
					  $scope.selected = {
					    item: $scope.items[0],
					    name: "",
					  };
		
						$scope.ok = function () {	
							alert($scope.selected.name);		  	
						  	stBlurredDialog.close();
						    $modalInstance.close($scope.selected.item);	
						};
				
						$scope.cancel = function () {
						  	stBlurredDialog.close();
						    $modalInstance.dismiss('cancel');
						};
						  
						$scope.close = function(){
						  	stBlurredDialog.close();
						  	$modalInstance.dismiss('cancel');
						};
					};	
				return cntrl;			
			},
			/* END MODAL CONTROLLER */
			//////////////////////
				
				

			//////////////////////
			/* MODAL CONTROLLER */
			confirmModalCtrl: function(){								
				var cntrl = function ($scope, $modalInstance, stBlurredDialog) {
	
					$scope.yes = function () {
					  	stBlurredDialog.close();
					    $modalInstance.close(true);				  	
					};
					  
					$scope.no = function () {
					  	stBlurredDialog.close();
					    $modalInstance.close(false);
					};
					  
					$scope.cancel = function(){				  	
					  	stBlurredDialog.close();
					  	$modalInstance.dismiss();
					};
				};	
				return cntrl;		
			},
			/* END MODAL CONTROLLER */	
			//////////////////////	
			
			
			
			/* MODAL CONTROLLER */
			browserInfoCtrl: function(){	
				var cntrl = function ($scope, $modalInstance, $detection, stBlurredDialog) {

					///////////////////////	 DETECTION   
				  	if ($detection.isAndroid()){
				  		$scope.detected = "media/detection/androidIcon.jpg";
				  		$scope.detectedType = "Android OS";
				  	}
				  	else if($detection.isiOS()){
				  		$scope.detected = "media/detection/iosIcon.jpg";
				  		$scope.detectedType = "IOS";
				  	}
				  	else if($detection.isWindowsPhone()){
				  		$scope.detected = "media/detection/windowsIcon.jpg";
				  		$scope.detectedType = "Windows 8 (Mobile)";
				  	}
				  	else{
				  		$scope.detected = "media/detection/desktopIcon.jpg";
				  		$scope.detectedType = "Desktop";
				  	}
					///////////////////////	   						
					
					
					  
					$scope.dismiss = function(){				  	
					  	stBlurredDialog.close();
					  	$modalInstance.dismiss();
					};
				};	
		
				return cntrl;		
			},				
			/* END MODAL CONTROLLER */										
						
			
		};
		

	
	});

});