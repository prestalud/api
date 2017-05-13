const table = require("./../../config/constant").table;
const mongoose = require("./index");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let constantSchema = new Schema({
    name: { type: String, unique: true },
    value: String,
    father: { type: ObjectId, ref: table.constants },
    creator: { type: ObjectId, ref: table.users },
    status: { type: ObjectId, ref: table.constants },
    created: { type: Date, default: Date.now },
    updated: Date
});

module.exports = mongoose.model(table.constants, constantSchema);