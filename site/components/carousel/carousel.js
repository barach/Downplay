define(['custom'], function(custom) {

	
	var fileName  = 'carousel';
  	custom.logger(fileName + "Controller: Init");
	  return {
	  	///////////////////////////////////////
	    apply: function(app) {
			custom.logger(fileName + "Controller: Loaded");
				app.controller(fileName + 'Controller', function($scope, $timeout, cfpLoadingBar) {	   
				    
				    	$scope.greeting = "Carousel";
	    	
	    	
						/* SETUP */
			            function addSlide(target, style) {
			                var i = target.length;
			                target.push({
			                	id: (i + 1),
			                    label: 'Slide: ' + (i + 1),
			                    img: 'http://lorempixel.com/450/300/' + style + '/' + (i % 10) 
			                });
			            };
			
			            function addSlides(target, style, qty) {
			                for (var i=0; i < qty; i++) {
			                    addSlide(target, style);
			                }
			            }
						/* END SETUP */
			
			
						/* STANDARD */ 
						$scope.standard = [];
				        addSlides($scope.standard, 'people', 10);
						$scope.standardIndex = 0; 				
						/* END */
						
						
			
						/* CUSTOM SLIDER */
						$scope.customIndex = 0;
						$scope.custom = [];
				        addSlides($scope.custom, 'technics', 10);						 					
			            $scope.cprev = function() {
			                $scope.customIndex--;
			            };
			            $scope.cnext = function() {
			                $scope.customIndex++;
			            };
			            /* END CUSTOM */	
			            
						/* UNIQUE SLIDER */
						$scope.uniqueIndex = 0; 
				        $scope.unique = [];
				        addSlides($scope.unique, 'nightlife', 10);							
			            $scope.uprev = function() {
			                $scope.uniqueIndex--;
			            };
			            $scope.unext = function() {
			                $scope.uniqueIndex++;
			            };
			            /* END CUSTOM */				            					
			
						
						/* THUMB SLIDER */
				        $scope.thumb = [];
				        addSlides($scope.thumb, 'sports', 10);							
						$scope.thumbIndex = 0;
						/* END */
						
						/* THUMB SLIDER */
				        $scope.nav = [];
				        addSlides($scope.nav, 'nature', 10);							
						$scope.navIndex = 0;
						/* END */						
			
 	

				    	

					
					    // fake the initial load so first time users can see it right away:
					    cfpLoadingBar.start();
					    $scope.fakeIntro = true;
					    $timeout(function() {
					      cfpLoadingBar.complete();
					    }, 750);				    	
				    	
				});				
	    },
	    ///////////////////////////////////////
  };
});
