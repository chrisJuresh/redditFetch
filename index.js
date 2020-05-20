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
        .setFooter("Contact Christian#7220 for any issues \n[menu requested by " + message.author.tag + "]")
        .setDescription("*if **random** is not specified, then the top \n post of the category will be taken* \n\n `<r` subreddit - ***random*** \n\n `<rtt` subreddit - *top [of all time]* \n\n `<rh` subreddit - *hot* \n\n-------------------------------------------------\n\n `<rr` subreddit - *rising* \n\n `<rt` subreddit - *top [of today]* \n\n `<rn` subreddit - *new* \n\n `<rd` subreddit - ***random** [today] \n use this when <r is exhausted*\n\n `<rp` subreddit - *random [for sfw channels]* \n\n `<h` - *help* **or** `<hh` - *detailed*\n \u200B")
        message.channel.send({embed: sEmbed});
    }  

    if(cmd == `${prefix}hh`){
        message.channel.send("```Commands detailed\n    this prompt was made to be viewed in fullscreen\n\n<r - pulls a random post from a list of the top 100 posts of all time\n\n<rtt - pulls the top post of all time\n\n<rh - pulls the top post of the hot category\n\n<rr - pulls the top post of the rising category\n\n<rt - pulls the top post of today\n\n<rn - pulls a random post from a list of the top 100 posts of today\n      this command is in case all or most <r posts have already been shown\n\n<rp - pulls a random image using random-puppy\n      this command was added to work on sfw channels\n\n<h - pulls up a basic help post\n\n<hh - pulls up this detailed post to show the complete function and reasons for each command\n \u200B```");
    }  

    if(cmd == `${prefix}r`){
        if(message.channel.nsfw){
            request("https://www.reddit.com/r/" + args + "/top/.json?t=all&limit=100", function(error, response, body){
                let msg = JSON.parse(body);
                    try{
                        let imgurl = msg["data"]["children"][Math.floor((Math.random() * 100) + 0)]["data"]["url"];
                        return message.channel.send(imgurl + "\n*requested by " + message.author.tag + "*");
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
                        return message.channel.send(imgurl + "\n*requested by " + message.author.tag + "*");
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
                        return message.channel.send(imgurl + "\n*requested by " + message.author.tag + "*");
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
                        return message.channel.send(imgurl + "\n*requested by " + message.author.tag + "*");
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
                        return message.channel.send(imgurl + "\n*requested by " + message.author.tag + "*");
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
                        return message.channel.send(imgurl + "\n*requested by " + message.author.tag + "*");
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
                        return message.channel.send(imgurl + "\n*requested by " + message.author.tag + "*");
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
                        return message.channel.send(imgurl + "\n*requested by " + message.author.tag + "*");
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
            message.channel.send(url + "\n*requested by " + message.author.tag + "*");
            });
    } 
    catch{
        return message.channel.send("Error getting data from **" + args + "**");
    };
    }
});

bot.login(config.token);

