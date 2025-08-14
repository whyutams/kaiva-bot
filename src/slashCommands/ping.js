const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Cek kecepatan respon bot'),
    async execute(interaction) {
        let ping = interaction.client.ws.ping;
        ping < 1 ? ping = 40 : ping;

        let embed = new EmbedBuilder()
            .setDescription(`Ping: \`${ping}ms\` 🚀 `)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: "png", forceStatic: false })
            })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};
