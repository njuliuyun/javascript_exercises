var NOI = 5; // number of images
var srcs = ["butterfly/01.jpg", "butterfly/02.jpg", "butterfly/03.jpg", "butterfly/04.jpg", "butterfly/05.jpg"];
var w = 490; // size of each image
var h = 170;
var border = 10;
var marginTop = 10;
var x = 0;

var Img = function(src, i) {
    this.index = i;
    this.elem = document.createElement("img");
    this.elem.src = src;
    this.elem.style.width = w + "px";
    this.elem.style.height = h + "px";
};
Img.prototype.move = function(speed) {
    x++;
    if (x <= 250 && x > 170 && (this.index == 0 || this.index == 4)) {
        console.log("s: " + speed);
        console.log(this.index);
        console.log(this.elem.offsetTop);        
    }
    if (this.elem.offsetTop <= -2 * h) {
        this.elem.style.top = 3 * h + speed + "px";
    }
    else if (this.elem.offsetTop >= 3 * h) {
        this.elem.style.top = -2 * h + speed + "px";
    } 
    else {
        this.elem.style.top = this.elem.offsetTop + speed + "px";
    }
};

var AutoPlay = function(id, srcs, n) {
    this.initialize(id, srcs, n);
};
AutoPlay.prototype = {
    initialize: function(id, srcs, n){
        this.srcs = srcs;
        this.n = n;
        this.container = document.getElementById(id);
        this.timer = null;
        this.autoTimer = null;
        this.imgs = [];
        this.nums = [];
        this.currI = 0;        
        this.createSlides();
        this.createButton();
        this.nums[this.currI].className = "current";
        
        
        var oThis = this;
        // add event listener: when a number is clicked, the image of that index will be displayed 
        for (var i = 0; i < this.n; i++) {
            this.nums[i].index = i;
            this.nums[i].onmouseover = function() {
                clearInterval(oThis.autoTimer);
                oThis.currI = this.index;
                oThis.showCurrent();
            }
        }
        // move mouse to the image, the autoshow will stop
        /* this.container.onmouseover = function() {
            clearInterval(oThis.autoTimer);
        };
        this.container.onmouseout = function() {
            this.autoTimer = setInterval(function() {
                oThis.next();
            }, 3000);
        }; */
        this.autoMove();
    },
    createSlides: function() {
        var slides = document.createElement("ul");
        for (var i = 0; i < this.n; i++) {            
            var imgLi = document.createElement("li");
            var img = new Img(this.srcs[i], i);
            this.imgs.push(img);
            if (i > 0) this.imgs[i-1].next = img;
            img.elem.style.top = i < 3? i * 170 + "px" : (i - this.n) * 170 + "px";
            imgLi.appendChild(img.elem);
            slides.appendChild(imgLi);            
        }
        this.container.appendChild(slides);
        slides.className = "slides";
    },
    createButton: function() {
        var numbers = document.createElement("ul");
        for (var i = 0; i < this.n; i++) {
            var numberLi = document.createElement("li");
            numberLi.innerHTML = i + 1;
            this.nums.push(numberLi);
            numbers.appendChild(numberLi);
        }
        this.container.appendChild(numbers);
        numbers.className = "numbers";
    },
    
    autoMove: function() {
        var oThis = this;
        this.autoTimer = setInterval(function() {
            oThis.next();            
        }, 3000);
    },
    showCurrent: function() {
        for (var i = 0; i < this.n; i++) {
            this.nums[i].className = "";
        }
        this.nums[this.currI].className = "current";
        this.moveTo(this.imgs[this.currI], 0);        
    },
    next: function() {
        this.currI++;
        this.currI == this.n && (this.currI = 0);
        this.showCurrent();        
    },
    moveTo: function(oImg, iTarget) {
        var imgElem = oImg.elem;
        var oThis = this;
        clearInterval(oThis.timer);
        oThis.timer = setInterval(function() {
            var speed = (iTarget - imgElem.offsetTop) / oThis.n;
            //console.log(speed);
            speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
            if (imgElem.offsetTop == iTarget) {
                clearInterval(oThis.timer)
            } else {
                for (var i = 0; i < oThis.n; i++) {
                    oThis.imgs[i].move(speed);
                }
            }   
        }, 30);
    }
}
window.onload = function() {
    var a = new AutoPlay("container", srcs, NOI);    
    
} 
