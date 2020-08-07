const mongoose = require("mongoose")

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const reportSchema = Schema({

    
    username: String,
    reportedBy: String,
    time: String

});

module.exports = mongoose.model("Report", reportSchema);