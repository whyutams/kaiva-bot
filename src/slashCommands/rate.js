const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rate')
        .setDescription('Bot akan memberikan nilai persentase terhadap sesuatu')
        .addStringOption(option =>
            option.setName('tentang')
                .setDescription('Apa yang ingin dinilai?')
                .setRequired(true)
        ),

    async execute(interaction) {
        const tentang = interaction.options.getString('tentang');
        const nilai = Math.floor(Math.random() * 101); // 0 - 100%

        const embed = new EmbedBuilder()
            .setTitle('Rate')
            .setDescription(`Aku memberi nilai **${nilai}%** untuk **${tentang}**!`)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
