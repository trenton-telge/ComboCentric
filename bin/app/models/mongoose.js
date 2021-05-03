const dbConfig = require("../config/credentials");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./user.model.js")(mongoose);

module.exports = db;