function Controller() {
    function populateData() {
        var fugitiveCollection = Alloy.createCollection("Fugitive");
        fugitiveCollection.on("fetch", function() {
            var capCollection = fugitiveCollection.where({
                captured: 1
            }), rows = [];
            $.table.setData([]);
            for (var i = 0; i < capCollection.length; i++) {
                var model = capCollection[i], row = Alloy.createController("FugitiveRow", model.toJSON()).getView();
                row.model = model;
                rows.push(row);
            }
            $.table.setData(rows);
            Ti.API.debug("set table data");
        });
        fugitiveCollection.fetch();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.capturedWindow = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        backgroundImage: "images/grain.png",
        title: "Captured",
        barColor: "#6d0a0c",
        id: "capturedWindow"
    }), "Window", null);
    var __alloyId0 = [];
    $.__views.table = A$(Ti.UI.createTableView({
        backgroundColor: "transparent",
        id: "table"
    }), "TableView", $.__views.capturedWindow);
    $.__views.capturedWindow.add($.__views.table);
    $.__views.capturedTab = A$(Ti.UI.createTab({
        icon: "/images/captured.png",
        window: $.__views.capturedWindow,
        id: "capturedTab",
        title: "Captured"
    }), "Tab", null);
    $.addTopLevelView($.__views.capturedTab);
    _.extend($, $.__views);
    $.table.addEventListener("click", function(_e) {
        var detailController = Alloy.createController("FugitiveDetail", {
            parentTab: $.capturedTab,
            data: _e.rowData.model
        });
        $.capturedTab.open(detailController.getView());
    });
    $.on("update_table", populateData);
    Ti.App.addEventListener("update_table", function() {
        populateData();
    });
    populateData();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;