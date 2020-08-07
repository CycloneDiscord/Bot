const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    

    let sicon = message.guild.iconURL;

    let serverembeded = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setColor("#0060fc")
    .setThumbnail(sicon)
    .addField("Server name", message.guild.name)
    .addField("Created on", message.guild.createdAt)
    .addField("You joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();
    return message.channel.send(serverembeded);

}

module.exports.help = {

    name: "serverinfo"

}