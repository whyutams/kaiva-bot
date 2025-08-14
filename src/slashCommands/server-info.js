const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
require('moment/locale/id'); 
moment.locale('id');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Menampilkan informasi server'),

    async execute(interaction) {
        const { guild } = interaction;

        await guild.members.fetch();

        const totalMembers = guild.members.cache.filter(m => !m.user.bot).size;
        const totalBots = guild.members.cache.filter(m => m.user.bot).size;
        const tanggalBuat = moment(guild.createdAt).format('dddd, D MMMM YYYY');

        const owner = await guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Server Info" })
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL({ extension: "png", forceStatic: false }))
            .addFields(
                { name: 'Server ID', value: guild.id, inline: true },
                { name: 'Owner', value: `<@${owner.id}> (${owner.user.username})`, inline: true },
                { name: 'Jumlah Member', value: `${totalMembers} ${totalMembers > 1 ? "members" : "member"}`, inline: true },
                { name: 'Jumlah Bot', value: `${totalBots} ${totalBots > 1 ? "bots" : "bot"}`, inline: true },
                { name: 'Dibuat Pada', value: tanggalBuat, inline: true }
            )
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: "png", forceStatic: false })
            })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};
