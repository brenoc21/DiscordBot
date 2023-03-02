
export default async function moveAll(message, PermissionsBitField, args, getSingleChannelByName){
    if(args.length < 2) return message.reply("Algum parametro está faltando!")
       
      console.log(args)
        try{ 
            
        if(!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers))return message.reply("Você não tem permissão para mover usuários.")
        if(args.length === 0) return message.reply('Por favor diga quem você quer mover.')
        const channels = [...await message.guild.channels.fetch()]
        console.log("im here after channels fetch")
        const channelFrom = getSingleChannelByName(channels, args[0])
        console.log("im here after channel from")
        const channelTo = getSingleChannelByName(channels, args[1])
        const membersToMove = channelFrom.members
        console.log("im here after channel from", membersToMove, " channel to name: ", channelTo.members, channelTo.name, " channel from name: ", channelFrom.members, channelFrom.name,)
        membersToMove.map(member => {
            console.log(member)
            member.voice.setChannel(channelTo)
        })
        
       }catch(err){
        if(err){
            console.log(err)
            return message.reply("Ocorreu um erro.")
        }
    }
}