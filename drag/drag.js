/* The small window(box) can be dragged around in the window.  
   When the text "click here to replay the trace" is clicked ,the trace of 
   the movement of the box will be replayed.
*/

window.onload = function() {
    var box = document.getElementById("box");
    var header = document.getElementById("header");
    var replay = header.getElementsByTagName("span")[0];
    var drag = false;
    var deltaX = 0; // the distance between the mouse and the top-left corner of the box
    var deltaY = 0;
    var positions = [];
    var texts = document.getElementsByTagName("p");
    // the drag function is invoked on mouse down event
    header.onmousedown = function(event) {        
        event = event || window.event;
        drag = true;      
        deltaX = event.clientX - box.offsetLeft;
        deltaY = event.clientY - box.offsetTop; 
        positions.push([box.offsetLeft, box.offsetTop]);        
        /*set the mouse-move and mouse-up event handler to document. Sometimes the mouse may move fast and the event may 
      happen outside of the box, if the event handler is set to the box, it will not catch the event.*/
        if (document.addEventListener) { // for standard model
            document.addEventListener("mousemove", moveHandler, true);
            document.addEventListener("mouseup", upHandler, true);
        }
        else if (document.attachEvent) { // for earlier IE version
            box.setCapture();
            box.attachEvent("onmousemove", moveHandler);
            box.attachEvent("onmouseup", upHanlder);
            box.releaseCapture();
        }        
        
        // stop the propagation
            if (event.stopPropagation) event.stopPropagation();
            else event.cancelBubble = true;
            
        // remove default setting
        return false;        
    }
    
    // when click on the text in the header, the trace will be replayed
    replay.onclick = function() { 
        var position;
        var interv;
        interv = setInterval(function() {
            if (positions.length > 0) {
                position = positions.pop();
                //console.log(position); 
                //console.log(positions);                
                box.style.left = position[0] + "px";
                box.style.top = position[1] + "px";
                updateText();
            } else clearInterval(interv);
        }, 30); 
               
    }
    
    replay.onmousedown = function(event) {
        // stop the propagation
            if (event.stopPropagation) event.stopPropagation();
            else event.cancelBubble = true;
    }
    /**
     * functin to display the status of a drag and the position of the box
     **/
    function updateText() {                
        texts[0].getElementsByTagName("span")[0].innerHTML = drag;
        texts[1].getElementsByTagName("span")[0].innerHTML = box.offsetTop + "px";
        texts[2].getElementsByTagName("span")[0].innerHTML = box.offsetLeft + "px";
    }
    
    /**
     * this is the handler to capture the mousemove events when the box is being dragged
     **/
    function moveHandler(event) {
        if (drag) {
            var event = event || window.event;
            var x = event.clientX - deltaX;
            var y = event.clientY - deltaY;                          
            //console.log(window.innerHeight);
            // set the new position of the box(set the boundary limit)            
            if (x >= 0 && x <= window.innerWidth - box.offsetWidth
                && y >= 0 && y <= window.innerHeight - box.offsetHeight) {
                box.style.left = x + "px";
                box.style.top = y + "px";
               // remember the new box position
                positions.push([x, y]);
                updateText();
            }
            
            // stop the propagation
            if (event.stopPropagation) event.stopPropagation();
            else event.cancelBubble = true;
        }
        
    }
    
    /** 
     * this is the handler that handles the mouseup event at the end of a drag
     **/
    function upHandler(event) {
        if (document.removeEventListener) {
            document.removeEventListener("mousemove", moveHandler, true);
            document.removeEventListener("mouseup", upHandler, true);
        }
        else if (box.detachEvent) {
            box.detachEvent("onmousemove", moveHandler);
            box.detachEvent("onmouseup", upeHandler);
        }
        drag = false;
        updateText();
        // stop the propagation
            if (event.stopPropagation) event.stopPropagation();
            else event.cancelBubble = true;
    }
}