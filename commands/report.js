const Discord = require("discord.js")

var used = false;

module.exports.run = async (bot, message, args) => {

    if(user === false) {

    let ruser = message.guild.member(message.mentions.users.first());

        if(ruser === message.author) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you can't report yourself!`);

        let noruserembeded = new Discord.RichEmbed()
        .setColor("#0060fc")
        .addField("Comand usage", "!report [@mention] [reason]");

        if(!ruser) return message.channel.send(noruserembeded);

        args.shift();
        let reason = args.join(" ");

        if(!reason) return message.channel.send(":negative_squared_cross_mark: Please specify a reason!");

        let reportembed = new Discord.RichEmbed()
        .setTitle("Reports")
        .setColor("#0060fc")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setThumbnail(ruser.user.displayAvatarURL)
        .addField("Reported user", `${ruser} with ID: ${ruser.id}`)
        .addField("Reason", `${reason}`)
        .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
        .addField("Reported in", `${message.channel}`)
        .addField("Reported at", `${message.createdAt}`)
        .setFooter("Cyclone bot", bot.user.displayAvatarURL)
        .setTimestamp();
        let reportchannel = message.guild.channels.find(c => c.name === "reports")
        if(!reportchannel) {
            message.channel.send("Couldn't find any reports channel!").then ( msg => {
                msg.edit("Creating one for you!")
                msg.edit(`:white_check_mark: Successfully reported ${ruser}!`);
            })
           
            message.guild.createChannel('reports', "text", [{ id: message.guild.id, deny: ['SEND_MESSAGES'], }])
            .then(c => c.send(reportembed))
        } else {

        reportchannel.send(reportembed);
        message.channel.send(`:white_check_mark: Successfully reported ${ruser}!`)
        }

        ruser.send(`You have been reported in **${message.guild.name}** by **${message.author}** because of the reason **${reason}**`);
        
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            
            used = true;

            setTimeout(() => {
                
                used = false;
                
            }, 1000 * 60)
            
        }

    }
    
    else {
        
        message.channel.send(`:negative_squared_cross_mark: ${message.author}, you have to wait 1 minute before running this command again!`);
        
    }

}

module.exports.help = {

    name: "report"

}