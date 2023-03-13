import puppeteer from "puppeteer";
  export default async function add(message, args, commandName){
    if(args.length === 0) return message.reply("Algum parametro está faltando!")
    try{
        const card = message.content.trim().substring(commandName.length+1, message.content.length).trim()
        const treated = card.replaceAll(' ', '%20')
        .replaceAll(',', '%2C')
        .replaceAll('-', '%1D')
        .replaceAll('/', '%2F')
        .replaceAll('&', '%26')
        .replaceAll('\'', '%27')
        .replaceAll(':', '%3A')
        
        const browser = await puppeteer.launch();
        let treatedArray = []
        
        const page = await browser.newPage();
        await page.goto(`https://www.ligamagic.com.br/?view=cards/card&card=${treated}&aux=${treated}`);
        let valueArray = []
            valueArray = await page.evaluate(()=> {
                let valueArray = []
                let element = document.getElementsByClassName('edicoes');
                let count = element[0].childElementCount
                console.log(element)
                for(let i = 0; i< count; i++){
                    cardShowInfo(i)
                    valueArray.push(document.getElementsByClassName("col-prc-menor")[0].innerText)
                }
                return valueArray
            })
            treatedArray = valueArray.map((element)=> {
                let treatedItem = element.replace("R$ ", "").replace(".", "")
                let lastComma = treatedItem.lastIndexOf(',');
                let newStr = treatedItem.substring(0, lastComma) + '.' + treatedItem.substring(lastComma + 1);
                if(parseFloat(newStr) > 0)return parseFloat(newStr*1)
            })
        if(!treatedArray[0])return message.reply("Carta não encontrada.")
        message.reply(`A carta ${args.join(" ")} está por R$ ${ treatedArray.sort(function(a,b) {
            return (+a) - (+b);
          })[0]} no minimo da Liga Magic.`)
        await browser.close();
      
    }catch(err){
        console.log(err)
        message.channel.send(`Algo deu errado :(`)
    }
}