const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

    // Command Usage: !dpoll [duration] [channel] [option1],[option2],[option3].....

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`❎ ${message.author}, you don't have permisson to use the duration poll command!`);
    let dchannel = message.mentions.channels.first();
    if(!dchannel) return message.channel.send(`❎ ${message.author}, please specify the channel where the duration poll will be posted!`)
    
    let [duration, channel, ...options] = args;
    options.join(' ').split(',');

    message.channel.send(options[0]);
    message.channel.send(options[1]);
    message.channel.send(options[2]);
    message.channel.send(options[3]);
    message.channel.send(options[4]);


    // if(!option1) return message.reply(`❎ Please specify 2 options!`);
    // if(!option2) return message.reply(`❎ Please specify 2 options!`);

    

    let option2embed = new Discord.RichEmbed()
     .addField(options[0], "React with 🇦 for this option", false)
     .addField(options[1], "React with 🇧 for this option", false);
    
    let msg = await dchannel.send(option2embed).then(msg1 => msg1.delete(duration));
    await msg.react("🇦");
    await msg.react("🇧");
    

}
module.exports.help = {
    name: "dpoll"
}
