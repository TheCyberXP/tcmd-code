exports.definition = {
    config: {
        columns: {
            name: "string",
            captured: "integer",
            url: "string",
            capturedLat: "real",
            capturedLong: "real"
        },
        adapter: {
            type: "sql",
            collection_name: "fugitives"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Fugitive", exports.definition, [ function(migration) {
    migration.name = "Fugitive";
    migration.id = "201208231711776";
    migration.up = function(db) {
        db.createTable({
            columns: {
                name: "string",
                captured: "integer",
                url: "String",
                capturedLat: "real",
                capturedLong: "real"
            },
            adapter: {
                type: "sql",
                collection_name: "fugitives"
            }
        });
    };
    migration.down = function(db) {
        db.dropTable("fugitives");
    };
} ]);

collection = Alloy.C("Fugitive", exports.definition, model);

exports.Model = model;

exports.Collection = collection;