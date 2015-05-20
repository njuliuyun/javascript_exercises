window.onload = function() {
    var LETTERLIMIT = 200;
    var pictures = document.getElementsByTagName("ul")[0].getElementsByTagName("img");
    var selectedPic = "image/face1.gif";
    var NameInput = document.getElementById("nameinput");
    var messageInput = document.getElementById("messageinput");
    var postButton = document.getElementById("post").getElementsByTagName("button")[0];
    var username = "";
    var message = "";
    var count = 0;
    var limitWarn = document.getElementById("post").getElementsByTagName("span");
    var postArea = document.getElementById("showmessage");
    var existMessages = postArea.getElementsByClassName("wholepost");
    // reset to initial status
    function reset() {
        username = "";
        message = "";
        count = 0;
        NameInput.value = "";
        messageInput.value = "";
        limitWarn[0].innerHTML = LETTERLIMIT;
        selectedPic = "image/face1.gif";
        for (var j = 0; j < pictures.length; j++) pictures[j].className="";
        pictures[0].className = "current";
    }
    
    // click to select a picture as current picture
    for (var i = 0; i < pictures.length; i++) {
        pictures[i].onclick = function() {
            for (var j = 0; j < pictures.length; j++) pictures[j].className="";
            this.className = "current";
            selectedPic = this.src;
        }
    }

    // add an eventHandler to the "post" button
    // when the button is clicked, the username and message are checked and then the message is posted if valid
    postButton.onclick = function() {
        postMsg();
    }
    
    // pressing ctrl + enter servers the same function as the "post" button
    document.onkeyup = function(event) {
        var event = event || window.event;
        event.ctrlKey && event.keyCode == 13 && postMsg();
    }   
    
    // add an eventHandler to textarea to handle the word limit
    messageInput.onkeyup = function() {
        // count the input letters, and update the letters left
        count = this.value.length;
        if (count > LETTERLIMIT) {
            limitWarn[1].innerHTML = "exceeded";
        } else  limitWarn[1].innerHTML = "left";
        limitWarn[0].innerHTML = Math.abs(LETTERLIMIT-count); 
               
    }
    
    // add eventHandlers to each posted message
    // when a posted message is pointed at, a remove button will appear
    // when the mouse moves away, the remove button is hidden
        for (var i = 0; i < existMessages.length; i++) {
            handleRm(existMessages[i]);
        }
        
    /**
     * this is a function to add eventHandlers to posted messages to show or hide the "remove" button
     **/
    function handleRm(msgElement) {
        var rm = msgElement.getElementsByClassName("remove")[0]
        msgElement.onmouseover = function() {
            rm.style.display = "block";
        }        
        msgElement.onmouseout = function() {
            rm.style.display = "none";
        }
        // add handlers to remove buttons   
        // when the button is clicked, the post will be deleted
        rm.onclick = function() {
            postArea.removeChild(msgElement);
        }        
    }    
    
    /**
     * a function to check the validation of a new message before posting it
     **/
    function postMsg() {
        username = NameInput.value;
        message = messageInput.value;
        // if input areas are blank when click the "post" button, an alert window appears
        if (username == "") alert("Username, please!");
        // check if the username is valid
        else if (!/^[a-zA-Z0-9_]{2,8}$/.test(username)) alert("An valid username should be the combination of letters, numbers and _ with a length of 2-8.")
        else if (message == "") alert("Please say something.");
        else if (count > LETTERLIMIT) alert("The length of your message exceeded the limit.")
        else {
            addMessage(username, message, selectedPic);
            reset();
        }
    } 
     
    /** 
     * this is a function to post the name, message and picture onto the post area.
     **/
    function addMessage(nameS, messageS, picSrcS) {
        var firstPost = postArea.getElementsByTagName("div")[0];
        var newDiv = document.createElement("div");        
        var postTime = new Date();
        newDiv.className = "wholepost";
        newDiv.innerHTML = "<img src=" + picSrcS + "><div><span class=\"name\">"+ nameS 
                           + ": </span><span class=\"message\">"+ messageS 
                           + "</span><p class=\"date\">"
                           + formatNumS(postTime.getMonth()+1) + "/" + formatNumS(postTime.getDate()) + " " 
                           + formatNumS(postTime.getHours()) + ":" + formatNumS(postTime.getMinutes()) 
                           + "<span style=\"display:none\" class=\"remove\">remove</span></p></div>";
        postArea.insertBefore(newDiv, firstPost);
        // handle "remove" for the new post
        handleRm(newDiv);        
     }
     
    /** 
     * a function used to format single-digit-number string to "0x"
     **/
    function formatNumS(s) {
        return s.toString().replace(/^(\d)$/, "0$1");
    }    
    
}