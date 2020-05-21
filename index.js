const config = require("./botconfig.json");
const Discord = require("discord.js");
const request = require("request");
const rp = require('random-puppy');

const bot = new Discord.Client();

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online`);
    
    bot.user.setActivity("with the power button", {type: "PLAYING"});
    var delayInMilliseconds = 5000; 
    setTimeout(function() {
        bot.user.setActivity("for <h for help", {type: "WATCHING"});
    }, delayInMilliseconds);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray[1];
    
    if(cmd == `${prefix}h`){
        let sEmbed = new Discord.RichEmbed()
        .setColor(16711422)
        .setTitle("Commands")
        .setFooter(
            "Contact Christian#7220 for any issues \n[menu requested by " + message.author.tag + "]"
            )
        .addField(
            "where **Random post** is not specified, the \ncurrent top post of the category is taken\n\u200b",
            " `<r   ? :` **Random post** *[top 100 of all time]* \n `<rd  ? :` **Random post** *[top 100 of today]* \n `<rm    :` **Random post** *[random subreddit]* \n `<rtt ? :` Top *[of all time]* \n `<rt  ? :` Top *[of today]*  \n `<rr  ? :` Rising \n`<rh  ? :` Hot \n `<rn  ? :` New \n\n `<h     :` Help \n `<hh    :` Detailed help \n\n ||`<rp  ? :` **Random post** *[for sfw channels]*|| ",        
            false)
        message.channel.send({embed: sEmbed});
    }  

    if(cmd == `${prefix}hh`){
        message.channel.send(
            "```diff\n- COMMANDS DETAILED \n- this prompt was made to be viewed in fullscreen \n \n  <r \n+ pulls a random post from a list of the top 100 posts of all time \n \n  <rd \n+ pulls a random post from a list of the top 100 posts of today \n+ this command is in case all or most <r posts have already been shown \n \n  <rm \n+ pulls a random post from the top 100 posts of the 'hot' category from a multireddit \n \n  <rtt \n+ pulls the top post of all time \n \n  <rt \n+ pulls the top post of today \n \n  <rr \n+ pulls the top post of the 'rising' category \n \n  <rh \n+ pulls the top post of the 'hot' category \n \n  <rn \n+ pulls the top post of the 'new' category \n \n  <rp \n+ pulls a random image using random-puppy \n+ this command was added to work on sfw channels \n \n  <h \n+ pulls up a basic help post \n \n  <hh \n+ pulls up this detailed post to show the complete function and reasons for each command\" \n \n[menu requested by " + message.author.tag + "]\u200B```"
        );
    }  

    if(cmd == `${prefix}r`){
        if(message.channel.nsfw){
            request("https://www.reddit.com/r/" + args + "/top/.json?t=all&limit=100", function(error, response, body){
                let msg = JSON.parse(body);
                    try{
                        let imgurl = msg["data"]["children"][Math.floor((Math.random() * 100) + 0)]["data"]["url"];
                        return message.channel.send(imgurl + "\nr ***" + args + "** requested by **" + message.author.tag + "***");
                    }
                    catch{
                        return message.channel.send("Error getting data from the subreddit - **" + args + "**");
                    }
                });
        } else {
            return message.channel.send("Channel is not set nsfw");
        }
    }

    if(cmd == `${prefix}rd`){
        if(message.channel.nsfw){
            request("https://www.reddit.com/r/" + args + "/top/.json?t=day&limit=100", function(error, response, body){
                let msg = JSON.parse(body);
                    try{
                        let imgurl = msg["data"]["children"][Math.floor((Math.random() * 100) + 0)]["data"]["url"];
                        return message.channel.send(imgurl + "\nrd ***" + args + "** requested by **" + message.author.tag + "***");
                    }
                    catch{
                        return message.channel.send("Error getting data from the subreddit - **" + args + "**");
                    }
                });
        } else {
            return message.channel.send("Channel is not set nsfw");
        }
    }

    if(cmd == `${prefix}rtt`){
        if(message.channel.nsfw){
            request("https://www.reddit.com/r/" + args + "/top/.json?t=all&limit=1", function(error, response, body){
                let msg = JSON.parse(body);
                    try{
                        let imgurl = msg["data"]["children"]["0"]["data"]["url"];
                        return message.channel.send(imgurl + "\nrtt ***" + args + "** requested by **" + message.author.tag + "***");
                    }
                    catch{
                        return message.channel.send("Error getting data from the subreddit - **" + args + "**");
                    }
                });
        } else {
            return message.channel.send("Channel is not set nsfw");
        }
    }

    if(cmd == `${prefix}rm`){
        if(message.channel.nsfw){
            request("https://www.reddit.com/user/chaturbot/m/Top100female/.json?limit=100", function(error, response, body){
                let msg = JSON.parse(body);
                    try{
                        let imgurl = msg["data"]["children"][Math.floor((Math.random() * 100) + 0)]["data"]["url"];
                        return message.channel.send(imgurl + "\nrm ***[a random post from a random subreddit]** requested by **" + message.author.tag + "***\n");
                    }
                    catch{
                        return message.channel.send("Error getting data from the multireddit");
                    }
                });
        } else {
            return message.channel.send("Channel is not set nsfw");
        }
    }

    if(cmd == `${prefix}rh`){
        if(message.channel.nsfw){
            request("https://www.reddit.com/r/" + args + "/hot/.json?limit=1" + args, function(error, response, body){
                let msg = JSON.parse(body);
                    try{
                        let imgurl = msg["data"]["children"]["0"]["data"]["url"];
                        return message.channel.send(imgurl + "\nrh ***" + args + "** requested by **" + message.author.tag + "***");
                    }
                    catch{
                        return message.channel.send("Error getting data from the subreddit - **" + args + "**");
                    }
                });
        } else {
            return message.channel.send("Channel is not set nsfw");
        }
    }  
    
    if(cmd == `${prefix}rt`){
        if(message.channel.nsfw){
            request("https://www.reddit.com/r/" + args + "/top/.json?limit=1" + args, function(error, response, body){
                let msg = JSON.parse(body);
                    try{
                        let imgurl = msg["data"]["children"]["0"]["data"]["url"];
                        return message.channel.send(imgurl + "\nrt ***" + args + "** requested by **" + message.author.tag + "***");
                    }
                    catch{
                        return message.channel.send("Error getting data from the subreddit - **" + args + "**");
                    }
                });
        } else {
            return message.channel.send("Channel is not set nsfw");
        }
    }

    if(cmd == `${prefix}rr`){
        if(message.channel.nsfw){
            request("https://www.reddit.com/r/" + args + "/rising/.json?limit=1" + args, function(error, response, body){
                let msg = JSON.parse(body);
                    try{
                        let imgurl = msg["data"]["children"]["0"]["data"]["url"];
                        return message.channel.send(imgurl + "\nrr ***" + args + "** requested by **" + message.author.tag + "***");
                    }
                    catch{
                        return message.channel.send("Error getting data from the subreddit - **" + args + "**");
                    }
                });
        } else {
            return message.channel.send("Channel is not set nsfw");
        }
    }
    
    if(cmd == `${prefix}rn`){
        if(message.channel.nsfw){
            request("https://www.reddit.com/r/" + args + "/new/.json?limit=1" + args, function(error, response, body){
                let msg = JSON.parse(body);
                    try{
                        let imgurl = msg["data"]["children"]["0"]["data"]["url"];
                        return message.channel.send(imgurl + "\nrn ***" + args + "** requested by **" + message.author.tag + "***");
                    }
                    catch{
                        return message.channel.send("Error getting data from the subreddit - **" + args + "**");
                    }
                });
        } else {
            return message.channel.send("Channel is not set nsfw");
        }
    }
    
    if(cmd == `${prefix}rp`){
    try {
        rp(args).then(url=> {                
            message.channel.send(url + "\nrp ***" + args + "** requested by **" + message.author.tag + "***");
            });
    } 
    catch{
        return message.channel.send("Error getting data from **" + args + "**");
    };
    }
});

bot.login(config.token);
