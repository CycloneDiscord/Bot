const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have permissions to use the unmute command`);

    

    let uuser = message.mentions.members.first();

    

    if(!uuser) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, can't find the user, ${uuser}`);
    

    let muterole = message.guild.roles.find(m => m.name === "muted")

    if(!muterole) {

        message.channel.send(`:negative_squared_cross_mark: Can't use the unmute command if no one's been muted before`)

    }

    if(!uuser.roles.has(muterole.id)) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, ${uuser} is not muted, so unable to unmute!`)

    args.shift();

    let reason = args.join(" ");

    if(!reason) reason = "For no reason";

    let membed = new Discord.RichEmbed()
    .setTitle("Unmute")
    .setColor("#c9792e")
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setThumbnail(uuser.user.displayAvatarURL)
    .addField("Unmuted User", `${uuser}`)
    .addField("Unmuted By", `${message.author}`)
    .addField("Reason", `${reason}`)
    .addField("Unmuted In", `${message.channel}`)
    .addField("Unmuted At", `${message.createdAt}`)
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();

    let mchannel = message.guild.channels.find(c => c.name === "incidents")
        if(!mchannel) {
            
            
           
            message.guild.createChannel('incidents', "text", [{ id: message.guild.id, deny: ['SEND_MESSAGES'], }])
            .then(c => c.send(membed))
        } else {

        mchannel.send(membed);
       
        }

    await(uuser.removeRole(muterole.id));

    message.channel.send(`${message.author}, successfully unmuted ${uuser}`)



}

module.exports.help = {

    name: "unmute"

}