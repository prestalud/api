const table = require("./../../config/constant").table;
const mongoose = require("./index");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const profileSchema = new Schema({
    name: { type: String, unique: true },
    description: String,
    creator: { type: ObjectId, ref: table.users },
    status: { type: ObjectId, ref: table.constants },
    created: { type: Date, default: Date.now },
    updated: Date
});

module.exports = mongoose.model(table.profiles, profileSchema);