export default async function add(client, message, args, getSingleUserByName, getSingleChannelByName){
    if(args.length === 0) return message.reply("Algum parametro está faltando!")
    try{

    }catch(err){
        console.log(err)
        message.channel.send(`Algo deu errado :(`)
    }
}