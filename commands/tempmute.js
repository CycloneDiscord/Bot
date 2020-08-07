const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have permissions to use the tempmute command`);

    let tempuser = message.mentions.members.first();


    if(!tempuser) return message.channel.send(`${message.author}, can't find the user, ${tempuser}`);

    if(tempuser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, cant tempmute the user, ${tempuser}`);
    

    let muterole = message.guild.roles.find(m => m.name === "muted")

    if(!muterole) {

        try {

            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions:[]
            })

            message.guild.channels.forEach(async (channel, id) => {

                await channel.overwritePermissions(muterole, {

                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false

                });

            });
       
        } catch (e) {

            console.log(e.stack);
            
        }

    }

    if(tempuser.roles.has(muterole.id)) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, ${tempuser} is already muted!`)

    let mutetime = args[1];
    if(!mutetime) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you didn't specify the time!`);

    let reason = args[2];

    if(!reason) reason = "For no reason";

    let tempembed = new Discord.RichEmbed()
    .setTitle("Tempmute")
    .setColor("#c9792e")
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setThumbnail(tempuser.user.displayAvatarURL)
    .addField("Tempmuted User", `${tempuser}`)
    .addField("Tempmuted By", `${message.author}`)
    .addField("Reason", `${reason}`)
    .addField("Duration", `${mutetime}`)
    .addField("Tempmuted In", `${message.channel}`)
    .addField("Tempmuted At", `${message.createdAt}`)
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();
    let tempchannel = message.guild.channels.find(c => c.name === "incidents")
        if(!tempchannel) {
            
            
           
            message.guild.createChannel('incidents', "text", [{ id: message.guild.id, deny: ['SEND_MESSAGES'], }])
            .then(c => c.send(tempembed))
        } else {

        tempchannel.send(tempembed);
       
        }

    await(tempuser.addRole(muterole.id));
   
message.channel.send(`${tempuser} has been muted for ${ms(ms(mutetime))}`)

    setTimeout(function(){

        tempuser.removeRole(muterole.id)

        let timeoutxD = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .setColor("#c9792e")
        .setTitle("Tempmute duration completed")
        .setThumbnail(tempuser.user.displayAvatarURL)
        .addField("Tempmuted User", `${tempuser}`)
        .addField("Tempmuted By", `${message.author}`)
        .addField("Duration", `${mutetime}`)
        .addField("Tempmuted In", `${message.channel}`)
        .addField("Tempmuted At", `${message.createdAt}`)
        .addField("Reason", `${reason}`)
        .setFooter("Cyclone bot", bot.user.displayAvatarURL)
        .setTimestamp()

        tempchannel.send(timeoutxD);
        
    }, ms(mutetime));

}

module.exports.help = {

    name: "tempmute"

}