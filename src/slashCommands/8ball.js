const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Bola ajaib akan menjawab pertanyaanmu!')
        .addStringOption(option =>
            option.setName('pertanyaan')
                .setDescription('Pertanyaan yang ingin kamu ajukan')
                .setRequired(true)
        ),

    async execute(interaction) {
        const pertanyaan = interaction.options.getString('pertanyaan');

        const jawaban = [
            'Ya',
            'Tidak',
            'Mungkin',
            'Tentu saja',
            'Aku ragu...',
            'Tidak bisa dipastikan',
            'Coba lagi nanti',
            'Sudah pasti',
            'Tidak akan terjadi',
            'Kelihatannya iya',
        ];

        const respon = jawaban[Math.floor(Math.random() * jawaban.length)];

        const embed = new EmbedBuilder()
            .setTitle('Magic 8-Ball 🎱')
            .addFields(
                { name: 'Pertanyaan', value: pertanyaan.slice(0, 1048), inline: false },
                { name: 'Jawaban', value: respon, inline: false }
            )
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
