const table = require("./../../config/constant").table;
const mongoose = require("./index");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, select: false },
    name: String,
    lastname: String,
    full_names: String,
    phone: String,
    mobile: String,
    email: String,
    creator: { type: ObjectId, ref: table.users },
    status: { type: ObjectId, ref: table.constants },
    profile: { type: ObjectId, ref: table.profiles },
    created: { type: Date, default: Date.now },
    updated: Date
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model(table.users, userSchema);