console.clear();
require('dotenv').config();
const djs = require('discord.js');
const path = require('path');
const fs = require('fs');

const client = new djs.Client({
    intents: [
        djs.IntentsBitField.Flags.Guilds,
        djs.IntentsBitField.Flags.GuildMembers,
        djs.IntentsBitField.Flags.GuildMessages,
        djs.IntentsBitField.Flags.MessageContent,
    ],
});

client.mainColor = "#4a67f7";
client.botVersion = require('../package.json').version;
client.slashCommands = new djs.Collection();
client.slashCommandsJSON = [];
client.snipes = new Map();
client.afkUsers = new djs.Collection();
if(process.env.SUPPORT_WEB) client.inviteUrl = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=139586956352&redirect_uri=${process.env.SUPPORT_WEB}/thank-you`;
else client.inviteUrl = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=139586956352`;

const rcmd = require('./util/register-commands');
const commandFiles = fs.readdirSync(path.join(__dirname, './slashCommands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./slashCommands/${file}`);

    if (command.data && command.execute) {
        client.slashCommands.set(command.data.name, command);
    } else {
        console.warn(`[WARN] File ${file} tidak memiliki struktur slash command yang valid.`);
    }

    if ('data' in command) {
        client.slashCommandsJSON.push(command.data.toJSON());
    }
}

client.on("ready", () => {
    if (process.env.REGISTER_COMMANDS === "1") {
        let REGISTRATION_COMMANDS_TYPE = parseInt(process.env.REGISTRATION_COMMANDS_TYPE || "2");

        if (REGISTRATION_COMMANDS_TYPE === 1) {
            rcmd(client.user.id, null, REGISTRATION_COMMANDS_TYPE).catch(console.error);
        } else if (REGISTRATION_COMMANDS_TYPE === 2) {
            client.guilds.cache.forEach(g => {
                rcmd(client.user.id, g.id, REGISTRATION_COMMANDS_TYPE).catch(console.error);
            });
        }
    }

    console.log("Kaiva is online!");

    let isFirstSetStatus = true;
    setInterval(() => {
        const server_size = client.guilds.cache.size;

        let activity_name = `${server_size} ${server_size > 1 ? 'servers' : 'server'}`;
        let activity_type = djs.ActivityType.Listening;

        client.user.setActivity({
            name: activity_name,
            type: activity_type
        });

        if (isFirstSetStatus) {
            isFirstSetStatus = false;
            console.log(`Status di-set: \"${activity_name}\" (type: ${activity_type.toString().toUpperCase()})`);
        }
    }, 60000);
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.user.bot || !interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(`❌ Error saat menjalankan command /${interaction.commandName}`, err);
        await interaction.reply({ content: '⚠️ Terjadi kesalahan saat menjalankan command.', ephemeral: true });
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const client = message.client;

    if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
        const embed = new djs.EmbedBuilder()
            .setDescription(`Ketik \`/help\` untuk melihat daftar commands.`)
            .setColor(client.mainColor)
            .setTimestamp();

        message.channel.send({
            embeds: [embed]
        }).catch(e => { });
    }

    if (client.afkUsers.has(message.author.id)) {
        client.afkUsers.delete(message.author.id);
        message.reply({
            content: `Selamat datang kembali, **${message.author.username}**, kamu tidak lagi AFK.`,
            allowedMentions: { repliedUser: false }
        }).then(msg => {
            setTimeout(() => {
                msg.delete().catch(e => { });
            }, 3000);
        });
    }

    message.mentions.users.forEach((user) => {
        const afk = client.afkUsers.get(user.id);
        if (afk) {
            message.reply({
                content: `**${user.username}** sedang AFK: *${afk.reason}*`,
                allowedMentions: { repliedUser: false }
            });
        }
    });
});

client.on("messageDelete", (message) => {
    if (message.partial || !message.content || message.author.bot) return;
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        createdAt: message.createdAt
    });
});

client.on("error", (err) => {
    console.error("🛑 Terjadi kesalahan:", err);
});

client.login(process.env.TOKEN);
setTimeout(() => { require("./server/app")(client) }, 3000);