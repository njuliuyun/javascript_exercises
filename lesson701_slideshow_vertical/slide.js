window.onload = function() {
        var IMGHEIGHT = 170; 
        var pictureUl = document.getElementById("picture");        
		var pictures = pictureUl.getElementsByTagName("li");
	    var numbers = document.getElementById("number").getElementsByTagName("li");
	    var n = 0;
	    var showInterval;
        var moveIntv;
		var backwards = false;
        
		autoPlay();        
        function move(i) {
            moveIntv = setInterval(function() {
                
                if (!backwards && pictureUl.offsetTop > -i*IMGHEIGHT) {       
                    pictureUl.style.top = pictureUl.offsetTop - 5 + "px";
                }                             
                else if (backwards && pictureUl.offsetTop < -(i)*IMGHEIGHT) {
                    pictureUl.style.top = pictureUl.offsetTop + 5 + "px";
                }
                else clearInterval(moveIntv);
            }, 10);
        }
		
        
		// slide show 
		function autoPlay() {
            numbers[n].className="currentnumber";		    
		    showInterval = setInterval(function(){
			    if (n == pictures.length-1) backwards = true;
				if (n == 0) backwards = false;                			    
			    n = backwards? n-1 : n+1; 
                for (var i = 0; i < pictures.length; i++) {
                    numbers[i].className = "";
                }
                numbers[n].className="currentnumber"; 
                move(n);                
			}, 3000);
		}
		
		//set mouse-over and mouse-out effects for images
	    for (i = 0; i < pictures.length; i++) {
	     // the slide show stops when mouse moved over the image
		  pictures[i].onmouseover = function() {
		    clearInterval(showInterval);
		  }
		  // the slide show resumes when mouse moved away from the image
		  pictures[i].onmouseout = function() {
		    autoPlay();
		  }
		}
		
		//set mouse-over and mouse-out effects for numbers
		for (i = 0; i < numbers.length; i++) {
		    numbers[i].index = i;
		    numbers[i].onmouseover = function() {
			    clearInterval(showInterval);
                clearInterval(moveIntv);
                backwards = n > this.index? true : false;
                n = this.index;
                for (var i = 0; i < pictures.length; i++) {
                    numbers[i].className = "";
                }
                numbers[n].className="currentnumber"; 
                move(n);
			}
			numbers[i].onmouseout = function() {
			    autoPlay();
			}
		}
	}