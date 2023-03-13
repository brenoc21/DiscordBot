import { getSingleChannelByName } from '../utils/findFunctions.js'
export default async function moveAll(message, PermissionsBitField, args){
    if(args.length < 2) return message.reply("Algum parametro está faltando!")
       
      console.log(args)
        try{ 
            
        if(!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers))return message.reply("Você não tem permissão para mover usuários.")
        if(args.length === 0) return message.reply('Por favor diga quem você quer mover.')
        const channels = [...await message.guild.channels.fetch()]
        const channelFrom = getSingleChannelByName(channels, args[0])
        const channelTo = getSingleChannelByName(channels, args[1])
        const membersToMove = channelFrom.members
            membersToMove.map(member => {
            member.voice.setChannel(channelTo)
        })
        
       }catch(err){
        if(err){
            console.log(err)
            return message.reply("Ocorreu um erro.")
        }
    }
}