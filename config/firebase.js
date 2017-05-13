let constant = require("./constant");
let firebase = require("firebase");
firebase.initializeApp(constant.firebase);
let db = firebase.database(); 

module.exports = { db };