
import dotenv from 'dotenv'
import { Client, GatewayIntentBits, PermissionsBitField } from 'discord.js'
import { getSingleUserByName, getMultipleUsersByName, getSingleChannelByName } from './utils/findFunctions.js'
import moveAll from './commands/moveAll.js';
import kick from './commands/kick.js';
import move from './commands/move.js';
import disconnect from './commands/disconnect.js';
dotenv.config();
const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions
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
       switch(commandName){
        case 'kick':kick(message, PermissionsBitField, args, getSingleUserByName)
        break;
        case 'move':move(message, PermissionsBitField, commandName, args, getMultipleUsersByName, getSingleChannelByName)
        break;
        case 'dc': disconnect(message, PermissionsBitField, commandName, args, getMultipleUsersByName)
        break;
        case 'moveAll': moveAll(message, PermissionsBitField, args, getSingleChannelByName)
        break;
        default: message.reply(`Commando ${commandName} não foi encontrado.`)
       }
    }
})



