// ..
// PRIVATE FUNCTIONS
//
/**
 *
 */
function populateData() {

	var fugitiveCollection = Alloy.createCollection("Fugitive");

	// update the table here
	fugitiveCollection.on("fetch", function() {
		// filter the collection
		var capCollection = fugitiveCollection.where({
			captured : 1
		});


		var rows = [];
		$.table.setData([]);
		// only display captured users

		for (var i = 0; i < capCollection.length; i++) {
			var model = capCollection[i];
			var row = Alloy.createController('FugitiveRow', model.toJSON()).getView();
			row.model = model;
			rows.push(row);
		}
		$.table.setData(rows);
		Ti.API.debug("set table data");

	});

	// get the data
	fugitiveCollection.fetch();

}

//
// EVENT LISTENERS
//
$.table.addEventListener('click', function(_e) {
	var detailController = Alloy.createController('FugitiveDetail', {
		parentTab : $.capturedTab,
		data : _e.rowData.model
	});
	$.capturedTab.open(detailController.getView());
});

// force table update
$.on('update_table', populateData);

// force tables to update
Ti.App.addEventListener('update_table', function() {
	populateData();
});

//
// INITIALIZERS
//

//run initial query
populateData();
