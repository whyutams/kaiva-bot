const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const truths = [
    "Apa rahasia terbesar yang belum pernah kamu ceritakan ke siapa pun?",
    "Siapa orang yang pernah kamu sukai diam-diam?",
    "Pernah curang dalam suatu game atau ujian?",
    "Kalau kamu bisa menjadi orang lain selama sehari, siapa itu dan kenapa?",
    "Apa kebiasaan aneh yang kamu miliki di rumah?",
    "Kalau kamu bisa menghapus satu ingatan, apa itu?",
    "Siapa orang terakhir yang kamu stalk di media sosial?",
    "Pernah bohong ke teman dekat? Tentang apa?",
    "Apa hal paling memalukan yang pernah terjadi padamu?",
    "Kapan terakhir kali kamu menangis diam-diam?",
    "Siapa di server ini yang paling kamu ingin ajak jalan bareng?",
    "Apa mimpi teraneh yang pernah kamu alami?",
    "Kamu pernah suka dengan seseorang yang sudah punya pacar?",
    "Hal paling random yang kamu cari di Google?",
    "Pernah tidur di kelas atau saat meeting?",
    "Apa ketakutan terbesarmu dalam hidup?",
    "Siapa teman yang paling kamu percaya saat ini?",
    "Kapan terakhir kali kamu bohong?",
    "Apa kamu pernah pura-pura sakit supaya gak ikut sekolah/kuliah?",
    "Kebohongan terbesar yang pernah kamu buat?",
    "Pernah suka sama guru atau dosen?",
    "Kalau kamu bisa menyembunyikan satu kejadian, apa itu?",
    "Kamu lebih sering jadi tukang ghosting atau korban ghosting?",
    "Siapa nama mantan yang tidak bisa kamu lupakan?",
    "Pernah cemburu sama teman sendiri? Kenapa?",
    "Kalau hidupmu film, judulnya apa?",
    "Apa bagian tubuh yang paling kamu sukai dari dirimu sendiri?",
    "Kalau kamu bisa menghindari satu tanggung jawab selamanya, itu apa?",
    "Pernah suka sama orang di Discord?",
    "Siapa yang paling sering bikin kamu kesal di server ini?",
    "Pernah stalking mantan sampai sekarang?",
    "Hal paling childish yang masih kamu lakukan?",
    "Pernah jatuh cinta dengan sahabat sendiri?",
    "Hal memalukan yang pernah kamu lakukan di depan gebetan?",
    "Kamu pernah menangis karena hal sepele? Ceritakan!",
    "Siapa yang paling kamu kangenin sekarang?",
    "Apa hal paling bodoh yang pernah kamu lakukan saat marah?",
    "Kamu percaya cinta pada pandangan pertama?",
    "Apa chat terakhir yang kamu hapus dari seseorang?",
    "Pernah mengirim pesan ke orang yang salah?",
    "Hal yang kamu harap tidak pernah kamu ucapkan ke seseorang?",
    "Kamu lebih suka dicintai atau mencintai?",
    "Pernah menyimpan perasaan lebih dari 1 tahun?",
    "Apa nama kontak paling aneh di HP-mu?",
    "Pernah diselingkuhi atau menyelingkuhi?",
    "Kalau kamu punya kesempatan balikan sama mantan, kamu mau?",
    "Siapa orang yang paling kamu rindukan tapi tak bisa kamu hubungi lagi?",
    "Hal apa yang tidak kamu ceritakan ke orang tuamu?",
    "Apa kamu pernah naksir teman online tapi tidak pernah bilang?",
    "Kalau kamu bisa mengulang satu hari, hari apa itu dan kenapa?"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('truth')
        .setDescription('Dapatkan pertanyaan Truth secara acak!'),

    async execute(interaction) {
        const pertanyaan = truths[Math.floor(Math.random() * truths.length)];

        const embed = new EmbedBuilder()
            .setTitle('Truth')
            .setDescription(pertanyaan)
            .setColor(interaction.client.mainColor)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: false })
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
