function Controller() {
    function doClick(e) {
        alert($.label.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.tabGroup = A$(Ti.UI.createTabGroup({
        id: "tabGroup"
    }), "TabGroup", null);
    $.__views.__alloyId3 = Alloy.createController("Fugitives", {
        id: "__alloyId3"
    });
    $.__views.tabGroup.addTab($.__views.__alloyId3.getViewEx({
        recurse: !0
    }));
    $.__views.__alloyId4 = Alloy.createController("Captured", {
        id: "__alloyId4"
    });
    $.__views.tabGroup.addTab($.__views.__alloyId4.getViewEx({
        recurse: !0
    }));
    $.addTopLevelView($.__views.tabGroup);
    _.extend($, $.__views);
    if (!Ti.App.Properties.hasProperty("seeded")) {
        var net = require("lib/network");
        net.getFugitives(function(data) {
            for (var i = 0; i < data.length; i++) Alloy.createModel("Fugitive", {
                name: data[i].name,
                captured: !1
            }).save();
            Ti.App.Properties.setString("seeded", "yuppers");
            $.tabGroup.open();
            Ti.App.fireEvent("update_table");
        });
    } else $.tabGroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;