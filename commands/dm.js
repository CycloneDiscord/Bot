const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {


    
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`❎ ${message.author}, you don't have the permission to use the direct message command!`);

    let user = message.mentions.users.first();
    let [i, ...txt] = args;
    txt = txt.join(' ');
    let sender = message.author;

    if(!user) return message.channel.send(`❎ ${message.author}, specify the user!`);
    let dmembed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle(`Dear ${user.username}` + ` ${sender.username} sent you this message:`)
    .setDescription(txt)
    .setColor("#0dc692")
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();    

    user.send(dmembed);
    
    message.delete();
    
}

  
module.exports.help = {
    name: "dm"
}