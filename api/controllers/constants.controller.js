const constant = require("../../config/constant");
const messages = constant.messages;
const status = constant.status;
const table = constant.table;

let Constants = require("../models/constants.model");
let Users = require("../models/users.model");

exports.create = (req, res, next) => {
    const oConstant = new Constants({
        name: req.body.name,
        value: req.body.value,
        father: req.body.father || null,
        creator: req.body.creator || null,
        status: req.body.status || null,
        updated: null
    });
    
    oConstant.save(err => {
        if (err) {
            res.status(200).send({ success: false, error: err, message: messages.m5 });
        } else {
            res.status(200).send({ success: true, data: oConstant });
        }
    });
};

exports.update = (req, res, next) => {
    Constants.findOne({name: req.params.name})
    .populate('father')
    .populate('creator')
    .populate('status')
    .exec((err, response) => {
        if (err) {
            res.status(200).send({ success: false, error: err, message: messages.m6 });
        } else {
            if (response) {
                response.name = req.body.name || response.name;
                response.value = req.body.value || response.value;
                response.father = req.body.father || response.father;
                response.status = req.body.status || response.status;
                response.updated = new Date();
                
                response.save(err => {
                    if (err) {
                        res.status(200).send({ success: false, error: err, message: messages.m8 });
                    } else {
                        res.status(200).send({ success: true, data: response });
                    }
                });
            } else {
                res.status(200).send({ success: false, message: messages.m6 });
            }
        }
    });
}

exports.getAll = (req, res, next) => {
    Constants.find({})
    .populate('father')
    .populate('creator')
    .populate('status')
    .exec((err, response) => {
        if (err) {
            res.status(200).send({ success: false, error: err, message: messages.m1 });
        } else {
            if (response) {
                res.status(200).send({ success: true, data: response });
            } else {
                res.status(200).send({ success: false, message: messages.m1 });
            }
        }
    });
};

exports.getByName = (req, res, next) => {
    Constants.findOne({name: req.params.name})
    .populate('father')
    .populate('creator')
    .populate('status')
    .exec((err, response) => {
        if (err) {
            res.status(200).send({ success: false, error: err, message: messages.m6 });
        } else {
            res.status(200).send({ success: true, data: response });
        }
    });
};