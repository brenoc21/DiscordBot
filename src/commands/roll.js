
export default async function roll( message, args){
    if(args.length === 0) return message.reply("Algum parametro está faltando!")
    try{
        
        
        let items = args.map(item=> {
            return item.split('d')
        })

        let treatedItems = items.map((item)=> {
            if(item[0] === '+') return '+'
            if(item[0] === '-') return '-'
            if(item[0] === '*') return '*'
            if(item[0] === '/') return '/'
            if(item.length > 1){
            return(item[0] * Math.floor( 1 + item[1]*Math.random() ))
        }
        return item[0]
        })
        message.reply(`Seu resultado deu ${eval(treatedItems.join(' '))}.`)
    }catch(err){
        console.log(err)
        message.channel.send(`Algo deu errado :(`)
    }
}