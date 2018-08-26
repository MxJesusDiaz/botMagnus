const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

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



bot.login(proccess.env.BOT_TOKEN);
