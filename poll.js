//usage : !poll Language Js Python C# 3000
const prefix="your prefix";
async function poll(message) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    let lao = message.channel.permissionsFor("Your bot's id").has("ADD_REACTIONS", false);
    if (lao == false) {
      return message.channel.send("I can't add reactions! Missing permissions! Check permission and try again").catch((error) => {
        return;
      });
    }
    const addReactions = (message, reactions) => {
      message.react(reactions[0])
      reactions.shift()
      if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750)
      }
    }
    const filter = (reaction, user) => {
      return usedEmojis.includes(reaction.emoji.name) && !user.bot
    };
    const embedBuilder = (title, author) => {
      return new Discord.MessageEmbed()
        .setTitle(`Poll for **${title}**`)
        .setFooter(`Poll created by ${author}`)
        .setTimestamp();
    }
    const embedBuilder2 = (title, author) => {
      return new Discord.MessageEmbed()
        .setTitle(`Results of Poll **${title}**`)
        .setFooter(`Poll created by ${author}`)
        .setTimestamp();
    }
    options = []
    var i;
    for (i = 1; i < args.length - 1; i++) {
      const args1 = args[i].charAt(0).toUpperCase() + args[i].slice(1)
      options[i - 1] = args1
    }
    abu = Number(args[args.length - 1])
    lul = isNaN(abu)
    if (lul == true) {
      return message.channel.send(`Invalid usage | help for correct usage`).catch((error) => {
        return;
      });
    }
    const defEmojiList = [
      '\u0031\u20E3',
      '\u0032\u20E3',
      '\u0033\u20E3',
      '\u0034\u20E3',
      '\u0035\u20E3',
      '\u0036\u20E3',
      '\u0037\u20E3',
      '\u0038\u20E3',
      '\u0039\u20E3',
      '\uD83D\uDD1F'
    ]; // Default emojis you can change it
    timeout = args[args.length - 1]
    const options2 = {
      dispose: true,
      time: timeout * 1000
    };
    if (!message && !message.channel) return message.reply('Channel is inaccessible.').catch((error) => {
      return;
    });
    title = args[0]
    emojiList = defEmojiList.slice()
    forceEndPollEmoji = '\u2705'
    if (!title) return message.reply('Poll title is not given.').catch((error) => {
      return;
    });
    if (!options) return message.reply('Poll options are not given.').catch((error) => {
      return;
    });
    if (options.length < 2) return message.reply('Please provide more than one choice.').catch((error) => {
      return;
    });
    if (options.length > emojiList.length) return message.reply(`Please provide ${emojiList.length} or less choices.`).catch((error) => {
      return;
    });
    let text = `To vote, react using the correspoding emojis.\nThe voting will end in **${timeout} seconds**.\nPoll creater can end the poll **forcefully** by reacting to ${forceEndPollEmoji} emoji.\nIf you voted without taking back the emoji your **last vote** will be counted.\n\n`;
    const emojiInfo = {};
    for (const option of options) {
      const emoji = emojiList.splice(0, 1);
      emojiInfo[emoji] = { option: option, votes: 0 };
      text += `${emoji} : \`${option}\`\n\n`;
    }
    const usedEmojis = Object.keys(emojiInfo);
    usedEmojis.push(forceEndPollEmoji);
    ck = 0
    const poll = await message.channel.send(embedBuilder(title, message.author.tag).setDescription(text)).catch((error) => {
      ck = 3
    });
    if (ck == 3) {
      return;
    }
    for (const emoji of usedEmojis) poll.react(emoji).catch((error) => {
    });
    if (ck == 4) {
      message.channel.send("Unable to react to embed. Check Permissions!")
      return;
    }
    const reactionCollector = poll.createReactionCollector(filter, options2);
    const voterInfo = new Map();
    reactionCollector.on('collect', (reaction, user) => {
      if (usedEmojis.includes(reaction.emoji.name)) {
        if (reaction.emoji.name === forceEndPollEmoji && message.author.id === user.id) {
          return reactionCollector.stop();
        }
        if (!voterInfo.has(user.id)) voterInfo.set(user.id, { emoji: reaction.emoji.name });
        const votedEmoji = voterInfo.get(user.id).emoji;
        if (votedEmoji !== reaction.emoji.name && reaction.emoji.name !== forceEndPollEmoji && votedEmoji !== forceEndPollEmoji) {
          emojiInfo[votedEmoji].votes -= 1;
          voterInfo.set(user.id, { emoji: reaction.emoji.name });
        }
        if (reaction.emoji.name === forceEndPollEmoji) {
        } else {
          emojiInfo[reaction.emoji.name].votes += 1;
        }
      }
    });

    reactionCollector.on('remove', (reaction, user) => {
      try {
        const votedEmoji = voterInfo.get(user.id).emoji;

        if (usedEmojis.includes(reaction.emoji.name) && votedEmoji == reaction.emoji.name && reaction.emoji.name !== forceEndPollEmoji) {
          voterInfo.delete(user.id);
          emojiInfo[reaction.emoji.name].votes -= 1;
        }
      } catch (err) {
        return;
      }
    });
    reactionCollector.on('end', () => {
      var i = 0;
      const a = []
      const a2 = []
      const b = []
      const bb = []
      text = '';
      for (const emoji in emojiInfo) {
        text += `**${emojiInfo[emoji].option}** | **${emojiInfo[emoji].votes} vote** \n\n`;
        a[i] = emojiInfo[emoji].option
        b[i] = emojiInfo[emoji].votes
        bb[i] = emojiInfo[emoji].votes
        i = i + 1;
      }
      for (var lul312 = 0; lul312 < b.length; lul312++) {
        if (b.indexOf(b[lul312]) !== b.lastIndexOf(b[lul312])) {
          equal = 1
        }
      }
      equal = 0
      var ip = bb.indexOf(Math.max(...bb))
      bb.splice(ip, 1)
      var ip2 = bb.indexOf(Math.max(...bb))
      if (b[ip] == 0) {
        text += `There is no vote!\n\n`
      } else {
        if (b[ip] == bb[ip2]) {
          text += `Tie no winner. Tie of **${a[ip]}** | **${a[ip2 + 1]}** with **${b[ip]}** votes!\n\n `
        } else {
          text += `The winner is **${a[ip]}** with **${b[ip]}** votes!\n\n`
        }
      }
      //poll.delete();
      message.channel.send(embedBuilder2(title, message.author.tag).setDescription(text)).catch((error) => {
        return;
      });
    });



  }