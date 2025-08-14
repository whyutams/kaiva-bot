const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Memberikan link untuk mengundang Kaiva ke server lain'),

    async execute(interaction) {
        const clientId = interaction.client.user.id;

        const embed = new EmbedBuilder()
            .setTitle('Invite Kaiva')
            .setDescription(`Kamu bisa mengundang **Kaiva** ke server lain dengan tombol di bawah ini😉`)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: "png", forceStatic: false })
            });

        const button = new ButtonBuilder()
            .setLabel('🔗 Invite')
            .setStyle(ButtonStyle.Link)
            .setURL(interaction.client.inviteUrl);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    }
};
