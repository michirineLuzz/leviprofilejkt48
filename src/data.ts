/* ─── Member data – ganti URL foto nanti ─── */
export const MEMBER = {
    firstName: "Michelle",
    lastName: "Levia",
    nameJP: "ミシェル・レヴィア",
    generation: "12th Generation",
    team: "Team Passion",
    joinDate: "18 November 2023",
    birthdate: "Januari 24, 2009",
    birthplace: "Tangerang, Banten, Indonesia",
    bloodType: "O",
    zodiac: "Aquarius",
    height: "170 cm",
    hobbies: "Merakit Gundam, Menonton Anime",
    talent: "Menari, Modeling",
    catchphrase: "Are you ready? Jalani hari ini dengan menari bersamaku! Yuhu, aku Levi",
    bio1: "Michelle Levia, atau yang akrab dipanggil Levi, adalah anggota JKT48 Generasi 12 yang diperkenalkan pada tahun 2023. Sebelum bergabung dengan JKT48, gadis asal Tangerang ini sudah sangat aktif di dunia modeling dan menari.",
    bio2: "Dengan kepribadian yang ceria dan energik, Levi sukses memikat banyak penggemar. Di usianya yang masih muda, kegigihannya yang menjadikannya bersinar terang menari di atas panggung bersama member lainnya.",
    // ← Ganti URL foto nanti
    heroImg: "https://pbs.twimg.com/media/HCYcMwjaMAAhN_f?format=jpg&name=medium",
    bioImg: "https://pbs.twimg.com/media/HDRifEMakAA3Yop?format=jpg&name=medium",
    social: {
        instagram: "https://instagram.com/jkt48.levi",
        tiktok: "https://tiktok.com/@jkt48.levi",
        x: "https://x.com/Levi_JKT48",
        youtube: "https://youtube.com/@jkt48",
    },
};

export const STATS = [
    { label: "Tanggal Lahir", value: MEMBER.birthdate },
    { label: "Tanggal Masuk", value: MEMBER.joinDate },
    { label: "Asal", value: MEMBER.birthplace },
    { label: "Golongan Darah", value: MEMBER.bloodType },
    { label: "Tinggi", value: MEMBER.height },
    { label: "Zodiak", value: MEMBER.zodiac },
    { label: "Hobi", value: MEMBER.hobbies },
    { label: "Bakat", value: MEMBER.talent },
    { label: "Team", value: MEMBER.team },
];

// ← Ganti URL galeri nanti
export const GALLERY: { src: string; label: string }[] = [
    { src: "https://pbs.twimg.com/media/HAdLcz3bQAE_YMs?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/HAE5170bIAAXkot?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G_4KRTZbkAA5Nzd?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G_qtd_UbEAE1Ffz?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G_XUf9DWYAAPfjG?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G_WoeX3bAAMXb6L?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G_UUfYcWIAAIY14?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G_LdzQYWoAAfUIO?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G-8dprFWUAAbmPn?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G-8LZRYXcAASWQm?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G-2mxV-bQAAuehQ?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G-ydKANboAAEHlD?format=jpg&name=medium", label: "Foto Levi" },
    { src: "https://pbs.twimg.com/media/G-yMDW9bYAAr7HQ?format=jpg&name=medium", label: "Foto Levi" },

];

export const MEDIA_ITEMS: {
    type: 'video' | 'article';
    title: string;
    source: string;
    date: string;
    thumb: string;
    url: string;
}[] = [
        {
            type: 'video',
            title: 'JKT48 12th Generation Profile: Levi',
            source: 'YouTube',
            date: 'Des 2023',
            thumb: 'https://img.youtube.com/vi/keCoUnUnrCk/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=keCoUnUnrCk'
        },
        {
            type: 'video',
            title: '[MV] Belalang yang Membangkang - JKT48 Trainee',
            source: 'YouTube',
            date: 'Agt 2024',
            thumb: 'https://img.youtube.com/vi/Ztg79dr34n4/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=Ztg79dr34n4'
        },
        {
            type: 'video',
            title: 'Michelle Levia (Trainee) - Pemilihan Member Single ke-26 JKT48',
            source: 'YouTube',
            date: 'Sep 2024',
            thumb: 'https://img.youtube.com/vi/IWhHu1gdyUg/hqdefault.jpg',
            url: 'https://www.youtube.com/watch?v=IWhHu1gdyUg'
        },
        {
            type: 'video',
            title: 'Breakfast Time with Levi',
            source: 'YouTube',
            date: 'Okt 2024',
            thumb: 'https://img.youtube.com/vi/qJ_UQqI95q0/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=qJ_UQqI95q0'
        },
        {
            type: 'video',
            title: 'LIVE JKT48! Gracie JKT48 dan Levi JKT48 Ternyata Jago Bikin Jus Buah',
            source: 'YouTube',
            date: '5 Nov 2024',
            thumb: 'https://img.youtube.com/vi/fY-fWRT01I0/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=fY-fWRT01I0'
        },
        {
            type: 'video',
            title: 'TEMEN MAKAN JKT48 - Michie JKT48 vs Levi JKT48',
            source: 'YouTube',
            date: '14 Jan 2025',
            thumb: 'https://img.youtube.com/vi/Iq9LPnOS_vQ/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=Iq9LPnOS_vQ'
        },
        {
            type: 'video',
            title: '[SAHUR BOWL] Ini Dia Tradisi Ngabuburit!',
            source: 'YouTube',
            date: 'Maret 2025',
            thumb: 'https://img.youtube.com/vi/_CP3TcvshsI/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=_CP3TcvshsI'
        },
        {
            type: 'video',
            title: 'TEMEN NGOBROL EP.3: Secret Code Showdown | Levi JKT48 vs Mikaela JKT48',
            source: 'YouTube',
            date: '15 Jul 2025',
            thumb: 'https://img.youtube.com/vi/UoGyDGzCgyk/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=UoGyDGzCgyk'
        },
        {
            type: 'video',
            title: 'JKT48 OFC Event - Good Luck, Have Fun! (Fun Shooting Competition with JKT48)',
            source: 'YouTube',
            date: '10 Okt 2025',
            thumb: 'https://img.youtube.com/vi/G23wXCze0_k/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=G23wXCze0_k'
        },
        {
            type: 'video',
            title: 'JALAN-JALAN DI THAILAND!',
            source: 'YouTube',
            date: '24 Feb 2026',
            thumb: 'https://img.youtube.com/vi/cEoViMtH1bQ/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=cEoViMtH1bQ'
        },
        {
            type: 'video',
            title: '[WARTAK S2] PLUS-MINUS PUNYA TUBUH TINGGI',
            source: 'YouTube',
            date: '4 Mar 2026',
            thumb: 'https://img.youtube.com/vi/7szpVKg2aN4/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=7szpVKg2aN4'
        },
    ];

export const SCHEDULE_ITEMS: {
    date: string;
    day: string;
    title: string;
    type: string;
    time: string;
    location: string;
    note?: string;
    url?: string;
}[] = [
    ];
