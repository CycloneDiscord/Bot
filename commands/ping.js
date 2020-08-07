const Discord = require("discord.js")

var used = false

module.exports.run = async (bot, message, args) => {

    if(used === false) {

    message.channel.send("Calculating").then(m => {
        const ping = m.createdTimestamp - message.createdTimestamp;
        let pingembed = new Discord.RichEmbed()
        .setDescription(`:clock2: ${ping} ms \n \n :heartbeat: ${Math.round(bot.ping)} ms`)
        .setColor("#377def")
        .setFooter("Cyclone Bot", bot.user.displayAvatarURL)
        .setTimestamp();
        
        
        m.edit(pingembed)
        
    });
    

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            
            used = true;

            setTimeout(() => {
                
                used = false;
                
            }, 1000 * 60)
            
        }

    }
    
    else {
        
        message.channel.send(`:negative_squared_cross_mark: ${message.author}, you have to wait 1 minute before running this command again!`);
        
    }    

}

module.exports.help = {

    name: "ping"

}