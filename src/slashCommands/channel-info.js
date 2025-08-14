const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const moment = require('moment');
require('moment/locale/id');
moment.locale('id');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel-info')
        .setDescription('Menampilkan informasi tentang channel tertentu')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Pilih channel yang ingin dilihat informasinya')
                .setRequired(false)
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const createdAt = moment(channel.createdAt).format('dddd, D MMMM YYYY');

        const embed = new EmbedBuilder()
            .setTitle(`Channel Info`)
            .setDescription(`${channel} (\`${channel.name}\`)`)
            .addFields(
                { name: 'ID', value: channel.id, inline: true },
                { name: 'Tipe', value: `${channel.type} (${ChannelType[channel.type] || 'Unknown'})`, inline: true },
                { name: 'Dibuat', value: createdAt, inline: true },
                { name: 'NSFW', value: channel.nsfw ? 'Ya' : 'Tidak', inline: true },
                { name: 'Topic', value: channel.topic || 'Tidak ada', inline: false }
            )
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
