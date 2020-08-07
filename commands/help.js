const Discord = require("discord.js")
const prefixModel = require("../models/prefix")
const PageMenu = require("@quantiom/pagemenu")

var used = false

module.exports.run = async (bot, message, args) => {
    
    

        let prefix = '!';
        
        let pageMenu = new PageMenu(message, [
        
            {
                
                title: "**Cyclone Commands**",
                description: "Moderation commands for staff",
                fields: [
                    
                    {
                        
                        name: ":punch: Moderation Commands :punch:",
                        value: `\`${prefix}kick [@mention] <reason>\` - kicks a member from the server \n \`${prefix}ban [@mention] <reason>\` - bans a member from the server \n \`${prefix}tempmute [@mention] [duration] <reason>\` - temporarily mutes a member in the server \n \`${prefix}tempban [@user] [duration]\` - bans a member temproraryly, after which the user can join the server \n \`${prefix}mute [@mention] <reason>\` - mutes a member until a staff uses the \`${prefix}unmute\` command \n \`${prefix}unmute [@mention] <reason>\` - unmutes a muted user \n \`${prefix}addrole [@mention] [role]\` - adds a role to a member \n \`${prefix}removerole [@mention] [role]\` - removes a role from a member \n \`${prefix}purge [number of messages]\` - clears a number of messages`,
                        
                        inline: true
                        
                    }
                    
                ],
                
                color: "#dd5100"
                
            },
            
            {
                
                title: "**Cyclone Commands**",
                description: "Some commands for utility",
                fields: [
                    
                    {
                        
                        name: ":wrench: Utilities :wrench:",
                        value: `\`${prefix}announce [text]\` - tags everyone and makes an announcement \n \`${prefix}say [text]\` - say messages using the bot  \n \`${prefix}dm [@user] [text]\` - sends the user a dm!`
                        
                    }    
                    
                ],
                
                color: "#7a2271"
                
            },
            
            {
                
                title: "**Cyclone Commands**",
                description: "Some commands for members",
                fields: [
                    
                    {
                        
                        name: ":grin: User Commands :grin:",
                        value: `\`${prefix}report [@mention] [reason]\` - reports a member \n \`${prefix}help\` - shows you this menu`
                        
                    }    
                    
                ],
                
                color: "#0185c6"
                
            },
            
            {
                
                title: "**Cyclone Commands**",
                description: "Commands for making a poll",
                fields: [
                    
                    {
                        
                        name: ":thumbsup: Poll Commands :thumbsdown:",
                        value: `\`${prefix}rpoll [channel] [text]\` - makes a reaction poll.`
                        
                    }    
                    
                ],
                
                color: "#42cbf4"
                
            },
          
            
            
            {
                
                title: "**Cyclone Commands**",
                description: "Commands for fun",
                fields: [
                    
                    {
                        
                        name: ":rofl: Fun Commands :rofl:",
                        value: `\`${prefix}dog\` - shows you dog pictures that make you go OwO \n \`${prefix}cat\` - shows you cat pictures that make you go UwU`
                        
                    }    
                    
                ],
                
                color: "#32843a"
                
            },
            
            {
                
                title: "**Cyclone Commands**",
                description: "Commands that fit in no other category",
                fields: [
                    
                    {
                        
                        name: ":large_blue_diamond: Miscellaneous Commands :large_blue_diamond:",
                        value: `\`${prefix}setprefix [prefix]\` - changes the prefix of the bot \n \`${prefix}invite\` - gives you the bot invite link! \n \`${prefix}serverinfo\` - shows you information about the server \n \`${prefix}botinfo\` - shows you information about the bot \n \`${prefix}ping\` - a way to pong!`
                        
                    }    
                    
                ],
                
                color: "#790191"
                
            },
            
            {
                
                title: "**Cyclone Commands**",
                description: "Features of the bot",
                fields: [
                    
                    {
                        
                        name: ":clap: Features :clap:",
                        value: `\`Spam Protection\` - Members can't spam the bot's commands \n \`Toxic Protection\` - The bot automatically detects toxic behaviour from the server members and delets the message!`
                        
                    }    
                    
                ],
                
                color: "#ffffff"
                
            },
            
            {
                
                title: "**Cyclone Commands**",
                description: "Commands to give feedback to the developer",
                fields: [
                    
                    {
                        
                        name: ":diamond_shape_with_a_dot_inside: Feedback :diamond_shape_with_a_dot_inside:",
                        value: `\`${prefix}suggest [suggestion]\` - make a suggestion, and it will directly go to the developer \n \`${prefix}bug [bug]\` - report a bug to the developer`
                        
                    }    
                    
                ],
                
                color: "#0cfff2"
                
            },
            
        ], {
            
            duration: 1000000,
            expireFunction: function(msg) { 
                
                message.delete();
                msg.delete(); 
                
                
            }
            
        })
        
        pageMenu.run();
        
        message.delete();
       
	   
}

module.exports.help = {

    name: "help"

}