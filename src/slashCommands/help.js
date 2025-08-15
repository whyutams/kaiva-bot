const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Menampilkan daftar command yang tersedia'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Help')
            .setDescription(`Berikut adalah daftar command ${interaction.user.username} yang tersedia\n\n${interaction.client.slashCommands.map(c => "\`/"+c.data.name+"\`").join('  ')}`)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            }) 
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};