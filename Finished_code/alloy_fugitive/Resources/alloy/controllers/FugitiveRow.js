function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        className: "loc_row",
        dataId: "",
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.__alloyId1 = A$(Ti.UI.createView({
        layout: "vertical",
        height: "50dp",
        id: "__alloyId1"
    }), "View", $.__views.row);
    $.__views.row.add($.__views.__alloyId1);
    $.__views.name = A$(Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "24dp"
        },
        top: "2dp",
        height: Ti.UI.SIZE,
        left: "5dp",
        right: "5dp",
        id: "name"
    }), "Label", $.__views.__alloyId1);
    $.__views.__alloyId1.add($.__views.name);
    $.__views.address = A$(Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "20dp"
        },
        id: "address"
    }), "Label", $.__views.__alloyId1);
    $.__views.__alloyId1.add($.__views.address);
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.name.text = args.name || "";
    $.row.dataId = args.id;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;