define("custom", ["jquery"], function($) {
  	console.log("Function : custom");
	
	
 
 
		  return {
			
			///////////////////////////////////////
			setDefaultUserData: function(callback){

			 	//SET DEFAULT USER DATA - INIT IN HEADER
			 	var logState = localStorage.getItem("logState");
			 	if (logState == null || logState == "false"){								
					localStorage.setItem("logState", false);
					callback();
		
			 	}
			 	else{
		 			callback();	
			 	};
			},
			///////////////////////////////////////		
		
			///////////////////////////////////////
			startLogin: function(){
				var start = function(){
						stBlurredDialog.open();
						var modalInstance = $modal.open({
					      	templateUrl: 'loginModal.html',
					  		controller: accountModalCtrl.loginModalCtrl(),
							
						});
					
						modalInstance.result.then(function(returnData)
						{	// LOGIN SUCCESSFUL 					
							$scope.logState = true;				 
							stBlurredDialog.close();
					  		custom.logger('Modal dismissed at: ' + new Date());						 		
						}, 
						function (){
							// MODAL DISMISS
							stBlurredDialog.close();
					  		custom.logger('Modal dismissed at: ' + new Date());
						});	
				};
				return start;
			},
			///////////////////////////////////////		
		
			///////////////////////////////////////
			setLoginData: function(data){
					// PULL INFO 
					new Firebase(firebaseIP + '/users/' + data.id + "/info/").once('value', function(snap) {					   
						var data  = snap.val();
						
						// UPDATE SECURITY HASH
						var infoEntry = new Firebase(firebaseIP + '/users/' + data.id + "/info/");
						var securityHash = "";
						for (i = 0; i < 10; i++){	securityHash += Math.random().toString(36).substring(7);};
						infoEntry.update({auth: securityHash});						
						
						// SET LOCAL DATA
						defaultData = {
							id: data.id,
							auth: securityHash
						};
						console.log(defaultData);
						localStorage.setItem("logState", true);
						localStorage.setItem("user", JSON.stringify(defaultData) );				

						location.reload();												
					});	
			},
			///////////////////////////////////////	
			
			///////////////////////////////////////
			setLogout: function(){			
				localStorage.clear();
				location.reload();		
			},
			///////////////////////////////////////		
			
			///////////////////////////////////////
			checkUserData: function(callback){
				
				var logState	= localStorage.getItem("logState");
				var passCheck = true; 
				var returnCheck = [false, false];
				var returnData = [
					{user: ""},
					{image: ""}				
				];
				
				// NOT LOGGED IN							
				if (logState == "false"){
					returnFailData(false, "Not logged in."); 
				}
				
				// CHECK USER ID AND AUTH
				var user = JSON.parse(localStorage.getItem("user"));
				if (user != null){
					if(user.id == null || user.id == undefined || user.auth == null || user.auth == null){
							passCheck = false; 
					}
				}
				else{
					passCheck = false; 
				}
				

				// IF FAILED

				
				// RETRIEVE DATA AND CHECK AUTH
				if (passCheck){

					// PULL INFO 
					new Firebase(firebaseIP + '/users/' + user.id + "/info/").once('value', function(snap) {					   
						var data  = snap.val();
							if (data != null){
								// IF AUTHENTICATION MATCHES, PULL DATA
								if (data.auth == user.auth){								
										userData = {
											id: data.id,
											email: data.email,
											permission: "user",
											firstName: data.firstName,
											lastName: data.lastName,
											userName: data.userName
										};
										returnData.user = userData;																
										returnSuccessData(0);	
								}
								
								// FAILED
								else{
									returnFailData(true, "Authentication has failed.");
								}
							}
							else{
								returnFailData(true, "Authentication failure.  Just like you.");
							}							
					});
					
					// PULL IMAGE DATA
					new Firebase(firebaseIP + '/users/' + user.id + "/images/profile/").once('value', function(snap) {					   
						var data  = snap.val();
							if (data != null){
								imageData = {
									small: data.small,
									standard: data.standard,
									thumbnail: data.thumbnail,
								};
								returnData.image = imageData;																
								returnSuccessData(1);	
							}
							else{
								returnFailData(true, "Authentication failure.  Just like you.");
							}
					});					
				}; 		 

				// RETURN SUCCESS
				function returnSuccessData(arrayCheck){
					returnCheck[arrayCheck] = true;
					var pass = true;
					
					// CHECK FOR QUERIES
					for (i = 0; i < returnCheck.length; i++){
						if (returnCheck[i] == false){
							pass = false;
						}
					}
					//  WAITS FOR BOTH CALLS TO BE MADE BEFORE RETURNING
					if (pass){
						callback(true, returnData);	
					};
				};

				// DEFAULT RETURN FAIL DEFAULT
				function returnFailData(isError, errorType){
															
					callback(false, [isError, errorType]);
				}

			},
			///////////////////////////////////////	
			
			
			///////////////////////////////////////
			fetchLogState: function(callback){
				logState	= localStorage.getItem("logState");
				callback(logState);
			},
			///////////////////////////////////////
			
			
			///////////////////////////////////////
			firebaseBase: function(){
				return firebaseRoot;		
			},
			///////////////////////////////////////
			
		  	///////////////////////////////////////
		    firebaseRoot: function() {
				return firebaseIP;
		    },
		    ///////////////////////////////////////	
		    	
			
			///////////////////////////////////////
			fetchTimestamp: function(){
					var dateObj = new Date();
					var month = dateObj.getUTCMonth();
					var day = dateObj.getUTCDate();
					var year = dateObj.getUTCFullYear();
					var time = dateObj.getTime(); 
					
					dateObject = {
						month: month,
						day: day,
						year: year,
						time: time
					};
					
					return dateObject;
				
			},
			///////////////////////////////////////
			
			
		  	///////////////////////////////////////
		    offcanvas: function(action) {
		
					var canvas = $('#offCanvasMain'); 
					if (action == "show"){
							canvas.addClass('offcanvas-active');
							canvas.removeClass('offcanvas-hide');
							$('body').css('overflow-y', 'hidden');
							return(true);	
							
					};
					
					if (action == "hide"){
							canvas.removeClass('offcanvas-active');
							canvas.addClass('offcanvas-hide');
							$('body').css('overflow-y', 'auto');
							return(false);
					};			
				
					if (action == "toggle"){
						if (canvas.hasClass('offcanvas-active')){
							canvas.removeClass('offcanvas-active');
							canvas.addClass('offcanvas-hide');
							$('body').css('overflow-y', 'auto'); 
							return(false);	
							
						}else{
							canvas.addClass('offcanvas-active');
							canvas.removeClass('offcanvas-hide');
							$('body').css('overflow-y', 'hidden');
							return(true);
						}
						
					};
				
		    },
		    ///////////////////////////////////////
		
		  	///////////////////////////////////////
		    transitionStart: function() {
				
		    },
		    ///////////////////////////////////////
		
		  	///////////////////////////////////////
		    transitionEnd: function() {		
		
		    },
		    ///////////////////////////////////////
		
		  	///////////////////////////////////////
		    logger: function(msg) {
				console.log(msg);
		    },
		    ///////////////////////////////////////
		    
		  	///////////////////////////////////////
		    kcode: function() {
				alert("here")
		    },
		    ///////////////////////////////////////    
		  	
		  	///////////////////////////////////////
		    truncateText: function(text, limit ) {
				var myText = text.toString();
				len = myText.length;
				if(len>limit)
				{
					return myText.substr(0,limit)+'...';
				}	
				else{	
					return myText;
				}
		    },
		    ///////////////////////////////////////
		    
			
			///////////////////////////////////////
			selfReference: function(scripts){
			    filepath = scripts[ scripts.length-1 ].src; 
				var fileNameIndex = filepath.lastIndexOf("/") + 1;
				var filename = filepath.substr(fileNameIndex);
				filename = filename.replace(/\.[^/.]+$/, "");
				return filename;		
			},
			///////////////////////////////////////
			
			///////////////////////////////////////
    		parallaxStart: function(){
				// Cache the Window object
				$window = $(window);
			                
			   $('div[data-type="background"]').each(function(){
			     var $bgobj = $(this); // assigning the object
			                    
			      $(window).scroll(function() {
			                    
					// Scroll the background at var speed
					// the yPos is a negative value because we're scrolling it UP!								
					var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
					
					var vOffset = $bgobj.data('offset');
					
					
					// Put together our final background position
					var coords = '50% '+ (yPos + vOffset) + 'px';
			
					// Move the background
					$bgobj.css({ backgroundPosition: coords });
					
					}); // window scroll Ends
			
			 });	
			///////////////////////////////////////
			
    		}
    
    
  		};
  
 
});


