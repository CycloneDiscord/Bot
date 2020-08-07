const Discord = require("discord.js");

var used = false;

module.exports.run = async(bot, message, args) => {

    
    if(used === false) {

    let iembed = new Discord.RichEmbed()
    .setTitle("Invite Link")
    .setColor("#0060fc")
    .addField("https://discordapp.com/api/oauth2/authorize?client_id=576666537554083861&permissions=8&scope=bot", "Hope you invite me!")
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(iembed);
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            
            used = true;

            setTimeout(() => {
                
                used = false;
                
            }, 1000 * 15)
            
        }

    }
    
    else {
        
        message.channel.send(`:negative_squared_cross_mark: ${message.author}, you have to wait 15 seconds before running this command again!`);
        
    }
    
}

module.exports.help = {
    name: "invite"
}