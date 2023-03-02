export default async function disconnect(message, PermissionsBitField, commandName, args, getMultipleUsersByName){
    if(args.length === 0) return message.reply("Algum parametro está faltando!")
        try{ 
        if(!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers))return message.reply("Você não tem permissão para mover usuários.")
        const users = message.content.trim().substring(commandName.length+1).split(',')
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
        const movemembers = getMultipleUsersByName(members, treatedUsers)
        movemembers.map((member)=> {
            return member[0][1].voice.disconnect().then(()=> message.reply(`usuário ${member[0][1].user.tag} foi desconectado.`))
        })
       }catch(err){
        if(err){
            return message.reply("Ocorreu um erro. Verifique se o nome dos usuários e do canal estão corretos!")
        }
    }
}