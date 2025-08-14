const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
require('moment/locale/id');
moment.locale('id');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Menampilkan pesan terakhir yang dihapus di channel tertentu'),

    async execute(interaction) {
        const snipe = interaction.client.snipes.get(interaction.channel.id);

        if (!snipe) {
            return interaction.reply({ content: '❌ Tidak ada pesan yang bisa di-snipe.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setAuthor({
                name: snipe.author.username,
                iconURL: snipe.author.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setDescription(snipe.content)
            .addFields({ name: 'Dikirim pada', value: moment(snipe.createdAt).format('dddd, D MMMM YYYY HH:mm') })
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
