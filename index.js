//---------------------------------------------------------------------------------------------------------------------------------------

const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", () => {
	console.log("I'm Online, how may I be of service?");
});

const fs = require("fs");
const Mongoose = require("mongoose")
const Perspective = require("perspective-api-client");
const prefixModel = require("./models/prefix")

const apikeys = require("./apikeys.json");
const botconfig = require("./botconfig.json")
const dbconfig = require("./database.json")

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if(jsfile.length <= 0) {
        

        console.log("Couldn't find commands!");
        return;

    }

    jsfile.forEach((f, i) => {

        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`)

        bot.commands.set(props.help.name, props);

    });

});

bot.on("ready", async() => {
        
    bot.user.setActivity(`${bot.guilds.size} servers!`, {"type": "WATCHING"});
  
    
});



bot.on("message", async message => {
  
  if(message.author.bot) return;
    
    
            let text = message.content;
            
            if(!text) return;
  
})

bot.on("message", async message => {
        
        let prefix = '!';
        
        
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
    
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(prefix.length);
    
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(!message.content.startsWith(prefix)) return;
        if(commandfile) commandfile.run(bot, message, args)
    
    
        
    
})


bot.login(process.env.TOKEN);