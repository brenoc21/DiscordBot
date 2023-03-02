
import dotenv from 'dotenv'
import { Client, GatewayIntentBits, PermissionsBitField } from 'discord.js'
import { getSingleUserByName, getMultipleUsersByName, getSingleChannelByName } from './utils/findFunctions.js'
dotenv.config();
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
       const [commandName, ...args] = message.content.trim().substring(prefix.length).split(/\s+/)
       if(commandName === "kick"){
        if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers))return message.reply("Você não tem permissão para kickar usuários.")
        if(args.length === 0) return message.reply('Please provide an ID')
        const members = [...await message.guild.members.fetch()]
        const kickmember = getSingleUserByName(members, args[0])
        if(kickmember){
        if(!members) return message.channel.send('Unkown error')
        
        message.guild.members.kick(kickmember.user.id).then(()=> message.channel.send(`Usuário ${kickmember.user.tag} foi de base.`)).catch(err=> {
            if(err.status === 403){
                message.channel.send(`Eu não tenho permissão para kickar o usuário ${kickmember.user.tag}`)
            }
            console.log(err)})
        }else{
            return message.reply('Usuário não encontrado')
        }
       }
    
    
    }
})
client.on('messageCreate', async (message)=> {
    if(message.content.startsWith(prefix)){
       const [commandName, ...args] = message.content.trim().substring(prefix.length).split(/\s+/)
       if(commandName === "move"){
       if(args.length < 2) return message.reply("Algum parametro está faltando!")
       const channel = args[args.length-1]
       const users = args.slice(0, args.length - 1)
        try{ 
        if(!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers))return message.reply("Você não tem permissão para mover usuários.")
        if(args.length === 0) return message.reply('Por favor diga quem você quer mover.')
        const members = [...await message.guild.members.fetch()]
        const channels = [...await message.guild.channels.fetch()]
        const movemembers = getMultipleUsersByName(members, users)
        const moveChannel = getSingleChannelByName(channels, channel)
       
        movemembers.map((member)=> {
            return member[0][1].voice.setChannel(moveChannel)
        })
       }catch(err){
        if(err){
            return message.reply("Ocorreu um erro. Verifique se o nome dos usuários e do canal estão corretos!")
        }
    }
       }
    }
}
)
client.on('messageCreate', async (message)=> {
    if(message.content.startsWith(prefix)){
       const [commandName, ...args] = message.content.trim().substring(prefix.length).split(/\s+/)
       if(commandName === "dc"){
       if(args.length === 0) return message.reply("Algum parametro está faltando!")
        try{ 
        if(!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers))return message.reply("Você não tem permissão para mover usuários.")
        if(args.length === 0) return message.reply('Por favor diga quem você quer mover.')
        const members = [...await message.guild.members.fetch()]
        const movemembers = getMultipleUsersByName(members, args)
        movemembers.map((member)=> {
            return member[0][1].voice.disconnect().then(()=> message.reply(`usuário ${member[0][1].user.tag} foi desconectado.`))
        })
       }catch(err){
        if(err){
            return message.reply("Ocorreu um erro. Verifique se o nome dos usuários e do canal estão corretos!")
        }
    }
       }
    }
}
)


        //message.content para pegar o testo da mensagem
        //message.author.tag para pegar a tag do autor da mensagem
        //message.reply("") literally replys the message
        //message.channel.send("") send a message in the same channel