const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
require('moment/locale/id');
moment.locale('id');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Menampilkan informasi tentang user tertentu')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User yang ingin dilihat informasinya')
                .setRequired(false)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember('user') || interaction.member;
        const user = member.user;

        const displayName = member.displayName || user.username;
        const createdAt = moment(user.createdAt).format('dddd, D MMMM YYYY');
        const joinedAt = member.joinedAt ? moment(member.joinedAt).format('dddd, D MMMM YYYY') : 'Tidak diketahui';

        const embed = new EmbedBuilder()
            .setTitle(`User Info`)
            .setThumbnail(user.displayAvatarURL({ extension: 'png', forceStatic: false }))
            .addFields(
                { name: 'Display Name', value: displayName, inline: true },
                { name: 'Username', value: user.username, inline: true },
                { name: 'User ID', value: user.id, inline: true },
                { name: 'Akun Dibuat', value: createdAt, inline: false },
                { name: 'Bergabung Pada', value: joinedAt, inline: false },
                { name: 'Bot?', value: user.bot ? 'Ya' : 'Bukan', inline: true }
            )
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
};
