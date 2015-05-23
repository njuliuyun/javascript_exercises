/*
 the figure can move in two modes:
 1. it will move directly to where the mouse clicked
 2. press and hold the mouse, move it. the figure will then move following the trace of the mouse
*/

window.onload = function() {
    var DELTAX = 80;
    var DELTAY = 80;
    var buttons = document.getElementsByTagName("button");
    var buttonText = document.getElementsByTagName("span");
    var message = document.getElementsByTagName("p")[0];
    var image = document.getElementsByTagName("img")[0];
    var jumpTimer;
    var traceIntv;
    var coordList = [];
    
    /**
     * a function to show image g1.gif or g2.gif
     **/
    function showImg(index) {
        if (index == 1) {
            image.src = "image/g1.gif";
        }
        else if (index == 2) {
            image.src = "image/g2.gif";
        }
        image.style.width = "170px";
    }     
    /** 
     * a function to clear event handlers
     **/
    function clearEvent() {
        document.onclick = null;
        document.onmousemove = null;
        document.onmousedown = null;
        document.onmouseup = null;
        for (i = 0; i < buttons.length; i++) {
			// prevent the mouse down event be caught by document in trace mode
			buttons[i].onmousedown = buttons.onmouseup = function (event) {
				(event || window.event).cancelBubble = true;	
			};
		}
    }
    buttons[0].onclick = function(event) {
        var event = event || window.event;
        message.innerHTML = "Click on the screen. The figure will move to where you clicked."
        buttonText[0].innerHTML = "(active)";
        buttonText[1].innerHTML = "";
        clearEvent();
        // stop the propagation
        if (event.stopPropagation) event.stopPropagation();
        else event.cancelBubble = true;
        document.onclick = function(event) {
            var event = event || window.event;
            showImg(2);
            image.style.top = event.clientY - DELTAX + "px";
            image.style.left = event.clientX - DELTAY + "px";
            jumpTimer = setTimeout(function() {
                showImg(1);
            }, 200);
        }
    }
    buttons[1].onclick = function(event) {
        var event = event || window.event;
        message.innerHTML = "Click and hold left button of your mouse and move. The figure will move following the trace of the movement of the mouse."
        buttonText[1].innerHTML = "(active)";
        buttonText[0].innerHTML = "";
        clearEvent();
        // stop the propagation
        if (event.stopPropagation) event.stopPropagation();
        else event.cancelBubble = true;
        
        document.onmousedown = function(event) {
            var event = event || window.event;
            coordList.push([event.clientX, event.clientY]);
            document.onmousemove = function(event) {             
                coordList.push([event.clientX, event.clientY]);
                return false;
            }
            return false;
        }
        document.onmouseup = function() {
            document.onmousemove = null;
            showImg(2);
            clearInterval(traceIntv);
            traceIntv = setInterval(function() {
                if (coordList.length > 0) {
                    var coord = coordList.shift();
                    image.style.left = coord[0] - DELTAX + "px";
                    image.style.top = coord[1] - DELTAY + "px";
                }
                else {
                    clearInterval(traceIntv);
                    showImg(1);
                }                        
            }, 10);
        }
    }
 
}