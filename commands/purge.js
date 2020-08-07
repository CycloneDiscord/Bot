const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have permission to use the purge command!`);
    if(!args[0]) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, please specify the number of messages to purge!`);

    let noofmsg = parseInt(args[0], 10)

    message.channel.bulkDelete(noofmsg + 1).then(() => {

        message.channel.send(`:white_check_mark: ${message.author}, cleared ${args[0]} messages!`).then(msg => msg.delete(5000));

    })

}

module.exports.help = {

    name: "purge"

}