const constant = require("./../../config/constant");
const secret = constant.secret;
const messages = constant.messages;

const jwt = require("jwt-simple");
const moment = require("moment");

/**
 * Creacion de token
 * 
 * @author MIGUEL CARO <003.mcaro@gmail.com>
 * @param {object} user usuario
 * @return {string} token
 */
let createToken = (user) => {
    const payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, secret);
}

/**
 * Decodificacion y validacion del token
 * 
 * @author MIGUEL CARO <003.mcaro@gmail.com>
 * @param {object} user usuario
 * @return {string} token
 */
let decodeToken = (token) => {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, secret);

            if (payload.exp <= moment().unix()) {
                reject({ status: 401, message: messages.m2 });
            }

            resolve(payload.sub);
        } catch (err) {
            reject({ status: 500, message: messages.m3 });
        }
    });

    return decoded;
}

module.exports = { createToken, decodeToken };

// Contact GitHub API Training Shop Blog About
// © 2017 GitHub, Inc. Terms Privacy Security Status Help