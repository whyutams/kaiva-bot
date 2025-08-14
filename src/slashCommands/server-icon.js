const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-icon')
        .setDescription('Menampilkan icon server'),

    async execute(interaction) {
        const guild = interaction.guild;
        const icon = guild.iconURL({ size: 1024, extension: 'png', forceStatic: false });

        if (!icon) return interaction.reply({ content: 'Server ini tidak memiliki icon.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle(`${guild.name}`)
            .setImage(icon)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};
