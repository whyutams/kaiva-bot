const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emoji-info')
        .setDescription('Menampilkan informasi tentang emoji custom')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('Emoji custom dari server (example: :emoji:)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const raw = interaction.options.getString('emoji');

        const regex = /<a?:([a-zA-Z0-9_]+):(\d+)>/;
        const match = raw.match(regex);

        if (!match) {
            return interaction.reply({ content: '❌ Emoji tidak valid.', ephemeral: true });
        }

        const [, name, id] = match;
        const isAnimated = raw.startsWith('<a');
        const url = `https://cdn.discordapp.com/emojis/${id}.${isAnimated ? 'gif' : 'png'}`;

        const embed = new EmbedBuilder()
            .setTitle(`Emoji Info`)
            .setThumbnail(url)
            .addFields(
                { name: 'ID', value: id, inline: true },
                { name: 'Nama', value: name, inline: true },
                { name: 'Tipe', value: isAnimated ? 'Animasi (GIF)' : 'Static (PNG)', inline: true },
                { name: 'Link', value: url, inline: false }
            )
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp()

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Lihat Emoji')
                    .setStyle(ButtonStyle.Link)
                    .setURL(url)
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
