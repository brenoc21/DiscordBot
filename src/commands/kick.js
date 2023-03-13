import { getSingleUserByName} from '../utils/findFunctions.js'

export default async function kick(message, PermissionsBitField, args){
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