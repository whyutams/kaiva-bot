require('dotenv').config();
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const server = express();
const sitemap = require('express-sitemap')();
// const session = require('express-session');


/* SERVER APP */
server.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for testing
}));
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static(__dirname));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
// sitemap.generate(server);

// server.use(session({
//     secret: 'supersecretkey',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));

module.exports = async (client) => {
    let owner = null;

    server.get("/", async (req, res) => {
        if (owner === null) {
            try {
                owner = await client.users.fetch(process.env.DEVELOPER_ID);
            } catch (e) {
                console.error("Gagal fetch developer:", e);
            }
        }

        res.render("index", {
            is_commands_page: false,
            id: client.user.id,
            username: client.user.username,
            avatar: await require('../util/imageUrlToBase64')(client.user.displayAvatarURL({ extension: 'png', forceStatic: false })),
            avatar_hd: await require('../util/imageUrlToBase64')(client.user.displayAvatarURL({ extension: 'png', forceStatic: false, size: 2048 })),
            server_count: client.guilds.cache.size,
            user_count: client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 100),
            version: client.botVersion,
            developer: {
                id: owner?.id,
                username: owner?.username,
                avatar: await require('../util/imageUrlToBase64')(owner?.displayAvatarURL({ extension: 'png', forceStatic: false })),
                avatar_hd: await require('../util/imageUrlToBase64')(owner?.displayAvatarURL({ extension: 'png', forceStatic: false, size: 2048 })),
            },
            slash_commands: client.slashCommandsJSON,
            invite_url: client.inviteUrl,
        });
    });

    server.get("/commands", async (req, res) => {
        if (owner === null) {
            try {
                owner = await client.users.fetch(process.env.DEVELOPER_ID);
            } catch (e) {
                console.error("Gagal fetch developer:", e);
            }
        }

        res.render("commands", {
            is_commands_page: true,
            id: client.user.id,
            username: client.user.username,
            avatar: await require('../util/imageUrlToBase64')(client.user.displayAvatarURL({ extension: 'png', forceStatic: false })),
            avatar_hd: await require('../util/imageUrlToBase64')(client.user.displayAvatarURL({ extension: 'png', forceStatic: false, size: 2048 })),
            server_count: client.guilds.cache.size,
            user_count: client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 100),
            version: client.botVersion,
            developer: {
                id: owner?.id,
                username: owner?.username,
                avatar: await require('../util/imageUrlToBase64')(owner?.displayAvatarURL({ extension: 'png', forceStatic: false })),
                avatar_hd: await require('../util/imageUrlToBase64')(owner?.displayAvatarURL({ extension: 'png', forceStatic: false, size: 2048 })),
            },
            slash_commands: client.slashCommandsJSON,
            invite_url: client.inviteUrl,
        });
    });

    server.get("/test", async (req, res) => {
        res.json({
            status: 200,
            message: "OK!"
        });
    });

    server.get('/avatar', async (req, res) => {
        try {
            res.redirect(client.user.displayAvatarURL({ extension: 'png', forceStatic: false, size: 2048 }));
        } catch (e) {
            console.error(e);
            res.status(500).send('Gagal memuat avatar');
        }
    });
    

    let port = process.env.PORT || 4000;
    server.listen(port, () => {
        console.log(`Server dengan port: ${port} dijalankan.`);
    });
};
