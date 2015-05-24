window.onload = function() {
    var iphone = document.getElementById("iphone");
    var lock = document.getElementById("lock");
    var btn = lock.getElementsByTagName("span")[0];
    var limit = lock.offsetWidth - btn.offsetWidth;
    var moveIntv;    
	var oBg = document.createElement("img");
	oBg.src = "image/2.jpg"; // preload the second background image
    btn.onmousedown = function(event) {
        var event = event || window.event;
        //the distance between the mouse and the top-left of the lock
        var deltaX = event.clientX - this.offsetLeft;
        document.onmousemove = function(event) {
            clearInterval(moveIntv);
            // make sure btn can only move with the limit
            if (btn.offsetLeft >= 0 && btn.offsetLeft <= limit) {
                btn.style.left = moveUnit(event.clientX - deltaX) + "px";                
            // when the btn moves to the right, background changes
                changeBg();
            }            
        }
        document.onmouseup = function(event) {
            document.onmousemove = null;
            document.onmouseup = null;
            if (btn.offsetLeft < limit/2) {
                autoMove(-1);
            } else autoMove(1);            
        }
        // cancel default behaviour
        return false;
    }
    /** 
     * a function that sets the moving distance for btn to make sure it only moves within the limit
     **/
    function moveUnit(x) {
        x < 0 && (x = 0);
        x > limit && (x = limit);
        return x;
    }
    /**
     * a function to let the btn move automatically
     */
    function autoMove(direc) { // direc is an int with a value 1 or -1. -1 means moving left, 1 means moveing right
        clearInterval(moveIntv);
        moveIntv = setInterval(function() {
            if (btn.offsetLeft > 0 && btn.offsetLeft < limit) {
                btn.style.left = moveUnit(btn.offsetLeft+ direc * 2)+ "px";
                changeBg();
            } else clearInterval(moveIntv);            
        }, 10);
    }
    /**
     * a function used to change the background
     **/
    function changeBg() {
        if (btn.offsetLeft == limit) {
            iphone.style.background = "url(" + oBg.src + ") no-repeat";
            lock.style.display = "none";
        }
    }
}