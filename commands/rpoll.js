const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have permission to use the reaction poll command!`)

    

    args.shift();
    let t = args.join(" ");

    if(!t) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, please enter poll text`);


    let pchannel = message.mentions.channels.first();

    if(!pchannel) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, specify a channel!`)

    
    let rpembed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle(`Reaction poll`)
    .setDescription(t)
    .setColor("#0060fc")
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();
    let reactpoll = await pchannel.send(rpembed);
    await reactpoll.react(`✅`);
    await reactpoll.react(`❎`);
    await reactpoll.react(`🤷`);

    message.channel.send(`:white_check_mark: ${message.author}, successfully created a poll in ${pchannel}!`)

}

module.exports.help = {

    name: "rpoll"

}
