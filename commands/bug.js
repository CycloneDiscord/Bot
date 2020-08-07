const Discord = require("discord.js");

var used = false;

module.exports.run = async (bot, message, args) => {
    
    if(used === false) {

    let channel = bot.channels.get("592354713132072981")

        
        let Bug = args.join(" ");

        if(!Bug) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, please specify the bug!`)

        let BugEmbed = new Discord.RichEmbed()
        .setAuthor("Bug")
        .setColor("#f40000")
        .setDescription(`**Bug Report By:** ${message.author.tag} \n **Bug Reported From:** ${message.guild.name} \n \n **Bug:** ${Bug}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter("Cyclone Bot")
        .setTimestamp();

        channel.send(BugEmbed);

        message.channel.send(`:white_check_mark: ${message.author}, thanks for reporting the bug :smile:`);
        
        
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

    name: "bug"

}