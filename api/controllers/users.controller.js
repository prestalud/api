const constant = require("../../config/constant");
const messages = constant.messages;
const status = constant.status;
const table = constant.table;

const auth = require('../services/auth')
let firebase = require("../../config/firebase");
let Constants = require("../models/constants.model");
let Profiles = require("../models/profiles.model");
let Users = require("../models/users.model");

exports.create = (req, res) => {
    const oUser = new Users({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        lastname: req.body.lastname,
        full_names: (req.body.name && req.body.lastname) ? `${req.body.name} ${req.body.lastname}` : null,
        phone: req.body.phone || null,
        mobile: req.body.mobile || null,
        email: req.body.email || null,
        creator: req.body.creator || null,
        status: req.body.status || null,
        profile: req.body.profile || null,
        updated: null
    });
    
    oUser.save(err => {
        if (err) {
            res.status(200).send({ success: false, error: err, message: messages.m5 });
        } else {
            res.status(200).send({ success: true, data: { token: auth.createToken(oUser) } });
        }
    });
};

exports.update = (req, res, next) => {
    Users.findOne({username: req.params.username})
    .populate('creator')
    .populate('status')
    .populate('profile')
    .exec((err, response) => {
        if (err) {
            res.status(200).send({ success: false, error: err, message: messages.m6 });
        } else {
            if (response) {
                response.username = req.body.username || response.username;
                response.password = req.body.password || response.password;
                response.name = req.body.name || response.name;
                response.lastname = req.body.lastname || response.lastname;
                response.full_names = req.body.full_names || response.full_names;
                response.phone = req.body.phone || response.phone;
                response.mobile = req.body.mobile || response.mobile;
                response.email = req.body.email || response.email;
                response.creator = req.body.creator || response.creator;
                response.status = req.body.status || response.status;
                response.profile = req.body.profile || response.profile;
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

// exports.save = (req, res, next) => {
//     let users = firebase.db.ref(table.users).push();

//     users.set({
//         name: req.body.name || null,
//         lastname: req.body.lastname || null,
//         fullname: `${req.body.name} ${req.body.lastname}`,
//         token: req.body.token || null
//     }, (error) => {
//         if (error) {
//             res.status(200).send({ success: false, error: error, message: 'Usuario no registrado.', data: null });
//         } else {
//             res.status(200).send({ success: true, error: null, message: 'Usuario registrado.', data: user.key });
//         }
//     });
// };

exports.getAll = (req, res, next) => {
    Users.find({})
    .populate('creator')
    .populate('status')
    .populate('profile')
    .exec((err, users) => {
        if (err) {
            res.status(200).send({ success: false, error: err });
        } else {
            res.status(200).send({ success: true, data: users });
        }
    });
};

exports.getByUsername = (req, res, next) => {
    Users.findOne({username: req.params.username})
    .populate('creator')
    .populate('status')
    .populate('profile')
    .exec((err, users) => {
        if (err) {
            res.status(200).send({ success: false, error: err });
        } else {
            res.status(200).send({ success: true, data: users });
        }
    });
};

exports.signIn = (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(200).send({
                success: true,
                data: { token: auth.createToken(user) },
                message: messages.m7
            });
        } else {
            res.status(200).send({ success: false, message: messages.m6 });
        }
    }).catch(error => { res.status(500).send({ success: false, error: error.message }); });
};