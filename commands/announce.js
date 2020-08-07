const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have the permission to use the announce command!`);

    let Text = args.join(" ");
    let ping = message.mentions.roles.first();

    if(!Text) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you didn't spacify the text to be announced!`);

    message.delete().catch();

    let embed = new Discord.RichEmbed()
    .setAuthor(`Announcement by ${message.author.username}`, message.author.displayAvatarURL)
    .setDescription(Text)
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed)
    message.channel.send(ping).then(msg => msg.delete(2000));

}

module.exports.help = {

    name: "announce"
}