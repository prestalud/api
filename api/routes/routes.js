const constant = require("../../config/constant");
const table = constant.table;

let constantsCtrl = require("../controllers/constants.controller");
let usersCtrl = require("../controllers/users.controller");
let profilesCtrl = require("../controllers/profiles.controller");

const auth = require('../middlewares/auth');

module.exports = function (app, express) {
    let rConstants = express.Router();
    rConstants.route("/").get(auth.isAuth, constantsCtrl.getAll);
    rConstants.route("/:name").get(auth.isAuth, constantsCtrl.getByName);
    rConstants.route("/").post(auth.isAuth, constantsCtrl.create);
    rConstants.route("/:name").put(auth.isAuth, constantsCtrl.update);
    app.use(`/api/${table.constants}`, rConstants);

    let rProfiles = express.Router();
    rProfiles.route("/").get(auth.isAuth, profilesCtrl.getAll);
    rProfiles.route("/:name").get(auth.isAuth, profilesCtrl.getByName);
    rProfiles.route("/").post(auth.isAuth, profilesCtrl.create);
    rProfiles.route("/:name").put(auth.isAuth, profilesCtrl.update);
    app.use(`/api/${table.profiles}`, rProfiles);

    let rUsers = express.Router();
    rUsers.route("/").get(auth.isAuth, usersCtrl.getAll);
    rUsers.route("/:username").get(auth.isAuth, usersCtrl.getByUsername);
    rUsers.route("/").post(auth.isAuth, usersCtrl.create);
    rUsers.route("/signin").post(usersCtrl.signIn);
    rUsers.route("/:username").put(auth.isAuth, usersCtrl.update);
    // rUsers.route("/").post(auth.isAuth, usersCtrl.save);
    app.use(`/api/${table.users}`, rUsers);
}