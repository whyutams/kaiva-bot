const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Kirim pesan biasa sebagai bot')
        .addStringOption(option =>
            option.setName('pesan')
                .setDescription('Teks yang akan dikirim')
                .setRequired(true)
        ),

    async execute(interaction) {
        const pesan = interaction.options.getString('pesan');
 
        await interaction.reply({ content: '✅ Pesan terkirim.', ephemeral: true });
 
        await interaction.channel.sendTyping();
        await new Promise(resolve => setTimeout(resolve, 1500)); 
 
        await interaction.channel.send(pesan);
    }
};
