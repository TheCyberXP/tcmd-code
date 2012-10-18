function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.mapWindow = A$(Ti.UI.createWindow({
        title: "Captured Location",
        barColor: "#6d0a0c",
        backgroundColor: "#fff",
        id: "mapWindow"
    }), "Window", null);
    $.addTopLevelView($.__views.mapWindow);
    var __alloyId5 = [];
    $.__views.mapView = A$(Ti.Map.createView({
        mapType: Ti.Map.STANDARD_TYPE,
        animate: !0,
        regionFit: !0,
        userLocation: !1,
        annotations: __alloyId5,
        ns: "Ti.Map",
        id: "mapView"
    }), "View", $.__views.mapWindow);
    $.__views.mapWindow.add($.__views.mapView);
    _.extend($, $.__views);
    var args = arguments[0] || {}, ann = Ti.Map.createAnnotation({
        latitude: args.model.get("capturedLat"),
        longitude: args.model.get("capturedLong"),
        title: args.model.get("name"),
        subtitle: "busted",
        pincolor: Ti.Map.ANNOTATION_RED,
        animate: !0
    });
    $.mapView.addAnnotation(ann);
    $.mapView.setRegion({
        latitude: args.model.get("capturedLat"),
        longitude: args.model.get("capturedLong"),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;