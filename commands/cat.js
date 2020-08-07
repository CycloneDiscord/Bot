const Discord = require("discord.js");
const superagent = require("superagent");

var used = false;

module.exports.run = async (bot, message, args) => {

    if(used === false) {
    
    let {body} = await superagent
    .get(`http://aws.random.cat//meow`);

    let catembed = new Discord.RichEmbed()
    .setColor("#845632")
    .setTitle("A cute cat for you!")
    .setImage(body.file)
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(catembed);
    
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
    name: "cat"
}