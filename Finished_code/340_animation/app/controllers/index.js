function doBox1(e) {  
    $.box1.animate({
    	opacity:0,
    	duration:2000,
    	autoreverse: true
    });
}
var newtop = Ti.Platform.displayCaps.platformHeight + 20;
function doBox2(e) {
    $.box2.animate({
    	top:newtop,
    	duration:2000,
    	autoreverse: true
    });
}
var animation = require('alloy/animation');
function doBox3(e) {
	animation.shake($.box3, 30);
}

$.index.open();
