const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Buat polling dengan reaksi 👎🏻 dan 👍🏻')
        .addStringOption(option =>
            option.setName('pertanyaan')
                .setDescription('Apa yang ingin kamu tanyakan?')
                .setRequired(true)
        ),

    async execute(interaction) {
        const pertanyaan = interaction.options.getString('pertanyaan');

        const embed = new EmbedBuilder()
            .setTitle('Polling')
            .setDescription(pertanyaan)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp();

        const pollMessage = await interaction.reply({ embeds: [embed], fetchReply: true });

        try {
            await pollMessage.react('👍🏻');
            await pollMessage.react('👎🏻');
        } catch (err) {
            console.error("Gagal menambahkan reaksi:", err);
        }
    }
};
