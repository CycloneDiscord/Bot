const Discord = require("discord.js");

var used = false;

module.exports.run = async (bot, message, args) => {
    
    if(used === false) {

    let bicon = bot.user.displayAvatarURL;

    let botembed = new Discord.RichEmbed()
    .setTitle("Cyclone Information")
    .setColor("#0060fc")
    .setThumbnail(bicon)
    .addField("Version", "0.7")
    .addField("Bot name ", "<@576666537554083861>") // This will tag the bot
    .addField("Creator ", "<@547301439823675394>") //Can i tag you in the bot?
    .addField("Created on ", bot.user.createdAt)
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();    

    message.channel.send(botembed);
    
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            
            used = true;

            setTimeout(() => {
                
                used = false;
                
            }, 1000 * 5)
            
        }

    }
    
    else {
        
        message.channel.send(`:negative_squared_cross_mark: ${message.author}, you have to wait 5 seconds before running this command again!`);
        
    }

}

module.exports.help = {

    name: "botinfo"

}