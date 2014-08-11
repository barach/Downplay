define("konami", ["jquery"], function($) {
  console.log("Function : konami");
 
  var ksequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
  var ksequenceCount = 0;
 
  return {
    
  	///////////////////////////////////////
    check: function(keyId) {
            passValue = false;
            
            if (ksequence[ksequenceCount] == keyId) {
                passValue = true;
                ksequenceCount++;
            }
            else {
                ksequenceCount = 0;  // reset
                return false; 
            }
            

            if (ksequenceCount == ksequence.length) {
            	ksequenceCount = 0;  // reset
                return true; 
            }
    }
    ///////////////////////////////////////    
  	
  };
  
  
  
});


