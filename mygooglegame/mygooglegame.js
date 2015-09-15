var images = [{
    img: "img/1.jpg",
    small: "img/1_.jpg",
    tit: "Bubble Witch Saga"
},
{   img: "img/2.jpg",
    small: "img/2_.jpg",
    tit: "GolMania",    
},
{
	img: "img/3.jpg",
    small: "img/3_.jpg",
	tit: "Bug Village"
},
{
	img: "img/4.jpg",
    small: "img/4_.jpg",
	tit: "Dragon Age Legends"
},
{
	img: "img/5.jpg",
    small: "img/5_.jpg",
	tit: "Triple Town"
},
{
	img: "img/6.jpg",
    small: "img/6_.jpg",
	tit: "GolMania"
},
{
	img: "img/7.jpg",
    small: "img/7_.jpg",
	tit: "GT Racing: Motor Academy"
},
{
	img: "img/8.jpg",
    small: "img/8_.jpg",
	tit: "Dragons of Atlantis"
},
{
	img: "img/9.jpg",
    small: "img/9_.jpg",
	tit: "Edgeworld"
},
{
	img: "img/10.jpg",
    small: "img/10_.jpg",
	tit: "Bejeweled Blitz"
},
{
	img: "img/11.jpg",
    small: "img/11_.jpg",
	tit: "Backyard Monsters"
}];

var timer = null;

var n = images.length;
var large = document.getElementById("large");
var largeImgEs = [];

var small = document.getElementById("small");
var smallLiEs = [];
var leftOffSet = 390;
var smallSpace = 42;

function create() {
    // create large images
    for (var i = 0; i < n; i++) {
        var imgE = document.createElement("img");
        imgE.src = images[i].img;
        imgE.style.opacity = 0;
        large.appendChild(imgE);
        largeImgEs.push(imgE);
    }
    largeImgEs[0].style.opacity = 1;
    
    // create small images
    for (var i = 0; i < n; i++) {
        var liE = document.createElement("li");  
        liE.innerHTML = "<img src='" + images[i].img.replace(/(\d+)/, "$1_") + "'/><div><h5>" + images[i].tit + "</h5><a src='#'>Play</a></div>";    
        liE.getElementsByTagName("div")[0].style.display = "none";
        small.appendChild(liE);
        smallLiEs.push(liE);
    }
    
    // mouseover event
    for (var i = 0; i < n; i++) {
        smallLiEs[i].onmouseover = function() {
            clearInterval(timer);
            if (this.className != "active") {
                this.style["transition-delay"] = "0s";
                this.style.bottom = "10px";
                this.getElementsByTagName("div")[0].style.display = "block";
                this.getElementsByTagName("a")[0].style.display = "none";
            }
        }
        largeImgEs[i].onmouseover = function() {
            clearInterval(timer);
        }
    }

    for (var i = 0; i < n; i++) {
        smallLiEs[i].onmouseout = function() {
            play();
            if (this.className != "active") {
                this.style.bottom = "0";
                this.getElementsByTagName("div")[0].style.display = "none";
                this.getElementsByTagName("a")[0].style.display = "block";
            }
        }
        largeImgEs[i].onmouseout = function() {
            play();
        }
    }
}


// animation
var index = 1;
function play() {
    timer = setInterval(function() {
        for (var i = 0; i < n; i++) {
            largeImgEs[i].style.opacity = 0;
            smallLiEs[i].className = "";        
        }
        index = index % n;
        largeImgEs[index].style.opacity = 1;
        showI(index);
        index++;
    }, 5000);
}


function init() {
    for (var i = 0; i < n; i++) {
        smallLiEs[i].style.left = leftOffSet + i * smallSpace + "px";
    }
    setTimeout(function() {
        smallLiEs[0].className = "active";
        smallLiEs[0].style.left = "10px";
        setTimeout(function() {
            smallLiEs[0].getElementsByTagName("div")[0].style.display = "block";
        }, 1000);
    }, 100);
}

function showI(index) {
    
    for (var i = 1; i < n; i++) {
        var j = (index + i)% n;
        smallLiEs[j].style.opacity = 1;
        smallLiEs[j].style["transition-delay"] = 0.5 + i * 0.1 + "s";
        smallLiEs[j].style.left = leftOffSet + (i - 1) * smallSpace + "px";
    }
    smallLiEs[index].className = "active";
    setTimeout(function() {
        smallLiEs[index].getElementsByTagName("div")[0].style.display = "block";
    }, 1000);
    smallLiEs[index].style["transition-delay"] = "0s";
    var prev = index > 0? index - 1 : n - 1;
    smallLiEs[index].style.left = "10px";
    smallLiEs[prev].style.left = "-300px";
    smallLiEs[prev].className = "active";
    smallLiEs[prev].style["transition-delay"] = "0s";
    smallLiEs[prev].style.opacity = 0;
    smallLiEs[prev].getElementsByTagName("div")[0].style.display = "none";
    setTimeout(function() {
        smallLiEs[prev].className = "";
        smallLiEs[prev].style.left = "900px";
    }, 1000);
    
}

setTimeout(function() {
    var load = document.getElementById("load");
    load.style.display = "none";
    create();
    init();
    play();
}, 2000);

