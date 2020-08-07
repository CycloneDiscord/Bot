const Discord  = require("discord.js");

var used = false;

module.exports.run = async (bot, message, args) => {
    
    if(used === false) {
                
        let channel = bot.channels.get("592354772976140312");

        
        let Suggestion = args.join(" ");

        if(!Suggestion) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, please specify the suggestion!`)

        let suggestionEmbed = new Discord.RichEmbed()
        .setAuthor("Suggestion")
        .setColor("#377def")
        .setDescription(`**Suggestion By:** ${message.author.tag} \n **Suggestion From:** ${message.guild.name} \n \n **Suggestion:** ${Suggestion}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter("Cyclone Bot")
        .setTimestamp();

        channel.send(suggestionEmbed);

        message.channel.send(`:white_check_mark: ${message.author}, thanks for the suggestion :smile:`)
        
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            
            used = true;

            setTimeout(() => {
                
                used = false;
                
            }, 1000 * 60 * 60)
            
        }

    }
    
    else {
        
        message.channel.send(`:negative_squared_cross_mark: ${message.author}, you have to wait 1 hour before running this command again!`);
        
    }


}

module.exports.help = {

    name: "suggest"

}