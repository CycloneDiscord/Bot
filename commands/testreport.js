const Discord = require("discord.js")
const Report = require("../models/report.js")
const Mongoose = require("mongoose")



module.exports.run = async (bot, message, args) => {

     
    let rUser = message.mentions.members.first();

    const report = new Report({

        
        username: rUser.user.username,
        reportedBy: message.author.username,
        time: message.createdAt

    })

    let test = Report.find(rUser);
    let test2 = test.find(reportedBy);

    console.log(test2)

    report.save()
    .catch(err => console.log(err))

    message.reply("ok done");

}

module.exports.help = {

    name: "testreport"

}