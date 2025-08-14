const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say-embed')
        .setDescription('Kirim pesan sebagai bot dalam embed')
        .addStringOption(option =>
            option.setName('pesan')
                .setDescription('Teks yang akan dikirim')
                .setRequired(true)
        ),

    async execute(interaction) {
        const pesan = interaction.options.getString('pesan');

        const embed = new EmbedBuilder()
            .setDescription(pesan)
            .setColor(interaction.client.mainColor) 

        await interaction.reply({ embeds: [embed] });
    }
};
