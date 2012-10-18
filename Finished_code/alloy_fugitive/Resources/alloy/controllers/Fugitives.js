function Controller() {
    function populateData() {
        var fugitiveCollection = Alloy.createCollection("Fugitive");
        fugitiveCollection.on("fetch", function() {
            var atLargeCollection = fugitiveCollection.where({
                captured: 0
            });
            Ti.API.info(" users..." + JSON.stringify(fugitiveCollection));
            var rows = [];
            $.table.setData([]);
            for (var i = 0; i < atLargeCollection.length; i++) {
                var model = atLargeCollection[i], row = Alloy.createController("FugitiveRow", model.toJSON()).getView();
                row.model = model;
                rows.push(row);
            }
            $.table.setData(rows);
        });
        fugitiveCollection.fetch();
    }
    function addNewFugitive() {
        var addFugitiveController = Alloy.createController("FugitiveAdd");
        $.fugitiveTab.open(addFugitiveController.getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.fugitiveWindow = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        backgroundImage: "images/grain.png",
        title: "Fugitives",
        barColor: "#6d0a0c",
        id: "fugitiveWindow"
    }), "Window", null);
    var __alloyId2 = [];
    $.__views.table = A$(Ti.UI.createTableView({
        backgroundColor: "transparent",
        id: "table"
    }), "TableView", $.__views.fugitiveWindow);
    $.__views.fugitiveWindow.add($.__views.table);
    $.__views.add = A$(Ti.UI.createButton({
        id: "add",
        title: "Add",
        top: "-50dp"
    }), "Button", $.__views.fugitiveWindow);
    $.__views.fugitiveWindow.add($.__views.add);
    $.__views.fugitiveTab = A$(Ti.UI.createTab({
        icon: "/images/fugitives.png",
        window: $.__views.fugitiveWindow,
        id: "fugitiveTab",
        title: "Fugitives"
    }), "Tab", null);
    $.addTopLevelView($.__views.fugitiveTab);
    _.extend($, $.__views);
    $.table.addEventListener("click", function(_e) {
        var detailController = Alloy.createController("FugitiveDetail", {
            parentTab: $.fugitiveTab,
            data: _e.rowData.model
        });
        $.fugitiveTab.open(detailController.getView());
    });
    $.on("update_table", populateData);
    Ti.App.addEventListener("update_table", function() {
        populateData();
    });
    if (Ti.Platform.osname === "iphone") {
        $.add.style = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
        $.add.addEventListener("click", addNewFugitive);
        $.fugitiveWindow.setRightNavButton($.add);
    }
    populateData();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;