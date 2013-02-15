var args = arguments[0] || {};
$.primaryLabel.text = args.primaryLabel || '';
$.subtitle.text = args.subTitle || '';
$.leftImage.image = (args.rownum % 2 == 0) ? 'imageA.png' : 'imageB.png';
$.rowView.num = args.num || '';
$.leftImage.myImage = args.myImage || '';

if(args.rownum == 0) {
	$.rowView.backgroundImage = 'topRow.png';
	$.rowView.selectedBackgroundImage = 'topRowSelected.png';
} else if(args.rownum == 'last') {
	$.rowView.backgroundImage = 'bottomRow.png';
	$.rowView.selectedBackgroundImage = 'bottomRowSelected.png';
	$.leftImage.image='imageC.png';		
}
