require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = async (client_id, guild_id = null, registration_type = 2) => {
    const commands = [];

    const commandFiles = fs.readdirSync(path.join(__dirname, '../slashCommands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../slashCommands/${file}`);
        if ('data' in command) {
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

    try {
        console.log(`[Kaiva] Mendaftarkan ${commands.length} slash command...`);
        await rest.put(
            registration_type === 2
                ? Routes.applicationGuildCommands(client_id, guild_id)
                : Routes.applicationCommands(client_id),
            { body: commands }
        );
        
        console.log(`[Kaiva] Berhasil registrasi command ${registration_type === 2 ? 'per-guild' : 'secara global'}`);
    } catch (err) {
        console.error(`[Kaiva] Gagal registrasi command:`, err);
    }
};
