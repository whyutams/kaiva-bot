const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const moment = require('moment');
require('moment/locale/id');
moment.locale('id');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-info')
        .setDescription('Menampilkan informasi tentang bot'),

    async execute(interaction) {
        const botUser = interaction.client.user;
        const uptime = moment.duration(interaction.client.uptime);
        const createdAt = moment(botUser.createdAt).format('dddd, D MMMM YYYY');
        const jumlahServer = interaction.client.guilds.cache.size;
        const jumlahSlashCommands = interaction.client.slashCommands.size;

        let owner;
        try {
            owner = await interaction.client.users.fetch(process.env.DEVELOPER_ID);
            console.log(owner.username);
        } catch (e) {
            console.error("Gagal fetch developer:", e);
        }

        const embed = new EmbedBuilder()
            .setTitle('Bot Info')
            .setThumbnail(botUser.displayAvatarURL({ extension: "png", forceStatic: false }))
            .addFields(
                { name: 'Username', value: botUser.username, inline: true },
                { name: 'ID', value: botUser.id, inline: true },
                { name: 'Versi', value: "v" + interaction.client.botVersion || 'Tidak diketahui', inline: true },
                { name: 'Jumlah Server', value: `${jumlahServer} ${jumlahServer > 1 ? "servers" : "server"}`, inline: true },
                { name: 'Jumlah Command', value: `Slash commands: ${jumlahSlashCommands}`, inline: true },
                { name: 'Dibuat Pada', value: createdAt, inline: true },
                { name: 'Uptime', value: `${uptime.days()} hari, ${uptime.hours()} jam, ${uptime.minutes()} menit`, inline: true },
                { name: 'Node.js', value: process.version, inline: true },
                { name: 'Discord.js', value: "v" + require('discord.js').version, inline: true },
            )
        if (owner?.username !== undefined) {
            embed.addFields(
                { name: 'Developer', value: owner.username, inline: true },
            )
        }
        embed.setColor(interaction.client.mainColor)
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ extension: "png", forceStatic: false })
            })
            .setTimestamp()

        if (process.env.SUPPORT_WEB) {
            const button = new ButtonBuilder()
                .setLabel('🔗 Support Web')
                .setStyle(ButtonStyle.Link)
                .setURL(process.env.SUPPORT_WEB);

            const row = new ActionRowBuilder().addComponents(button);

            await interaction.reply({
                embeds: [embed],
                components: [row],
            });
        } else {
            await interaction.reply({
                embeds: [embed]
            });
        }
    }
};
