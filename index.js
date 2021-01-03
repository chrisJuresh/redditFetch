"use strict";

const config = require("./botconfig.json");
const Discord = require("discord.js");
const request = require("request");
const rp = require("random-puppy");

const bot = new Discord.Client();

bot.on("ready", async() => {
	console.log(`${bot.user.username} is online`);

	bot.user.setActivity("with the power button", {type: "PLAYING"});
	var delayInMilliseconds = 5000;
	setTimeout(function () {
		bot.user.setActivity("for <h for help", {type: "WATCHING"});
	}, delayInMilliseconds);
});

bot.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type == "dm") return;

	let prefix = config.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray[1];
	let Nargs = messageArray[2];

	//if(cmd == `${prefix}q`){
	//var role = message.guild.roles.find(role => role.name === "redditFetch");
	//message.member.removeRole(role);
	//message.guild.roles.find(role => role.name === "x").delete();
	//}

	if (cmd == `${prefix}h` || cmd == `${prefix}help`) {
		let sEmbed = new Discord.RichEmbed()
			.setColor(16711422)
			.setTitle("Commands")
			.setFooter(
				"Contact Christian#7220 for any issues" +
				"\n[menu requested by " + message.author.tag + "]"
			)
			.addField(
				"where **Random post** is not specified, the" +
				"\ncurrent top post of the category is taken" +
				"\n\u200b",
				" `<r   ? :` **Random post** *[top 100 of all time]*" +
				"\n `<rtm ? :` **Random post** *[top 100 of this month]*" +
				"\n `<rm    :` **Random post** *[random subreddit]*" +
				"\n `<rtt ? :` Top *[of all time]*" +
				"\n `<rt  ? :` Top *[of today]*" +
				"\n `<rh  ? :` Hot" +
				"\n `<rr  ? :` Rising" +
				"\n `<rn  ? :` New" +
				"\n" +
				"\n `<h     :` Help" +
				"\n `<hh    :` Detailed help " +
				"\n" +
				"\n||`<rp  ? :` **Random post** *[for sfw channels]*||" +
				"\n" +
				"\n**[Click here](https://discord.com/api/oauth2/authorize?client_id=711764918898262058&permissions=8&scope=bot)** *to add this bot to your own server*" +
				"\n**[Donate](https://www.patreon.com/join/blockySigma/checkout)**",
				false);
		message.channel.send({embed: sEmbed});
	}

	if (cmd == `${prefix}hh`) {
		message.channel.send(
			"```diff" +
			"\n- COMMANDS DETAILED " +
			"\n- this prompt was made to be viewed in fullscreen" +
			"\n " +
			"\n  <r " +
			"\n+ pulls a random post from a list of the top 100 posts of all time" +
			"\n " +
			"\n  <rtm " +
			"\n+ pulls a random post from a list of the top 100 posts of this month" +
			"\n+ this command is in case all or most <r posts have already been shown" +
			"\n " +
			"\n  <rm " +
			"\n+ pulls a random post from the top 100 posts of the 'hot' category from a multireddit" +
			"\n " +
			"\n  <rtt " +
			"\n+ pulls the top post of all time" +
			"\n " +
			"\n  <rt " +
			"\n+ pulls the top post of today" +
			"\n " +
			"\n  <rh " +
			"\n+ pulls the top post of the 'hot' category" +
			"\n " +
			"\n  <rr " +
			"\n+ pulls the top post of the 'rising' category" +
			"\n " +
			"\n  <rn " +
			"\n+ pulls the top post of the 'new' category" +
			"\n " +
			"\n  <rp " +
			"\n+ pulls a random image using random-puppy" +
			"\n+ this command was added to work on sfw channels" +
			"\n " +
			"\n  <h " +
			"\n+ pulls up a basic help post" +
			"\n " +
			"\n  <hh " +
			"\n+ pulls up this detailed post to show the complete function and reasons for each command" +
			"\n" +
			"\nadd this bot with https://discord.com/api/oauth2/authorize?client_id=711764918898262058&permissions=8&scope=bot" +
			"\n" +
			"\ndonate with https://www.patreon.com/join/blockySigma/checkout" +
			"\n " +
			"\n[menu requested by " + message.author.tag + "]\u200B```"
		);
	}

	if (cmd == `${prefix}r`) {
		request("https://www.reddit.com/r/" + args + "/top/.json?t=all&limit=100", function (error, response, body) {
			let json = JSON.parse(body);
			try {
				if (isNaN(Nargs)) {
					Nargs = 1
				}
				const maxReps = Math.min(Number(Nargs), 10);
				for (let i = 0; i < Number(maxReps); i++) {
					let randnum = Math.floor((Math.random() * 100) + 0);
					let imgurl = json["data"]["children"][randnum]["data"]["url"];
					let title = json["data"]["children"][randnum]["data"]["title"];
					let redditlink = json["data"]["children"][randnum]["data"]["permalink"];
					request(imgurl, function (err, response, body) {
						let finalurl = response.request.href
						let reEmbed = new Discord.RichEmbed()
							.setColor(16711422)
							.addField(
								"r **" + args + "** requested by **" + message.author.tag + " x" + maxReps + "**",
								"[" + title + "](" + "https://reddit.com" + redditlink + ")", true
							);
						message.channel.send({embed: reEmbed});
						return message.channel.send(finalurl);
					});
				}
			} catch {
				if (args === void(0)) {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ You must specify a subreddit!"
						)
						.setDescription(
							"Use `<rm` if you would like to pull from a random subreddit"
						);
					return message.channel.send({embed: reEmbed});
				} else {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ Error getting data from " + args
						)
						.setDescription(
							"Either this subreddit doesn't exist, or it has less than 100 posts in it"
						);
					return message.channel.send({embed: reEmbed});
				}
			}
		});
	}

	if (cmd == `${prefix}rtm`) {
		request("https://www.reddit.com/r/" + args + "/top/.json?t=month&limit=100", function (error, response, body) {
			let json = JSON.parse(body);
			try {
				if (isNaN(Nargs)) {
					Nargs = 1
				}
				const maxReps = Math.min(Number(Nargs), 10);
				for (let i = 0; i < Number(maxReps); i++) {
					let randnum = Math.floor((Math.random() * 100) + 0);
					let imgurl = json["data"]["children"][randnum]["data"]["url"];
					let title = json["data"]["children"][randnum]["data"]["title"];
					let redditlink = json["data"]["children"][randnum]["data"]["permalink"];
					request(imgurl, function (err, response, body) {
						let finalurl = response.request.href
						let reEmbed = new Discord.RichEmbed()
							.setColor(16711422)
							.addField(
								"rtm **" + args + "** requested by **" + message.author.tag + " x" + maxReps + "**",
								"[" + title + "](" + "https://reddit.com" + redditlink + ")", true
							)
						message.channel.send({embed: reEmbed});
						return message.channel.send(finalurl);
					});
				}
			} catch {
				if (args === void(0)) {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ You must specify a subreddit!"
						)
						.setDescription(
							"Use `<rm` if you would like to pull from a random subreddit"
						)
					return message.channel.send({embed: reEmbed});
				} else {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ Error getting data from " + args
						)
						.setDescription(
							"Either this subreddit doesn't exist, or it has had less than 100 posts posted in it this month"
						)
					return message.channel.send({embed: reEmbed});
				};
			}
		});
	}

	if (cmd == `${prefix}rtt`) {
		var options = {
			followRedirect: true,
			followAllRedirects: true,
			followOriginalHttpMethod: true
		};
		request("https://www.reddit.com/r/" + args + "/top/.json?t=all&limit=1", options, function (err, response, body) {
			let json = JSON.parse(body);
			try {
				if (isNaN(Nargs)) {
					Nargs = 1
				}
				const maxReps = Math.min(Number(Nargs), 10);
				for (let i = 0; i < Number(maxReps); i++) {
					let imgurl = json["data"]["children"]["0"]["data"]["url"];
					let title = json["data"]["children"]["0"]["data"]["title"];
					let redditlink = json["data"]["children"]["0"]["data"]["permalink"];
					request(imgurl, function (err, response, body) {
						let finalurl = response.request.href
						let reEmbed = new Discord.RichEmbed()
							.setColor(16711422)
							.addField(
								"rtt **" + args + "** requested by **" + message.author.tag + " x" + maxReps + "**",
								"[" + title + "](" + "https://reddit.com" + redditlink + ")", true
							)
						message.channel.send({embed: reEmbed});
						return message.channel.send(finalurl);
					});
				}
			} catch {
				if (args === void(0)) {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ You must specify a subreddit!"
						)
						.setDescription(
							"Use `<rm` if you would like to pull from a random subreddit"
						)
					return message.channel.send({embed: reEmbed});
				} else {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ Error getting data from " + args
						)
						.setDescription(
							"Either this subreddit doesn't exist, or it might be empty"
						)
					return message.channel.send({embed: reEmbed});
				};
			}
		});
	}

	if (cmd == `${prefix}rm`) {
		if (message.channel.nsfw) {
			request("https://www.reddit.com/user/chaturbot/m/Top100female/.json?limit=100", function (error, response, body) {
				let json = JSON.parse(body);
				try {
					if (isNaN(Nargs)) {
						Nargs = 1
					}
					const maxReps = Math.min(Number(Nargs), 10);
					for (let i = 0; i < Number(maxReps); i++) {
						let randnum = Math.floor((Math.random() * 100) + 0)
						let imgurl = json["data"]["children"][randnum]["data"]["url"];
						let subreddit = json["data"]["children"][randnum]["data"]["subreddit"]
						let title = json["data"]["children"][randnum]["data"]["title"];
						let redditlink = json["data"]["children"][randnum]["data"]["permalink"];
						request(imgurl, function (err, response, body) {
							let finalurl = response.request.href
							let reEmbed = new Discord.RichEmbed()
								.setColor(16711422)
								.addField(
									"rm **" + subreddit + "** requested by **" + message.author.tag + " x" + maxReps + "**",
									"[" + title + "](" + "https://reddit.com" + redditlink + ")", true
								)
								.setFooter(
									"⚠️ The <rm command picks a subreddit at random. Try <h if you would like to specify one");
							message.channel.send({
								embed: reEmbed
							});
							return message.channel.send(finalurl);
						});
					}
				} catch {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ Error getting data from the multireddit"
						)
						.setDescription(
							"Please contact Christian#7220"
						)
					return message.channel.send({embed: reEmbed});
				}
			});
		} else {
			return message.channel.send("This is a risky command! Please set this channel to nsfw or use a different command");
		}
	}

	if (cmd == `${prefix}rt`) {
		request("https://www.reddit.com/r/" + args + "/top/.json?limit=1" + args, function (error, response, body) {
			let json = JSON.parse(body);
			try {
				if (isNaN(Nargs)) {
					Nargs = 1
				}
				const maxReps = Math.min(Number(Nargs), 10);
				for (let i = 0; i < Number(maxReps); i++) {
					let imgurl = json["data"]["children"]["0"]["data"]["url"];
					let title = json["data"]["children"]["0"]["data"]["title"];
					let redditlink = json["data"]["children"]["0"]["data"]["permalink"];
					request(imgurl, function (err, response, body) {
						let finalurl = response.request.href
						let reEmbed = new Discord.RichEmbed()
							.setColor(16711422)
							.addField(
								"rt **" + args + "** requested by **" + message.author.tag + " x" + maxReps + "**",
								"[" + title + "](" + "https://reddit.com" + redditlink + ")", true
							)
						message.channel.send({embed: reEmbed});
						return message.channel.send(finalurl);
					});
				}
			} catch {
				if (args === void(0)) {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ You must specify a subreddit!"
						)
						.setDescription(
							"Use `<rm` if you would like to pull from a random subreddit"
						)
					return message.channel.send({embed: reEmbed});
				} else {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ Error getting data from " + args
						)
						.setDescription(
							"Either this subreddit doesn't exist, or it doesn't have any new posts today"
						)
					return message.channel.send({embed: reEmbed});
				};
			}
		});
	}

	if (cmd == `${prefix}rh`) {
		request("https://www.reddit.com/r/" + args + "/hot/.json?limit=1" + args, function (error, response, body) {
			let json = JSON.parse(body);
			try {
				if (isNaN(Nargs)) {
					Nargs = 1
				}
				const maxReps = Math.min(Number(Nargs), 10);
				for (let i = 0; i < Number(maxReps); i++) {
					let imgurl = json["data"]["children"]["0"]["data"]["url"];
					let title = json["data"]["children"]["0"]["data"]["title"];
					let redditlink = json["data"]["children"]["0"]["data"]["permalink"];
					request(imgurl, function (err, response, body) {
						let finalurl = response.request.href
						let reEmbed = new Discord.RichEmbed()
							.setColor(16711422)
							.addField(
								"rh **" + args + "** requested by **" + message.author.tag + " x" + maxReps + "**",
								"[" + title + "](" + "https://reddit.com" + redditlink + ")", true
							)
						message.channel.send({embed: reEmbed});
						return message.channel.send(finalurl);
					});
				}
			} catch {
				if (args === void(0)) {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ You must specify a subreddit!"
						)
						.setDescription(
							"Use `<rm` if you would like to pull from a random subreddit"
						)
					return message.channel.send({embed: reEmbed});
				} else {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ Error getting data from " + args
						)
						.setDescription(
							"Either this subreddit doesn't exist, or it doesn't have any hot posts"
						)
					return message.channel.send({embed: reEmbed});
				};
			}
		});
	}

	if (cmd == `${prefix}rr`) {
		request("https://www.reddit.com/r/" + args + "/rising/.json?limit=1" + args, function (error, response, body) {
			let json = JSON.parse(body);
			try {
				if (isNaN(Nargs)) {
					Nargs = 1
				}
				const maxReps = Math.min(Number(Nargs), 10);
				for (let i = 0; i < Number(maxReps); i++) {
					let imgurl = json["data"]["children"]["0"]["data"]["url"];
					let title = json["data"]["children"]["0"]["data"]["title"];
					let redditlink = json["data"]["children"]["0"]["data"]["permalink"];
					request(imgurl, function (err, response, body) {
						let finalurl = response.request.href
						let reEmbed = new Discord.RichEmbed()
							.setColor(16711422)
							.addField(
								"rr **" + args + "** requested by **" + message.author.tag + " x" + maxReps + "**",
								"[" + title + "](" + "https://reddit.com" + redditlink + ")", true
							)
						message.channel.send({embed: reEmbed});
						return message.channel.send(finalurl);
					});
				}
			} catch {
				if (args === void(0)) {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ You must specify a subreddit!"
						)
						.setDescription(
							"Use `<rm` if you would like to pull from a random subreddit"
						)
					return message.channel.send({embed: reEmbed});
				} else {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ Error getting data from " + args
						)
						.setDescription(
							"Either this subreddit doesn't exist, or it doesn't have any rising posts"
						)
					return message.channel.send({embed: reEmbed});
				};
			}
		});
	}

	if (cmd == `${prefix}rn`) {
		request("https://www.reddit.com/r/" + args + "/new/.json?limit=1" + args, function (error, response, body) {
			let json = JSON.parse(body);
			try {
				if (isNaN(Nargs)) {
					Nargs = 1
				}
				const maxReps = Math.min(Number(Nargs), 10);
				for (let i = 0; i < Number(maxReps); i++) {
					let imgurl = json["data"]["children"]["0"]["data"]["url"];
					let title = json["data"]["children"]["0"]["data"]["title"];
					let redditlink = json["data"]["children"]["0"]["data"]["permalink"];
					request(imgurl, function (err, response, body) {
						let finalurl = response.request.href
						let reEmbed = new Discord.RichEmbed()
							.setColor(16711422)
							.addField(
								"rn **" + args + "** requested by **" + message.author.tag + " x" + maxReps + "**",
								"[" + title + "](" + "https://reddit.com" + redditlink + ")", true
							)
						message.channel.send({embed: reEmbed});
						return message.channel.send(finalurl);
					});
				}
			} catch {
				if (args === void(0)) {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ You must specify a subreddit!"
						)
						.setDescription(
							"Use `<rm` if you would like to pull from a random subreddit"
						)
					return message.channel.send({embed: reEmbed});
				} else {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ Error getting data from " + args
						)
						.setDescription(
							"Either this subreddit doesn't exist, or it doesn't have any new posts"
						)
					return message.channel.send({embed: reEmbed});
				};
			}
		});
	}
	if (cmd == `${prefix}rp`) {
		try {
			rp(args).then(url => {
				if (url === void(0)) {
					let reEmbed = new Discord.RichEmbed()
						.setColor(16711422)
						.setTitle(
							"⚠️ Error"
						)
						.setDescription(
							"Either this subreddit doesn't exist, or it doesn't have any posts"
						)
					return message.channel.send({embed: reEmbed});
				} else {
					if (args === void(0)) {
						let reEmbed = new Discord.RichEmbed()
							.setColor(16711422)
							.setTitle(
								"rp **puppy** requested by **" + message.author.tag + "**"
							)
							.setFooter(
								"You did not specify a subreddit so puppies will be shown");
						message.channel.send({embed: reEmbed});
						return message.channel.send(url)
					} else {
						let reEmbed = new Discord.RichEmbed()
							.setColor(16711422)
							.setTitle(
								"rp **" + args + "** requested by **" + message.author.tag + "**"
							)
						message.channel.send({embed: reEmbed});
						return message.channel.send(url)

					}
				};
			});

		} catch {
			return message.channel.send("Error getting data from **" + args + "**");
		};
	}
});

bot.login(config.token);