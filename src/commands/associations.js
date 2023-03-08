import api from "../services/api.js";
import { EmbedBuilder } from "discord.js";
export default async function associations(client, message, args) {
  try {
    const result = await api.get("/association/list").catch((err) => {
      console.log(err);
    });
    const picture = await client.user.displayAvatarURL()
    const associationList = result.data.message;
    associationList.map((association) => {
      const Embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(association.name)
        .setDescription(`${association.city}, ${association.street} ${association.numberStreet} - ${association.cep}`)
        .setThumbnail(picture)
        .addFields(
          {
            name: "Instagram",
            value: association.instagram,
            inline: true,
          },
          { name: "Facebook", value: association.facebook, inline: true }
        )
        .setImage(picture)
        .setTimestamp()
        .setFooter({
          text: "Todos os dados são provenientes da API Fedrann.",
          iconURL: picture,
        });
        
      message.channel.send({embeds: [Embed]});
    });
  } catch (err) {
    console.log(err);
    message.channel.send(`Algo deu errado :(`);
  }
}
