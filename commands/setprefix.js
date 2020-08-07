const Discord = require("discord.js");
const prefixModel = require("../models/prefix")


module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don\`t have the permission to use the prefix command!`);

    let newPrefix = args[0];

    if (!newPrefix) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, please specify the new prefix`)

    prefixModel.findOneAndUpdate({
        
        guildID: message.guild.id
        
    }, {
        
        $set: {prefix: newPrefix}
        
        
    }, {
        
        useFindAndModify: false
        
        
    }, (err, doc) => {
        
        if(err) console.error(err);
        doc.save().catch(err => console.error(err));
        
    

    
    
    


            let newPrefixEmbed = new Discord.RichEmbed()
            .setAuthor("Prefix set!")
            .setColor("#377def")
            .setDescription("The new prefix is " + `\`${newPrefix}\``)
            .setFooter("Cyclone Bot", bot.user.displayAvatarURL)
            .setTimestamp();

            message.channel.send(newPrefixEmbed);

        

    


});





}

module.exports.help = {

    name: "setprefix"

}