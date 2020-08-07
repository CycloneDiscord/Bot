const Discord  = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have permission to use the remove role command!`)

    let rmember = message.guild.member(message.mentions.members.first());

    if(!rmember) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, can't find the user`)

    args.shift();
    let role = args.join(" ");

    if(!role) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you didn't specify a role`);

    let grole = message.guild.roles.find(m => m.name === role)

    if(!grole) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, the role dosen't exist!`);

    if(!rmember.roles.has(grole.id)) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, ${rmember} dosen't have the role **${grole.name}**!`);
    await(rmember.removeRole(grole.id))

    try {

        await rmember.send(`**${message.guild}:** The role ${grole.name} has been taken away from you!`)
        
    } catch (error) {

        message.channel.send(`${rmember}, the role ${grole.name} has been taken away from you!`)
        
    }

    message.channel.send(`:white_check_mark: Successfully removed the role **${grole.name}** from ${rmember}`);

    let rembed = new Discord.RichEmbed()
    .setTitle("Role Taken")
    .setColor("#3ece0a")
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setThumbnail(rmember.user.displayAvatarURL)
    .addField("Role", `${grole.name}`)
    .addField("Role Taken From", `${rmember}`)
    .addField("Role Taken By", `${message.author}`)
    .addField("Role Taken At", `${message.createdAt}`)
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();
    let rchannel = message.guild.channels.find(c => c.name === "incidents")
        if(!rchannel) {
            
            
           
            message.guild.createChannel('incidents', "text", [{ id: message.guild.id, deny: ['SEND_MESSAGES'], }])
            .then(c => c.send(rembed))
        } else {

        rchannel.send(rembed);
       
        }

}

module.exports.help = {

    name: "removerole"

}