const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Menampilkan avatar user tertentu')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User yang ingin dilihat avatarnya')
                .setRequired(false)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember('user') || interaction.member;
        const user = member.user;

        const avatarUrl = user.displayAvatarURL({
            size: 1024,
            extension: 'png',
            forceStatic: false
        });

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: avatarUrl })
            .setImage(avatarUrl)
            .setURL(avatarUrl)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            }).setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};
