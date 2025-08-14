const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const dares = [
    "Ubah nickname-mu menjadi 'Aku Butuh Cinta' selama 10 menit.",
    "Tag seseorang secara random dan ucapkan 'Aku sayang kamu'.",
    "Kirim emoji favoritmu sebanyak 10 kali berturut-turut di chat.",
    "Ketikkan semua huruf vokal secara acak dalam 1 pesan.",
    "Ganti status Discord-mu menjadi 'Aku habis nanges'.",
    "Ketikkan alfabet dari Z ke A tanpa kesalahan.",
    "Buat pantun gombal spontan dan kirim di channel ini.",
    "Tiru gaya bicara karakter anime favoritmu di VC (jika berani).",
    "Kirim pesan ke DM teman dan bilang kamu mimpiin dia.",
    "Tulis puisi sedih tentang mie instan dan kirimkan di chat.",
    "Gunakan CAPS LOCK untuk semua pesanmu selama 5 menit.",
    "Ganti avatar-mu jadi gambar bebek selama 1 jam.",
    "Berikan pujian berlebihan ke orang di atasmu dalam chat.",
    "Screenshot riwayat pencarian browser-mu.",
    "Buat kalimat dari 3 kata random yang diketik orang lain.",
    "Ketik satu kalimat jujur yang memalukan tentang dirimu.",
    "Ajak orang random main truth or dare di DM.",
    "Ceritakan mimpi aneh terakhir yang kamu ingat.",
    "Ketikkan nama crush-mu dengan huruf terbalik.",
    "Kirim pesan suara kamu menyanyi lagu anak-anak (kalau berani!).",
    "Pura-pura jadi bot selama 5 menit, balas semua dengan 'beep'.",
    "Kirim stiker cringe di 3 server berbeda.",
    "Salin dan kirim pesan terakhir orang lain di channel ini.",
    "Ketik 'AKU SEDIH' tiap 30 detik selama 3 menit.",
    "Tanyakan ke orang di bawahmu apakah dia sayang kamu.",
    "Tulis kisah horor 2 kalimat yang bisa buat merinding.",
    "Gunakan emoji 😭 di semua pesanmu selama 10 menit.",
    "Ketik kalimat acak yang tidak masuk akal dan kirim ke 3 orang.",
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dare')
        .setDescription('Dapatkan tantangan Dare secara acak!'),

    async execute(interaction) {
        const challenge = dares[Math.floor(Math.random() * dares.length)];

        const embed = new EmbedBuilder()
            .setTitle('Dare')
            .setDescription(challenge)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
