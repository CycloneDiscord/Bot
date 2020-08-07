const Discord = require("discord.js");
const prefixModel = require("../models/prefix")


module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don\`t have the permission to use the prefix command!`);

    let newPrefix = args[0];

    if (!newPrefix) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, please specify the new prefix`)

    let newprefixmodel = new prefixModel;

    prefixModel.findOneAndUpdate({

        guildID: message.guild.id

    }, {

        prefix: newPrefix

    }, {

        useFindAndModify: false,
        new: false

    }, (err, doc) => {

        if(err => console.error(err))

        doc.updateOne().catch(err => console.error(err))

        if(!err) {

            let newPrefixEmbed = new Discord.RichEmbed()
            .setAuthor("Prefix set!")
            .setColor("#377def")
            .setDescription("The new prefix is " + `\`${newPrefix}\``)
            .setFooter("Cyclone Bot", bot.user.displayAvatarURL)
            .setTimestamp();

            message.channel.send(newPrefixEmbed);

        }

    })








}

module.exports.help = {

    name: "prefix"

}