const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Cocokkan dua user dan lihat persentase cintanya!')
        .addUserOption(option =>
            option.setName('user1')
                .setDescription('User pertama')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user2')
                .setDescription('User kedua')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        const percent = Math.floor(Math.random() * 101);
        let emoji = '💔';
        if (percent > 70) emoji = '💖';
        else if (percent > 40) emoji = '❤️';
        else if (percent > 20) emoji = '🧡';

        const barFilled = Math.floor(percent / 10);
        const bar = '█'.repeat(barFilled) + '░'.repeat(10 - barFilled);

        const embed = new EmbedBuilder()
            .setTitle('Ship Meter')
            .setDescription(`${user1} ❤️ ${user2}`)
            .addFields(
                { name: 'Persentase Cocok', value: `${percent}% ${emoji}`, inline: false },
                { name: 'Kecocokan', value: `\`${bar}\``, inline: false }
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
