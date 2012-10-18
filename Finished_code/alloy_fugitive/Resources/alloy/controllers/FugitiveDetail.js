function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.detailWindow = A$(Ti.UI.createWindow({
        layout: "vertical",
        barColor: "#6d0a0c",
        backgroundColor: "transparent",
        backgroundImage: "images/grain.png",
        id: "detailWindow",
        title: "Fugitive"
    }), "Window", null);
    $.addTopLevelView($.__views.detailWindow);
    $.__views.name_lbl = A$(Ti.UI.createLabel({
        id: "name_lbl"
    }), "Label", $.__views.detailWindow);
    $.__views.detailWindow.add($.__views.name_lbl);
    $.__views.captured_lbl = A$(Ti.UI.createLabel({
        top: 10,
        textAlign: "center",
        font: {
            fontWeight: "bold",
            fontSize: 18
        },
        color: "#fff",
        height: Ti.UI.SIZE,
        id: "captured_lbl"
    }), "Label", $.__views.detailWindow);
    $.__views.detailWindow.add($.__views.captured_lbl);
    $.__views.image = A$(Ti.UI.createImageView({
        height: 80,
        width: 60,
        top: 10,
        id: "image"
    }), "ImageView", $.__views.detailWindow);
    $.__views.detailWindow.add($.__views.image);
    $.__views.photo_button = A$(Ti.UI.createButton({
        title: "Add Photo",
        top: 10,
        height: Ti.UI.SIZE,
        width: 200,
        id: "photo_button"
    }), "Button", $.__views.detailWindow);
    $.__views.detailWindow.add($.__views.photo_button);
    $.__views.capture_button = A$(Ti.UI.createButton({
        title: "Capture",
        top: 10,
        height: Ti.UI.SIZE,
        width: 200,
        id: "capture_button"
    }), "Button", $.__views.detailWindow);
    $.__views.detailWindow.add($.__views.capture_button);
    $.__views.map_button = A$(Ti.UI.createButton({
        title: "View On Map",
        top: 10,
        height: Ti.UI.SIZE,
        width: 200,
        id: "map_button"
    }), "Button", $.__views.detailWindow);
    $.__views.detailWindow.add($.__views.map_button);
    $.__views.delete_button = A$(Ti.UI.createButton({
        title: "Delete",
        top: 10,
        height: Ti.UI.SIZE,
        width: 200,
        id: "delete_button"
    }), "Button", $.__views.detailWindow);
    $.__views.detailWindow.add($.__views.delete_button);
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    if (args.data) {
        $.detailWindow.title = args.data.get("name");
        $.captured_lbl.text = args.data.get("captured") ? "Captured" : "Not Captured";
        $.image.image = args.data.get("url") || "/images/burglar.png";
        args.data.get("captured") ? $.capture_button.visible = "false" : $.capture_button.visible = "true";
    }
    $.photo_button.addEventListener("click", function(_e) {
        var cameraOptions = {
            success: function(event) {
                var image = event.media;
                $.image.image = image;
                var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "photo" + args.data.get("id") + ".png");
                f.write(image);
                var fugitiveModel = args.data;
                fugitiveModel.set("url", f.nativePath);
                fugitiveModel.save();
                Ti.App.fireEvent("update_table");
            },
            cancel: function() {},
            error: function(error) {
                var a = Ti.UI.createAlertDialog({
                    title: "Camera Error"
                });
                error.code == Ti.Media.NO_CAMERA ? a.setMessage("MISSING CAMERA") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            saveToPhotoGallery: !0,
            allowEditing: !0,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        };
        Ti.Media.isCameraSupported ? Ti.Media.showCamera(cameraOptions) : Ti.Media.openPhotoGallery(cameraOptions);
    });
    $.map_button.addEventListener("click", function(_e) {
        if (args.data.get("capturedLat")) {
            var mapController = Alloy.createController("MapDetail", {
                model: args.data
            });
            args.parentTab.open(mapController.getView());
        } else alert("Not Captured Yet");
    });
    $.delete_button.addEventListener("click", function(_e) {
        args.data.destroy();
        Ti.App.fireEvent("update_table");
        Ti.Platform.osname == "android" ? setTimeout(function() {
            $.detailWindow.close();
        }, 2000) : $.detailWindow.close();
    });
    $.capture_button.addEventListener("click", function(_e) {
        Ti.Geolocation.purpose = "Tracking down criminal scum";
        if (Ti.Geolocation.locationServicesEnabled) {
            Ti.Platform.osname === "android" ? Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH : Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
            Ti.Geolocation.getCurrentPosition(function(e) {
                if (!e.error) {
                    var fugitiveModel = args.data;
                    fugitiveModel.set("capturedLat", e.coords.latitude);
                    fugitiveModel.set("capturedLong", e.coords.longitude);
                    fugitiveModel.set("captured", 1);
                    fugitiveModel.save();
                    Ti.App.fireEvent("update_table");
                    Ti.Platform.osname == "android" ? setTimeout(function() {
                        $.detailWindow.close();
                    }, 2000) : $.detailWindow.close();
                } else Ti.UI.createAlertDialog({
                    title: "Error",
                    message: "Geolocation failed. Do you have a location set on your Android emulator?"
                }).show();
            });
        } else Ti.UI.createAlertDialog({
            title: "Error",
            message: "No Location Services"
        }).show();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;