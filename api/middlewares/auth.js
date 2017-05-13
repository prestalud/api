const constant = require("../../config/constant");
const messages = constant.messages;

const services = require('../services/auth');

exports.isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(200).send({ message: messages.m4 });
    }

    const token = req.headers.authorization.split(' ')[1];

    services.decodeToken(token).then(response => {
        req.user = response;
        next();
    }).catch(response => { res.status(response.status) });
}
