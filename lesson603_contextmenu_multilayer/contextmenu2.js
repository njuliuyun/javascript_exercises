// functions to get the position of an element
var getOffset = {
    top: function(elem) {
        return elem.offsetTop + (elem.offsetParent? getOffset.top(elem.offsetParent) :0);
    },
    left: function(elem) {
        return elem.offsetLeft + (elem.offsetParent? getOffset.left(elem.offsetParent) :0);
    }
}

window.onload = function() {
    var ULWIDTH = 200;
    var LIHEIGHT = 30;
    var menu = document.getElementsByTagName("ul")[0];
    var list1 = menu.children;
    var oLis = menu.getElementsByTagName("li"); 
    var windowW = window.innerWidth;
    var windowH = window.innerHeight;
    var showTimer = hideTimer = null;
    
    // add event handler to menu, when right clicking the mouse, layer1 of the menu will display    
    document.oncontextmenu = function(event) {
        var event = event || window.event;
        menu.style.display = "block";
        menu.style.top = event.clientY + "px";
        menu.style.left = event.clientX + "px";
        // check if the menu appears within the window
        if (menu.offsetHeight > windowH - event.clientY) menu.style.top =  windowH - menu.offsetHeight + "px";
        if (menu.offsetWidth > windowW - event.clientX) menu.style.left =  windowW - menu.offsetWidth + "px";       
        //disable default action
        return false;
    }
    // click anywhere, the menu will hide
    document.onclick = function() {
        menu.style.display = "none";
    }
    
    // add event handlers for every li element if it has a sub-layer
    for (var i = 0; i < oLis.length; i++) {
          
        oLis[i].onmouseover = function() { 
            var subUl = this.getElementsByTagName("ul")[0];            
            if(subUl) {  
                subUl.style.display = "block"; 
                // the setTimeout is needed to get the correct offset properties for subUl                
                showTimer = setTimeout(function() {                    
                    //set the position of subUl
                    subUl.style.left = subUl.offsetWidth - 10 + "px";
                    subUl.style.top = 0;
                    // check if the subUl appears within the window          
                    if (subUl.offsetWidth > windowW - getOffset.left(subUl)) {                            
                        subUl.style.left = -subUl.offsetLeft + "px";
                    }                    
                    if (subUl.offsetHeight > windowH - getOffset.top(subUl)) {                            
                        subUl.style.top = subUl.offsetTop - subUl.offsetHeight + subUl.parentNode.offsetHeight + "px";
                    } 
                }, 0);
            }            
        };
        
        oLis[i].onmouseout = function() {
            var subUl = this.getElementsByTagName("ul")[0];
            if(subUl){
                subUl.style.display = "none";			    
            }
        }            
    }      
    
}