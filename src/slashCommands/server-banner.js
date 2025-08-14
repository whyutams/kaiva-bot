const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-banner')
        .setDescription('Menampilkan banner server (jika tersedia)'),

    async execute(interaction) {
        const guild = interaction.guild;
        const banner = guild.bannerURL({ size: 1024, extension: 'png', forceStatic: false });

        if (!banner) {
            return interaction.reply({
                content: '⚠️ Server ini tidak memiliki banner.',
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle(`${guild.name}`)
            .setImage(banner)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};
