const Discord = require("discord.js");
const ms = require("ms")

module.exports.run = async (bot, message, args) => {

    // Command Usage: !tempban [@user] [duration] <tbreason>

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.author.send(`:negative_squared_cross_mark: ${message.author}, you don't have the permission to use the tempban command!`);

    let tuser = message.mentions.members.first();
    
    if(!tuser) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, please mention the user to ban!`);

    if(tuser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't can't tempban ${tuser}!`);

    let duration = args[1];

    if(!duration) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, please specify the duration!`)

    args.shift();
    let tbreason = args.join(" ");

    if(!tbreason) tbreason = "For no reason";

    let banembed = new Discord.RichEmbed()
        .setDescription("**Temban**")
        .setColor("#c10c00")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setThumbnail(tuser.user.displayAvatarURL)
        .addField("Tempbanned user", `${tuser} with ID: ${tuser.id}`)
        .addField("Tempbanned by", `${message.author} with ID: ${message.author.id}`)
        .addField("Duration", duration)
        .addField("Reason", tbreason)
        .addField("Tmpbanned in", `${message.channel}`)
        .addField("Time", message.createdAt)
        .setFooter("Cyclone bot", bot.user.displayAvatarURL)
        .setTimestamp();
        let banchannel = message.guild.channels.find(c => c.name === "incidents")
        if(!banchannel) {
            message.channel.send("Couldn't find any incidents channel!").then ( msg => {
                msg.edit("Creating one for you!")
                msg.edit(`:white_check_mark: Successfully tempbanned ${tuser} from the server for ${duration}!`);
            })
           
            message.guild.createChannel('incidents', "text", [{ id: message.guild.id, deny: ['SEND_MESSAGES'], }])
            .then(c => c.send(banembed))
        } else {

        banchannel.send(banembed);
        message.channel.send(`:white_check_mark: Successfully tempbanned ${tuser} from the server for ${duration}!`);

        }

        tuser.send(`You have been tempbanned from **${message.guild.name}** by **${message.author}** because of the tbreason **${tbreason}** for **${duration}**`);

        let id = tuser.id;

        message.guild.member(tuser).ban(tbreason);

        setTimeout(function(){

            message.guild.unban(tuser.id);
    
            let timeoutxD = new Discord.RichEmbed()
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setColor("#c9792e")
            .setTitle("Temban duration completed")
            .setThumbnail(tuser.user.displayAvatarURL)
            .addField("Tembaned User", `${tuser}`)
            .addField("Tembaned By", `${message.author}`)
            .addField("Duration", `${duration}`)
            .addField("Tembaned In", `${message.channel}`)
            .addField("Tembaned At", `${message.createdAt}`)
            .addField("Reason", `${tbreason}`)
            .setFooter("Cyclone bot", bot.user.displayAvatarURL)
            .setTimestamp()
    
            banchannel.send(timeoutxD);
            
        },ms(duration));


}

module.exports.help = {

    name: "tempban"

}