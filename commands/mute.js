const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have permissions to use the mute command`);

    

    let muser = message.mentions.members.first();

    if(!muser) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, can't find the user, ${muser}`);

    if(muser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:negative_squared_cross_mark: ${message.author}, can't mute the user, ${muser}`);
    

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

    if(muser.roles.has(muterole.id)) return message.channel.send(`${message.author}, ${muser} is already muted!`)

    args.shift();

    let reason = args.join(" ");

    if(!reason) reason = "For no reason";

    let membed = new Discord.RichEmbed()
    .setTitle("Mute")
    .setColor("#c9792e")
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setThumbnail(muser.user.displayAvatarURL)
    .addField("Muted User", `${muser}`)
    .addField("Muted By", `${message.author}`)
    .addField("Reason", `${reason}`)
    .addField("Muted In", `${message.channel}`)
    .addField("Muted At", `${message.createdAt}`)
    .setFooter("Cyclone bot", bot.user.displayAvatarURL)
    .setTimestamp();
    let mchannel = message.guild.channels.find(c => c.name === "incidents")
        if(!mchannel) {
            
            
           
            message.guild.createChannel('incidents', "text", [{ id: message.guild.id, deny: ['SEND_MESSAGES'], }])
            .then(c => c.send(membed))
        } else {

        mchannel.send(membed);
       
        }

    await(muser.addRole(muterole.id));

    muser.send("")

    message.channel.send(`${message.author}, successfully muted ${muser}`)

}

module.exports.help = {
    name: "mute"
}