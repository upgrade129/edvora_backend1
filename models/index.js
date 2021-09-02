const dbconfig = require("../config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db ={};
db.mongoose = mongoose;
db.url = dbconfig.url;
db.users = require("./user.model")(mongoose);
db.session = require("./session.model")(mongoose);

module.exports = db;