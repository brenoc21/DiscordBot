require('dotenv').config()

const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.DirectMessageTyping
  ]
})
const prefix = process.env.PREFIX

client.on('ready', ()=> {
    console.log(`${client.user.username} logged in!!!`)
})

client.login(process.env.BOT_TOKEN)


client.on('messageCreate', async (message)=> {
    if(message.content.startsWith(prefix)){
        //message.content para pegar o testo da mensagem
        //message.author.tag para pegar a tag do autor da mensagem
        //message.reply("") literally replys the message
        //message.channel.send("") send a message in the same channel
       const [commandName, ...args] = message.content.trim().substring(prefix.length).split(/\s+/)
       if(commandName === "kick"){
        if(args.length === 0) return message.reply('Please provide an ID')
        message.channel.send(`kicking user ${args[0]}`)
        const response = await message.guild.members.kick(args[0]).catch(console.error);
        if(response){
            console.log("Response:", response.tag)
        }
        // const array = [...member]
        // array.forEach(element => {
        //     member.kick()
        // });
        // console.log(array[1][1].user.id)
        // if(member){
        //     member.kick()
        // } else{
        //     message.channel.send("Member not found")
        // }
       }
    }
})