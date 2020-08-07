const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let kuser = message.guild.member(message.mentions.users.first());

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have permissions to use the kick command`);
        let nokuserembeded = new Discord.RichEmbed()
        .setColor("#0060fc")
        .addField("Comand usage", "!kick [@mention] <reason>");

        if(!kuser) return message.channel.send(nokuserembeded);      
  if(kuser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, can't kick ${kuser}`);



        args.shift();
        let kreason = args.join(" ");

        if(!kreason) kreason = "For no reason";

        let kickembed = new Discord.RichEmbed()
        .setDescription("**kick**")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setThumbnail(kuser.user.displayAvatarURL)
        .setColor("#ff4102")
        .addField("Kicked user", `${kuser} with ID: ${kuser.id}`)
        .addField("Kicked by", `${message.author} with ID: ${message.author.id}`)
        .addField("Reason", kreason)
        .addField("Kicked in", `${message.channel}`)
        .addField("Time", message.createdAt)
        .setFooter("Cyclone bot", bot.user.displayAvatarURL)
        .setTimestamp();
        let kickchannel = message.guild.channels.find(c => c.name === "incidents")
        if(!kickchannel) {
            message.channel.send("Couldn't find any incidents channel!").then ( msg => {
                msg.edit("Creating one for you!")
                msg.edit(`:white_check_mark: Successfully kicked ${kuser}!`);
            })
           
            message.guild.createChannel('incidents', "text", [{ id: message.guild.id, deny: ['SEND_MESSAGES'], }])
            .then(c => c.send(kickembed))
        } else {

            kickchannel.send(kickembed);
            message.channel.send(`:white_check_mark: Successfully kicked ${kuser} from the server!`)

        }

        kuser.send(`You have been kicked from **${message.guild.name}** by **${message.author}** because of the reason **${kreason}**`);

        

        message.guild.member(kuser).kick(kreason);

}

module.exports.help = {

    name: "kick"

}