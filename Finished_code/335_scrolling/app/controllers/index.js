$.scrolly.addEventListener('click', function(e) {
	if(e.source.player) {
		$.cards.views[0].image = e.source.player+'1.jpg';
		$.cards.views[1].image = e.source.player+'2.jpg';
		$.cards.views[2].image = e.source.player+'3.jpg';
		$.cards.scrollToView(0);
	}
});

$.index.open();
