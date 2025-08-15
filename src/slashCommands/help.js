const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Menampilkan daftar command yang tersedia'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Help')
            .setDescription(`Berikut adalah daftar command ${interaction.user.username} yang tersedia\n\n${interaction.client.slashCommands.map(c => "\`/" + c.data.name + "\`").join('  ')}`)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp();

        if (process.env.SUPPORT_WEB) {
            const button = new ButtonBuilder()
                .setLabel('🔗 Support Web')
                .setStyle(ButtonStyle.Link)
                .setURL(process.env.SUPPORT_WEB);

            const row = new ActionRowBuilder().addComponents(button);

            await interaction.reply({
                embeds: [embed],
                components: [row],
            });
        } else {
            await interaction.reply({
                embeds: [embed]
            });
        }
    }
};