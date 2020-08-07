const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    

    let buser = message.guild.member(message.mentions.users.first());

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have permissions to use the ban command`);
    let nobuserembeded = new Discord.RichEmbed()
    .setColor("#0060fc")
    .addField("Comand usage", "!ban [@mention] <reason>");

    if(!buser) return message.channel.send(nobuserembeded);      
if(buser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, can't ban ${buser}`);

        args.shift();
        let breason = args.join(" ");

        if(!breason) breason = "For no reason";


        let banembed = new Discord.RichEmbed()
        .setDescription("**Ban**")
        .setColor("#c10c00")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setThumbnail(buser.user.displayAvatarURL)
        .addField("Banned user", `${buser} with ID: ${buser.id}`)
        .addField("Banned by", `${message.author} with ID: ${message.author.id}`)
        .addField("Reason", breason)
        .addField("Banned in", `${message.channel}`)
        .addField("Time", message.createdAt)
        .setFooter("Cyclone bot", bot.user.displayAvatarURL)
        .setTimestamp();
        let banchannel = message.guild.channels.find(c => c.name === "incidents")
        if(!banchannel) {
            message.channel.send("Couldn't find any incidents channel!").then ( msg => {
                msg.edit("Creating one for you!")
                msg.edit(`:white_check_mark: Successfully banned ${buser} from the server!`);
            })
           
            message.guild.createChannel('incidents', "text", [{ id: message.guild.id, deny: ['SEND_MESSAGES'], }])
            .then(c => c.send(banembed))
        } else {

        banchannel.send(banembed);
        message.channel.send(`:white_check_mark: Successfully banned ${buser} from the server!`);

        }

        buser.send(`You have been banned from **${message.guild.name}** by **${message.author}** because of the reason **${breason}**`);


        

        message.guild.member(buser).ban(breason);

    

}

module.exports.help = {

    name: "ban"

}