const Discord  = require("discord.js");

module.exports.run = async (bot, message, args) => {

    

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have permission to use the add role command!`)

    let rmember = message.guild.member(message.mentions.members.first());

    if(!rmember) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, can't find the user`)

    args.shift();
    let role = args.join(" ");

    if(!role) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you didn't specify a role`);

    let grole = message.guild.roles.find(m => m.name === role)

    if(!grole) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, the role dosen't exist!`);

    if(rmember.roles.has(grole.id)) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, ${rmember} already has the role **${grole.name}**!`);
    await(rmember.addRole(grole.id))

    try {

        await rmember.send(`**${message.guild}:** You have been given the role ${grole.name}!`)
        
    } catch (error) {

        message.channel.send(`${rmember}, you have been given the role ${grole.name}!`)
        
    }

    message.channel.send(`:white_check_mark: Successfully added the role **${grole.name}** to ${rmember}`);

    let rembed = new Discord.RichEmbed()
    .setTitle("Role Given")
    .setColor("#3ece0a")
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setThumbnail(rmember.user.displayAvatarURL)
    .addField("Role", `${grole.name}`)
    .addField("Role Given To", `${rmember}`)
    .addField("Role Given By", `${message.author}`)
    .addField("Role Given At", `${message.createdAt}`)
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

    name: "addrole"

}