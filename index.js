const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const client = new Discord.Client();

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity('a tu Corazón', {type: 'WATCHING'});
});

bot.on("message", async message => {
   if(message.author.bot) return;
   if(message.channel.type === "dm") return;

   let prefix = botconfig.prefix;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);

   if(cmd === `${prefix}report`){

     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if (!rUser) return message.channel.send("No se pudo encontrar al usuario.");
     let reason = args.join(" ").slice(22);

      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reportes")
      .setColor("#f44500")
      .addField("Usuario Reportado:", `${rUser} con el ID: ${rUser.id}`)
      .addField("Reportado por:", `${message.author} con el ID: ${message.author.id}`)
      .addField("Canal", message.channel)
      .addField("TimeStamp:", message.createdAt)
      .addField("Razón: " , reason);

      let reportschannel = message.guild.channels.find(`name`, "reportes");
      if(!reportschannel) return message.channel.send("No se encontro el canal de reportes.");

      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);

     return;
   }

   if(cmd === `${prefix}role`){
       let role = message.guild.roles.find("name", "Rocola (Moderacion)");

       let member = message.mentions.members.first();

       member.addRole(role).catch(console.error);
       member.addRole(Rocola (Moderacion));
   }

   if(cmd === `${prefix}ping`){
           message.delete();
           message.channel.send("Te estamos midiendo el retraso...... Espera un momento!").then(message => {
               message.edit("Pong!: " + (Date.now() - message.createdTimestamp)*(-1) + " ms");
           });
   }
   if(cmd === `${prefix}serverinfo`){
     let servericon = message.guild.iconURL;
     let serverembed = new Discord.RichEmbed()
     .setColor("#f44500")
     .setThumbnail(servericon)
     .addField("Nombre del Servidor:", message.guild.name)
     .addField("Dueño:", message.guild.owner)
     .addField("Fecha de Creacion:", message.guild.createdAt)
     .addField("Región:" , message.guild.region)
     .addField("Fecha de Ingreso:", message.member.joinedAt)
     .addField("Miembros", message.guild.memberCount);

     return message.channel.send(serverembed);
   }

   if (cmd === `${prefix}botinfo`){

     let bicon = bot.user.displayAvatarURL;
     let botembed = new Discord.RichEmbed()
     .setDescription("Información del Bot")
     .setColor("#56f442")
     .setThumbnail(bicon)
     .addField("Nombre del Bot:", bot.user.username)
     .addField("Ping:", bot.user.ping)
     .addField("Fecha de Creación:", bot.user.createdAt);

     return message.channel.send(botembed);
   }

   if (message.content.startsWith("❤")) {
     message.channel.send("❤");
   }

   if(cmd === `${prefix}help`){
    let bicon = bot.user.displayAvatarURL;
    let bothelp = new Discord.RichEmbed()
    .setDescription("Comandos Disponibles.")
    .setColor("#56f442")
    .setThumbnail(bicon)
    .addField("?serverinfo: Muestra información del servidor")
    .addField("?botinfo: Muestra información del Bot")
    .addField("?report <user> <reason>: Reporta a un jugador. ");

    return message.author.send(bothelp);
   }

   if(cmd === `${prefix}say`){
       let sayMessage = args.join(" ");
       let reportschannel = message.guild.channels.find(`name`, "good-morning-☀");
       message.delete().catch(O_o=>{});
       reportschannel.send(sayMessage);
   }
});





function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {
        filter: "audioonly"
    }));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });

}
let servers = {};
let prefix = botconfig.prefix;
client.on("message", async message => {
    var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
    switch (args[0].toLowerCase()) {
        case "mplay":
            if (!message.guild.member(client.user).hasPermission('SPEAK')) return message.channel.send('**Sorry, but i cant join/speak in this channel!**').catch(console.error);
            if (!args[1]) {
                message.channel.send("**Please provide a URL YouTube link to me to play song.**");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            if (console.error) {
                message.channel.send("**Sorry, but i cant search videos in YouTube! Provide a link to play!**");
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            message.channel.sendMessage('``You song has been added to the queue.``')
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "mstop":
            var server = servers[message.guild.id];
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.send('``The queue of songs removed.``');
            break;
        case "mskip":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.channel.send('``The song has been sucessfully skipped.``');
            break;
        case "mpause":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.pause();
            message.channel.send('``The song is paused.``');
            break;
        case "mresume":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.resume();
            message.channel.send('``The song is sucessfully continued.``');
            break;
    }
});

bot.login(process.env.token);