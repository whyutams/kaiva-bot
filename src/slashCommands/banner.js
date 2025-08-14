const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Menampilkan banner user (jika ada)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User yang ingin dilihat bannernya')
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        const fetchedUser = await interaction.client.users.fetch(user.id, { force: true });

        if (!fetchedUser.banner) {
            return interaction.reply({
                content: `❌ User **${user.username}** tidak memiliki banner.`,
                ephemeral: true
            });
        }

        const bannerUrl = fetchedUser.bannerURL({ size: 1024 });

        const embed = new EmbedBuilder()
            .setTitle(`🖼️ Banner ${fetchedUser.globalName || fetchedUser.username}`)
            .setAuthor({ name: fetchedUser.username, iconURL: fetchedUser.displayAvatarURL({ extension: "png", forceStatic: false }) })
            .setImage(bannerUrl)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ extension: "png", forceStatic: false })
            })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};
