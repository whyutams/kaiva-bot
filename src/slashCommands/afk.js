const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Menandai kamu sebagai AFK')
        .addStringOption(option =>
            option.setName('alasan')
                .setDescription('Alasan kamu AFK')
                .setRequired(false)
        ),

    async execute(interaction) {
        const reason = interaction.options.getString('alasan') || 'Tidak ada alasan.';
        const userId = interaction.user.id;

        interaction.client.afkUsers.set(userId, {
            reason,
            timestamp: Date.now(),
            tag: interaction.user.username
        });

        await interaction.reply({
            content: `${interaction.user.username} sekarang AFK: ${reason}`,
            ephemeral: false
        });
    }
};
