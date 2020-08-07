const Discord = require("discord.js");
const { inspect } = require("util");
const Owner = "637178459734409216";

module.exports.run = async (bot, message, args) => {

    if(message.author.id === Owner) {

        try {

            let toEval = args.join(" ");
            let evaluated = inspect(eval(toEval, {depth: 0} ));

            if(toEval) {

                let hrStart = process.hrtime();
                let hrDiff;
                hrDiff = process.hrtime(hrStart)
                return message.channel.send(`*Evaluated in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ``} ${hrDiff[1] / 1000000}ms.*\`\`\`js\n${evaluated}\n\`\`\``, { maxLength: 1900 });

            }
            else {

                return message.channel.send(`:negative_squared_cross_mark: ${message.author}, please specify code to evaluate!`);

            }
            
        } catch (e) {

            message.channel.send(`:negative_squared_cross_mark: ${message.author}, Error while evaluating \`${e.message}\``);
            
        }

    }   else {

        message.channel.send(`:negative_squared_cross_mark: ${message.author}, you don't have the permission to use this command!`)

    }

}

module.exports.help = {

    name: "eval"

}