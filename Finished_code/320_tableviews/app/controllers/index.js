var tbldata = [];
for(var i=0;i<8;i++) {
	var row = Alloy.createController('row', {
		primaryLabel: 'This is row ' + i,
		subTitle: 'Subtitle ' + i,
		rownum: i,
		myImage: (i%2==0) ? 'a' : 'b'
	}).getView();
	tbldata.push(row);
} // end for loop
tbldata.push(Alloy.createController('row', {
	primaryLabel: 'This is the last row',
	subTitle: 'The last subtitle ',
	rownum: 'last',
	myImage: 'c'
}).getView());
$.theTable.data = tbldata;


$.theTable.addEventListener('click', function(e){
Ti.API.info('Source: ' + JSON.stringify(e.source));
	switch(e.source.myImage) {
		case 'a':
			e.source.image = 'imageB.png';
			e.source.myImage = 'b';
		break;
		case 'b':
			e.source.image = 'imageC.png';
			e.source.myImage = 'c';
		break;
		case 'c':
			e.source.image = 'imageA.png';
			e.source.myImage = 'a';
		break;
		case 'blue':
			e.source.image = 'notificationUnreadBadge.png';
			e.source.myImage = 'red';
		break;
		case 'red':
			e.source.image = 'notificationBadge.png';
			e.source.myImage = 'blue';
		break;
	}
});

$.index.open();
