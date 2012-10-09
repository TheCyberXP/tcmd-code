var win = Ti.UI.createWindow({
	backgroundImage: 'images/grain.png',
	color:'#fff',
	layout: 'vertical'
});
var heading = Ti.UI.createLabel({
	text:'Enter some data:',
	font:{
		fontWeight:'bold',
		fontSize:22
	},
	color:'#fff',
	width:'auto',
	height:'auto',
	top:10,
	left: 10
});
win.add(heading);

var button = Ti.UI.createImageView({
	image:'images/add.png',
	top:10,
	left:20,
	width:31,
	height:31
});
win.add(button);

button.addEventListener('click', function() {
	var subwindow = Ti.UI.createWindow({
		modal:true,
		title:'Fugitive Vitals'
	});
	var webview = Ti.UI.createWebView({
		url:'html/addForm.html',
		backgroundColor:'#787878'
	});
	subwindow.add(webview);
	
	Ti.App.addEventListener('fugitiveSaved', function(e) {
	/*
		Add code here that will handle data returned from the web view:
			- remove the button from the window
			- close subwindow
			- update the heading to read "Here's what you entered:"
			- pass the data received from the webview to the outputFugitiveStats() function
			- add the view returned from that function to the window
	*/
		win.remove(button);
		subwindow.close();
		heading.text = "Here's what you entered:";
		win.add(outputFugitiveStats(e));
	});
	subwindow.open();
	
});

function makeLabel(label) {
	return Ti.UI.createLabel({
		text:label,
		top: 10,
		font:{
			fontWeight:'bold',
			fontSize:18
		},
		textAlign:'left',
		color:'#fff',
		width:'100%',
		height:'auto'		
	});
}

function outputFugitiveStats(fugitive) {
	var fugitiveView = Ti.UI.createView({
		width:'90%',
		height:'auto',
		top:10,
		left:10,
		layout:'vertical'
	});
	fugitiveView.add(makeLabel(fugitive.name + ', AKA ' + fugitive.alias));
	fugitiveView.add(makeLabel('Height: '+fugitive.heightInches));
	fugitiveView.add(makeLabel('Stats: '+fugitive.description));
	return fugitiveView;
}

// Our simple module publishes the window only
exports.mainWin = win;

