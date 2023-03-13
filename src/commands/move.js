import { getMultipleUsersByName, getSingleChannelByName } from '../utils/findFunctions.js'

export default async function move(message, PermissionsBitField, commandName, args){
    if(args.length < 2) return message.reply("Algum parametro está faltando!")
       const channel = args[args.length-1]
       const users = args.slice(0, args.length - 1)
      
        try{ 
        if(!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers))return message.reply("Você não tem permissão para mover usuários.")
        const users = message.content.trim().substring(commandName.length+1, message.content.length - args[args.length-1].length).split(',')
        const treatedUsers = users.map(user => {
            let treated = user
            if(treated.charAt(0) === ' '){
                treated = treated.substring(1)
                   
            }
            if(treated.charAt(treated.length -1) === ' '){
                treated = treated.substring(0, treated.length -1)
                   
            }
            return treated
        })
        if(args.length === 0) return message.reply('Por favor diga quem você quer mover.')
        const members = [...await message.guild.members.fetch()]
        const channels = [...await message.guild.channels.fetch()]
        const movemembers = getMultipleUsersByName(members, treatedUsers)
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