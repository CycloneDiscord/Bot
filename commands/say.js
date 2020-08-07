const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have the permisiion to use the say command!`);

    let Text = args.join(" ");

    message.delete().catch();

    message.channel.send(Text);

}

module.exports.help = {

    name: "say"

}