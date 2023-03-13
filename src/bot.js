
import dotenv from 'dotenv'
import { ActivityType, Client, GatewayIntentBits, PermissionsBitField } from 'discord.js'
import { getSingleUserByName, getMultipleUsersByName, getSingleChannelByName } from './utils/findFunctions.js'
import moveAll from './commands/moveAll.js';
import kick from './commands/kick.js';
import move from './commands/move.js';
import disconnect from './commands/disconnect.js';
import add from './commands/add.js';
import play from './commands/play.js';
import associations from './commands/associations.js';
import scrap from './commands/scrap.js';
import roll from './commands/roll.js';
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
client.queue = new Map()
client.on('ready', ()=> {
    console.log(`${client.user.username} logged in!!!`)
    client.user.setActivity({
        name: "$command",
        type: ActivityType.Playing
    })
})

client.login(process.env.BOT_TOKEN)
client.on('messageCreate', async (message)=> {
    if(message.content.startsWith(prefix)){
       const [commandName, ...args] = message.content.trim().substring(prefix.length).split(/\s+/)
       switch(commandName){
        case 'kick':kick(message, PermissionsBitField, args)
        break;
        case 'move':move(message, PermissionsBitField, commandName, args)
        break;
        case 'dc': disconnect(message, PermissionsBitField, commandName, args)
        break;
        case 'moveAll': moveAll(message, PermissionsBitField, args)
        case 'add': add(client, message, args)
        break;
        case 'play': play(client, message, args)
        break;
        case 'associations': associations(client, message, args)
        break;
        case 'scrap': scrap(message, args, commandName)
        break;
        case 'roll': roll(message, args, commandName)
        break;
        default: message.reply(`Commando ${commandName} não foi encontrado.`)
       }
    }
})



