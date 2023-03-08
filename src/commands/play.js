import scrapeYt from 'scrape-youtube'
import { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import playdl from 'play-dl';
export default async function play (client, message, args) {

    if(!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return message.author.send(`**Estou sem permissão de \`Enviar Mensagens\` neste canal**`)
    if(!args[0]) return message.channel.send(`**Me informe um nome ou um url de alguma musica do youtube**`).then(mag => mag.delete({timeout: 60000})).catch(a => {})
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send(`**Entre em um canal de voz primeiro!**`).then(mag => mag.delete({timeout: 60000})).catch(a => {})
    if(!channel.permissionsFor(client.user.id).has("SPEAK")) return message.quote(`**Estou sem permissão de \`Falar\` neste canal**`).then(mag => mag.delete({timeout: 60000})).catch(a => {})
   if(!channel.permissionsFor(client.user.id).has("CONNECT")) return message.channel.send(`**Estou sem permissão de \`Conectar\` neste canal**`).then(mag => mag.delete({timeout: 60000})).catch(a => {})
   joinVoiceChannel({
    channelId: message.member.voice.channel.id,
    guildId: message.guild.id,
    adapterCreator: message.guild.voiceAdapterCreator
})
   
let song_not_found = `:x: **${message.author} Não foi possível encontrar a música solicitada!**`; 

   try {

    const server = message.client.queue.get(message.guild.id);
    
    let video = await scrapeYt.search(args.join(' '))
    let result = video.videos[0]
    const song = {
        id: result.id,
        title: result.title,
        duration: result.duration,
        thumbnail: result.thumbnail,
        upload: result.uploadDate,
        views: result.viewCount,
        requester: message.author,
        channel: result.channel.name,
        channelurl: result.channel.url
      };
      const stream = await playdl.stream(result.link, { filter: 'audioonly' })
      console.log(stream)
        if (!song) {
            getVoiceConnection(`guild_id`).disconnect();
            message.client.queue.delete(message.guild.id);
            message.channel.send(`**Saindo da chamada**`).then(mag => mag.delete({timeout: 60000})).catch(a => {})
            return;
        }
    try {
        ;
        
        const player = createAudioPlayer()
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false
        })
        const resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })
        
        player.on(AudioPlayerStatus.Playing,() => {
            message.reply(`Now playing ${song.title}`)
        })
        
        player.on(AudioPlayerStatus.Idle,(err) => {
            getVoiceConnection(message.guildId).disconnect()
        })
        player.on('connectionCreate', (queue) => {
            queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
              const oldNetworking = Reflect.get(oldState, 'networking');
              const newNetworking = Reflect.get(newState, 'networking');
        
              const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
                const newUdp = Reflect.get(newNetworkState, 'udp');
                clearInterval(newUdp?.keepAliveInterval);
              }
        
              oldNetworking?.off('stateChange', networkStateChangeHandler);
              newNetworking?.on('stateChange', networkStateChangeHandler);
            });
        });
        player.play(resource)
        connection.subscribe(player)
    } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        getVoiceConnection(message.guildId);
        return message.channel.send(`**Algum erro aconteceu: \`${error}\`**`).then(mag => mag.delete({timeout: 60000})).catch(a => {})
    }
    
} catch (err) { 
    console.log(err)
    message.channel.send(song_not_found) }

  }
