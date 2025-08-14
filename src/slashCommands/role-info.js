const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
require('moment/locale/id');
moment.locale('id');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-info')
        .setDescription('Menampilkan informasi tentang role')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Role yang ingin dilihat informasinya')
                .setRequired(true)
        ),

    async execute(interaction) {
        const role = interaction.options.getRole('role');
        const createdAt = moment(role.createdAt).format('dddd, D MMMM YYYY');

        const embed = new EmbedBuilder()
            .setTitle(`Role Info`)
            .setDescription(`${role}`)
            .addFields(
                { name: 'ID', value: role.id, inline: true },
                { name: 'Nama Role', value: role.name, inline: true },
                { name: 'Warna Hex', value: role.hexColor.toUpperCase(), inline: true },
                { name: 'Posisi', value: role.position.toString(), inline: true },
                { name: 'Anggota', value: role.members.size.toString(), inline: true },
                { name: 'Mentionable', value: role.mentionable ? 'Ya' : 'Tidak', inline: true },
                { name: 'Hoisted', value: role.hoist ? 'Ya' : 'Tidak', inline: true },
                { name: 'Dibuat pada', value: createdAt, inline: false }
            )
            .setColor(role.color || interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            });

        await interaction.reply({ embeds: [embed] });
    }
};
