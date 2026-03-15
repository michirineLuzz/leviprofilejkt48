import { motion } from 'motion/react';
import { useCmsResource } from '../hooks/useCmsResource';
import {
    ArrowRight,
    AudioLines,
    BadgeInfo,
    Cake,
    Clapperboard,
    Flag,
    Hash,
    Heart,
    ListMusic,
    MapPin,
    Rocket,
    Sparkles,
    Star,
    Theater,
    Users,
    Video,
} from 'lucide-react';
import { MEMBER, STATS } from '../data';
import { fetchHashtags, fetchShowMetrics, type HashtagItem, type ShowMetricItem } from '../lib/cms';

const HASHTAGS: HashtagItem[] = [
    { id: '1', tag: '#SobatSahur', color: 'var(--c-pink)', description: 'Tag untuk sahur', sort_order: 1 },
    { id: '2', tag: '#LeVriday', color: 'var(--c-purple)', description: 'Tag untuk hari Jumat', sort_order: 2 },
    { id: '3', tag: '#TakjilLevi', color: 'var(--c-blue)', description: 'Tag untuk berbuka puasa', sort_order: 3 },
    { id: '4', tag: '#NgewaroLevi', color: 'var(--c-yellow)', description: 'Tag untuk balas PM', sort_order: 4 },
    { id: '5', tag: '#LevReport', color: 'var(--c-emerald)', description: 'Tag untuk update aktivitas', sort_order: 5 },
    { id: '6', tag: '#PassiOnFire', color: 'var(--c-orange)', description: 'Tag untuk Team Passion', sort_order: 6 },
    { id: '7', tag: '#SobatYuhu', color: 'var(--c-cyan)', description: 'Tag untuk menyapa Levi di X', sort_order: 7 },
];

const SHOW_STATS: ShowMetricItem[] = [
    { id: 'total-show', label: 'Total Show', value: '77', color: 'var(--c-pink)', description: 'Penampilan di JKT48 Theater', sort_order: 1 },
    { id: 'setlist', label: 'Setlist Dilakukan', value: '6', color: 'var(--c-purple)', description: 'Berbagai setlist berbeda', sort_order: 2 },
    { id: 'senshuuraku', label: 'Senshuuraku', value: '2', color: 'var(--c-blue)', description: 'Show penutup setlist', sort_order: 3 },
    { id: 'shonichi', label: 'Shonichi', value: '5', color: 'var(--c-yellow)', description: 'Show perdana setlist baru', sort_order: 4 },
    { id: 'mv-terlibat', label: 'MV Terlibat', value: '1', color: 'var(--c-orange)', description: 'Music Video resmi', sort_order: 5 },
];

const FUN_FACTS = [
    { title: "Inspirasi Oshi", text: "Shani Indira (Gen 3) adalah oshi sekaligus role model Levi! Levi dulunya sempat tidak percaya diri, tapi melihat kesuksesan Shani yang juga punya keunikan sama, Levi pun berhasil menemukan kembali rasa PD-nya di depan kamera." },
    { title: "Maraton Anime", text: "Pecinta jejepangan sejati! Levi sangat menikmati anime seperti Jujutsu Kaisen, Attack on Titan, dan Tokyo Ghoul. Rekor tertingginya adalah menamatkan 5 season anime sekaligus hanya dalam waktu 3 hari saat era pandemi." },
    { title: "Si Tangan Kreatif", text: "Siapa sangka, Levi punya hobi merakit Gundam! Butuh ketelitian dan kesabaran ekstra buat menyusun part demi part sampai jadi robot yang keren." },
    { title: "Pemain ML", text: "Selain anime, Levi juga hobi main game online, terutama Mobile Legends." },
    { title: "Si Paling MTK", text: "Matematika justru menjadi mata pelajaran favorit Levi di sekolah." },
    { title: "Jiwa Rocker 90-an", text: "Selera musiknya tak disangka! Levi menyukai genre musik rock serta lagu-lagu nostalgia dari era tahun 90-an." },
    { title: "Kibby si Kucing", text: "Memiliki sebuah boneka kucing kesayangan yang selalu menemaninya, diberi nama 'Kibby' alias Kitten Chubby." },
    { title: "Fans Berat Kuromi", text: "Ia suka mengoleksi barang-barang tentang Kuromi." },
    { title: "Anak Robotik", text: "Ketertarikannya pada dunia robotik sudah ada sejak SD karena dianggap seru. Kerennya lagi, di umur 9 tahun (2018), Levi sempat adu kemampuan di lomba robotik tingkat nasional lho!" },
    { title: "Calon Anak IT", text: "Sejalan dengan passion robotiknya, ke depannya Levi memiliki cita-cita berkuliah mengambil jurusan komputer." },
    { title: "Mantan OSIS", text: "Punya jiwa sosial yang tinggi, sebelum banting setir menjadi trainee JKT48, Levi cukup aktif berperan sebagai anggota OSIS." },
    { title: "Le Viosa", text: "Fanbase resmi yang senantiasa mendukung perjalanan dan mimpi Levi dinamakan 'Le Viosa'." },
    { title: "#SobatYuhu", text: "Gunakan hashtag #SobatYuhu kalau kamu ingin menyapa atau ikutan nimbrung obrolan ceria Levi di aplikasi X (Twitter)." },
    { title: "Si Ramah", text: "Kata teman-teman Generasi 12, Levi adalah sosok yang gampang berbaur, luar biasa ramah, dan pastinya sangat murah senyum pada siapa saja!" },
];

const FEATURE_FACTS = [
    {
        icon: <Users style={{ width: 18, height: 18 }} />,
        label: 'Current Team',
        value: MEMBER.team,
        accent: 'var(--c-purple)',
    },
    {
        icon: <AudioLines style={{ width: 18, height: 18 }} />,
        label: 'Signature Mood',
        value: 'Ceria, manis, dan ekspresif di atas panggung.',
        accent: 'var(--c-pink)',
    },
];

const HERO_FACTS = FEATURE_FACTS;
const ESSENTIAL_STATS = STATS.slice(0, 4);
const DETAIL_STATS = STATS.slice(4);

const STORY_BEATS = [
    {
        year: '18 November 2023',
        title: 'Mulai Perjalanan di JKT48',
        text: 'Levi resmi diperkenalkan sebagai member Generasi 12 di Jak Japan Matsuri.',
        color: 'var(--c-pink)',
    },
    {
        year: '1 Maret 2024',
        title: 'Shonichi Ingin Bertemu',
        text: 'Debut setlist pertama Levi sebagai member JKT48 di JKT48 12th Generation.',
        color: 'var(--c-purple)',
    },
    {
        year: '20 April 2024',
        title: 'Shonichi Off Air Di Mukashi Fest.',
        text: 'Debut Off Air di Mukashi Fest.',
        color: 'var(--c-gray)',
    },
    {
        year: '11 Mei 2024',
        title: 'Shonichi 2S & MnG Di Spring Has Come',
        text: '2S & MnG Yang Pertama Kali Di Spring Has Come.',
        color: 'var(--c-orange)',
    },
    {
        year: '30 Mei 2024',
        title: 'Shonichi Pajama Drive',
        text: 'Debut setlist Pajama Drive di JKT48 Theater.',
        color: 'var(--c-blue)',
    },
    {
        year: '30 Mei 2024',
        title: 'Menjadi Center di Junjou Shugi',
        text: 'Center di lagu Junjou Shugi.',
        color: 'var(--c-yellow)',
    },
    {
        year: '25 Agustus 2024',
        title: 'MV Belalang Yang Membangkang',
        text: 'MV Pertama Di Belalang Yang Membangkang.',
        color: 'var(--c-sunflower)',
    },
    {
        year: '30 Agustus 2024',
        title: 'Shonichi Aturan Anti Cinta',
        text: 'Debut setlist Aturan Anti Cinta di JKT48 Theater.',
        color: 'var(--c-emerald)',
    },
    {
        year: '30 Agustus 2024',
        title: 'Partisipasi Sousenkyo 2024',
        text: 'Mengikuti Sousenkyo Pada Tahun 2024.',
        color: 'var(--c-wisteria)',
    },
    {
        year: '25 Oktober 2025',
        title: 'Pengumuman Promosi Ke Member Inti',
        text: 'Promosi Ke Member Inti.',
        color: 'var(--c-peterriver)',
    },
    {
        year: '4 Desember 2025',
        title: 'Shonichi Kira-Kira Girls',
        text: 'Debut Kira-Kira Girls di JKT48 Theater.',
        color: 'var(--c-pink)',
    },
    {
        year: '12 Desember 2025',
        title: 'Senshuuraku Aitakatta',
        text: 'Senshuuraku Aitakatta di JKT48 Theater.',
        color: 'var(--c-purple)',
    },
    {
        year: '28 Desember 2025',
        title: 'Senshuuraku Kira-Kira Girls',
        text: 'Senshuuraku Kira-Kira Girls di JKT48 Theater.',
        color: 'var(--c-blue)',
    },
    {
        year: '10 Januari 2026',
        title: 'Shonichi Te wo Tsunaginagara',
        text: 'Debut Te wo Tsunaginagara di JKT48 Theater.',
        color: 'var(--c-yellow)',
    },
    {
        year: '01 Februari 2026',
        title: 'Shonichi Ramune no Nomikata',
        text: 'Debut Ramune no Nomikata di JKT48 Theater.',
        color: 'var(--c-wisteria)',
    },
];

const COLORS = ['var(--c-pink)', 'var(--c-purple)', 'var(--c-blue)', 'var(--c-yellow)', 'var(--c-gray)', 'var(--c-emerald)', 'var(--c-cyan)', 'var(--c-orange)', 'var(--c-lime)', 'var(--c-sunflower)', 'var(--c-wisteria)', 'var(--c-peterriver)'];
const SECTION_STAGGER = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const ITEM_REVEAL = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
};

export default function About() {
    const { data: hashtags } = useCmsResource<HashtagItem[]>(fetchHashtags, HASHTAGS, []);
    const { data: showStats } = useCmsResource<ShowMetricItem[]>(fetchShowMetrics, SHOW_STATS, []);

    return (
        <main style={{ minHeight: '100vh', paddingBottom: '6rem', overflow: 'hidden' }}>
            <section
                style={{
                    paddingTop: '8rem',
                    paddingBottom: '4rem',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: '6rem auto auto -8rem',
                        width: '20rem',
                        height: '20rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(255,94,151,0.28) 0%, rgba(255,94,151,0) 72%)',
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '3rem',
                        right: '-5rem',
                        width: '24rem',
                        height: '24rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(90,194,255,0.24) 0%, rgba(90,194,255,0) 70%)',
                    }}
                />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div
                        className="about-hero-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)',
                            gap: '2rem',
                            alignItems: 'stretch',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="card-bubbly"
                            style={{
                                background: 'linear-gradient(145deg, #fff8fb 0%, #fff5d7 100%)',
                                boxShadow: '12px 12px 0px var(--c-pink-light)',
                                padding: '2.5rem',
                            }}
                        >
                            <motion.div
                                variants={SECTION_STAGGER}
                                initial="hidden"
                                animate="show"
                                style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}
                            >
                                <motion.span aria-label="Profile Folder" variants={ITEM_REVEAL} className="pill pill-purple">
                                    <Sparkles aria-hidden="true" style={{ width: 14, height: 14 }} /> Profile File
                                </motion.span>
                                <motion.span aria-label={`Generation: ${MEMBER.generation}`} variants={ITEM_REVEAL} className="pill" style={{ background: 'var(--c-yellow)' }}>
                                    <Star aria-hidden="true" style={{ width: 14, height: 14 }} /> {MEMBER.generation}
                                </motion.span>
                            </motion.div>

                            <p className="subhead" style={{ marginBottom: '0.75rem' }}>About</p>
                            <h1 className="head title-stroke" style={{ fontSize: 'clamp(3.25rem, 7vw, 5.8rem)', marginBottom: '1rem' }}>
                                LEVI
                            </h1>
                            <p
                                style={{
                                    maxWidth: '40rem',
                                    fontSize: '1.08rem',
                                    fontWeight: 600,
                                    lineHeight: 1.75,
                                    color: 'var(--c-text)',
                                    marginBottom: '1.25rem',
                                }}
                            >
                                Michelle Levia, atau yang akrab dipanggil Levi, adalah anggota JKT48 Generasi 12 yang diperkenalkan pada tahun 2023. Sebelum bergabung dengan JKT48, Levi sudah sangat aktif di dunia modeling dan menari.
                            </p>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                                    gap: '1rem',
                                }}
                            >
                                {HERO_FACTS.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 + index * 0.08 }}
                                        whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
                                        style={{
                                            background: 'rgba(255,255,255,0.8)',
                                            border: '3px solid var(--c-text)',
                                            borderRadius: '22px',
                                            padding: '1rem 1.1rem',
                                            boxShadow: `6px 6px 0px ${item.accent}`,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 38,
                                                height: 38,
                                                borderRadius: '12px',
                                                background: item.accent,
                                                color: 'var(--c-white)',
                                                border: '2px solid var(--c-text)',
                                                marginBottom: '0.8rem',
                                            }}
                                        >
                                            {item.icon}
                                        </div>
                                        <p className="subhead" style={{ color: 'var(--c-text-muted)', marginBottom: '0.35rem' }}>
                                            {item.label}
                                        </p>
                                        <p style={{ fontWeight: 800, lineHeight: 1.45 }}>{item.value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 32, rotate: 2 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ type: 'spring', bounce: 0.35, duration: 0.8 }}
                            className="about-hero-side"
                            style={{ display: 'grid', gap: '1rem' }}
                        >
                            <motion.div whileHover={{ y: -8, rotate: -1.5 }}>
                                <div className="img-sticker" style={{ background: 'var(--c-white)', boxShadow: '12px 12px 0px var(--c-blue)' }}>
                                    <div style={{ overflow: 'hidden', aspectRatio: '3 / 4', background: 'linear-gradient(180deg, #ffd7e6 0%, #fff 100%)' }}>
                                        <motion.img
                                            src={MEMBER.bioImg}
                                            alt={`Foto profile resmi ${MEMBER.firstName} ${MEMBER.lastName}`}
                                            className="img-cover"
                                            whileHover={{ scale: 1.04 }}
                                            transition={{ duration: 0.35 }}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div
                                        style={{
                                            padding: '1.25rem 1.5rem',
                                            background: 'var(--c-white)',
                                            borderTop: '4px solid var(--c-text)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div>
                                            <p className="subhead" style={{ marginBottom: '0.35rem' }}>Member Card</p>
                                            <p className="head" style={{ fontSize: '1.5rem' }}>{MEMBER.firstName} {MEMBER.lastName}</p>
                                        </div>
                                        <Heart style={{ width: 28, height: 28, color: 'var(--c-pink)', fill: 'var(--c-pink)' }} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="card-bubbly"
                                whileHover={{ y: -6 }}
                                style={{
                                    background: 'linear-gradient(180deg, #fffdf6 0%, #fff7fb 100%)',
                                    boxShadow: '10px 10px 0px var(--c-yellow)',
                                    padding: '1.35rem 1.45rem',
                                }}
                            >
                                <p className="subhead" style={{ marginBottom: '0.7rem' }}>Sekilas Tentang Levi</p>
                                <div style={{ display: 'grid', gap: '0.75rem' }}>
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                            gap: '0.75rem',
                                        }}
                                    >
                                        <div style={{ border: '3px solid var(--c-text)', borderRadius: '18px', padding: '0.85rem 0.95rem', background: 'var(--c-white)' }}>
                                            <p className="subhead" style={{ color: 'var(--c-text-muted)', marginBottom: '0.25rem' }}>Name JP</p>
                                            <p style={{ fontWeight: 800, lineHeight: 1.35 }}>{MEMBER.nameJP}</p>
                                        </div>
                                        <div style={{ border: '3px solid var(--c-text)', borderRadius: '18px', padding: '0.85rem 0.95rem', background: 'rgba(90,194,255,0.14)' }}>
                                            <p className="subhead" style={{ color: 'var(--c-text-muted)', marginBottom: '0.25rem' }}>Current Team</p>
                                            <p style={{ fontWeight: 800, lineHeight: 1.35 }}>{MEMBER.team}</p>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            border: '3px solid var(--c-text)',
                                            borderRadius: '18px',
                                            padding: '0.95rem 1rem',
                                            background: 'rgba(255,255,255,0.9)',
                                        }}
                                    >
                                        <p className="subhead" style={{ color: 'var(--c-pink)', marginBottom: '0.35rem' }}>Why She Stands Out</p>
                                        <p style={{ fontWeight: 700, lineHeight: 1.7, color: 'var(--c-text-muted)' }}>
                                            Levi terasa menonjol karena kombinasi image yang manis, ritme panggung yang enerjik, dan detail personal yang indah.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '1rem' }}>
                <div className="container">
                    <div
                        className="about-story-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.95fr)',
                            gap: '2rem',
                            alignItems: 'start',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="card-bubbly"
                            style={{
                                background: 'linear-gradient(165deg, #fff7d1 0%, #fffdf7 100%)',
                                boxShadow: '10px 10px 0px var(--c-purple)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '14px',
                                        background: 'var(--c-white)',
                                        border: '3px solid var(--c-text)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--c-pink)',
                                    }}
                                >
                                    <BadgeInfo style={{ width: 22, height: 22 }} />
                                </div>
                                <div>
                                    <p className="subhead" style={{ color: 'var(--c-text)' }}>Character Snapshot</p>
                                    <h2 className="head" style={{ fontSize: '2rem' }}>Vibe of Levi</h2>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem', fontSize: '1.03rem', fontWeight: 600, lineHeight: 1.8 }}>
                                <p>{MEMBER.bio2}</p>
                                <div
                                    style={{
                                        marginTop: '0.5rem',
                                        padding: '1rem 1.1rem',
                                        borderRadius: '20px',
                                        background: 'rgba(255,255,255,0.88)',
                                        border: '3px solid var(--c-text)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                    }}
                                >
                                    <ArrowRight style={{ width: 20, height: 20, flexShrink: 0 }} />
                                    <span>
                                        Levi memiliki pesona yang unik, memadukan image yang manis, kepribadian yang ceria membuatnya mudah diingat.
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ display: 'grid', gap: '1rem' }}
                        >
                            <motion.div
                                className="card-bubbly"
                                whileHover={{ y: -6 }}
                                style={{
                                    background: 'linear-gradient(180deg, #ffffff 0%, #fff6fb 100%)',
                                    boxShadow: '10px 10px 0px var(--c-pink)',
                                }}
                            >
                                <p className="subhead" style={{ marginBottom: '0.8rem' }}>Profile Essentials</p>

                                <div
                                    style={{
                                        border: '3px solid var(--c-text)',
                                        borderRadius: '24px',
                                        padding: '1.15rem',
                                        background: 'linear-gradient(135deg, rgba(255,94,151,0.12) 0%, rgba(255,255,255,0.95) 100%)',
                                        boxShadow: '6px 6px 0px var(--c-yellow)',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    <p className="subhead" style={{ color: 'var(--c-pink)', marginBottom: '0.4rem' }}>Main Highlight</p>
                                    <p className="head" style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>{MEMBER.height}</p>
                                    <p style={{ fontWeight: 700, color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
                                        Proporsi tinggi yang bikin presence Levi cepat kebaca, baik di foto maupun saat tampil di panggung.
                                    </p>
                                </div>

                                <div className="about-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
                                    {ESSENTIAL_STATS.map((item, index) => (
                                        <motion.div
                                            key={item.label}
                                            whileHover={{ y: -4 }}
                                            style={{
                                                border: '3px solid var(--c-text)',
                                                borderRadius: '20px',
                                                padding: '1rem',
                                                background: index % 2 === 0 ? 'rgba(255,209,59,0.22)' : 'rgba(90,194,255,0.16)',
                                            }}
                                        >
                                            <p className="subhead" style={{ marginBottom: '0.3rem', color: 'var(--c-text-muted)' }}>{item.label}</p>
                                            <p style={{ fontWeight: 800, lineHeight: 1.35 }}>{item.value}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div
                                    style={{
                                        display: 'grid',
                                        gap: '0.65rem',
                                        paddingTop: '0.9rem',
                                        borderTop: '3px dashed var(--c-pink-light)',
                                    }}
                                >
                                    {DETAIL_STATS.map((item) => (
                                        <div
                                            key={item.label}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                gap: '1rem',
                                                alignItems: 'baseline',
                                                padding: '0.1rem 0',
                                            }}
                                        >
                                            <span className="subhead" style={{ color: 'var(--c-text-muted)' }}>{item.label}</span>
                                            <span style={{ textAlign: 'right', fontWeight: 800 }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                className="card-bubbly"
                                whileHover={{ y: -6 }}
                                style={{
                                    background: 'rgba(255,255,255,0.92)',
                                    color: 'var(--c-text)',
                                    boxShadow: '10px 10px 0px var(--c-blue)',
                                }}
                            >
                                <p className="subhead" style={{ color: 'var(--c-purple)', marginBottom: '0.75rem' }}>Identity Note</p>
                                <p style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.7 }}>
                                    Dari cara tampil sampai minat di luar panggung, Levi punya kombinasi yang lucu: idol yang playful, tapi juga punya sisi nerdy, crafty, dan cukup kompetitif.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '1rem' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                    >
                        <span className="subhead" style={{ fontSize: '1rem', color: 'var(--c-pink)', display: 'inline-block', marginBottom: '0.6rem' }}>
                            Timeline Levi
                        </span>
                        <h2 className="head title-stroke" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                            HOW THE STORY BUILDS
                        </h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                        {STORY_BEATS.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="card-bubbly"
                                style={{
                                    boxShadow: `10px 10px 0px ${item.color}`,
                                    background: index === 1 ? '#fffaf1' : 'var(--c-white)',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        padding: '0.45rem 0.9rem',
                                        borderRadius: '999px',
                                        border: '3px solid var(--c-text)',
                                        background: item.color,
                                        color: item.color === 'var(--c-yellow)' ? 'var(--c-text)' : 'var(--c-white)',
                                        marginBottom: '1rem',
                                        fontFamily: 'var(--font-mono)',
                                        fontWeight: 800,
                                    }}
                                >
                                    <Sparkles style={{ width: 14, height: 14 }} />
                                    {item.year}
                                </div>
                                <h3 className="head" style={{ fontSize: '1.45rem', marginBottom: '0.7rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--c-text-muted)', fontWeight: 600, lineHeight: 1.65 }}>{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="section"
                style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,179,209,0.22) 100%)',
                    borderTop: '4px dashed var(--c-pink-light)',
                    marginTop: '1rem',
                }}
            >
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        <span className="subhead" style={{ fontSize: '1rem', color: 'var(--c-pink)', display: 'inline-block', marginBottom: '0.6rem' }}>
                            The Extra Details
                        </span>
                        <h2 className="head title-stroke" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.6rem)' }}>
                            SECRET FILES
                        </h2>
                        <p style={{ maxWidth: '42rem', margin: '1rem auto 0', fontWeight: 600, color: 'var(--c-text-muted)' }}>
                            Bagian ini sengaja dibuat seperti kumpulan kartu kecil, biar hal-hal random tentang Levi.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                        {FUN_FACTS.map((fact, idx) => {
                            const accent = COLORS[idx % COLORS.length];

                            return (
                                <motion.div
                                    key={fact.title}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ y: -8, rotate: idx % 2 === 0 ? -1 : 1 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ delay: (idx % 4) * 0.05 }}
                                    className="card-bubbly"
                                    style={{
                                        padding: '1.35rem',
                                        boxShadow: `8px 8px 0px ${accent}`,
                                        background: idx % 3 === 0 ? '#fffaf5' : 'var(--c-white)',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.9rem' }}>
                                        <div
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: '14px',
                                                border: '3px solid var(--c-text)',
                                                background: accent,
                                                color: accent === 'var(--c-yellow)' ? 'var(--c-text)' : 'var(--c-white)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontFamily: 'var(--font-head)',
                                                fontSize: '1.05rem',
                                                fontWeight: 900,
                                            }}
                                        >
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>
                                        <h3 className="head" style={{ fontSize: '1.15rem' }}>{fact.title}</h3>
                                    </div>
                                    <p style={{ color: 'var(--c-text-muted)', fontSize: '0.96rem', lineHeight: 1.65, fontWeight: 600 }}>
                                        {fact.text}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── HASHTAG COLLECTION ── */}
            <section className="section" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        <span className="subhead" style={{ fontSize: '1rem', color: 'var(--c-purple)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                            <Hash style={{ width: 14, height: 14 }} /> Hashtag
                        </span>
                        <h2 className="head title-stroke" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                            HASHTAG LEVI
                        </h2>
                        <p style={{ maxWidth: '38rem', margin: '0.8rem auto 0', fontWeight: 600, color: 'var(--c-text-muted)' }}>
                            Pakai hashtag ini buat nge-tweet, share, atau cari konten Levi.
                        </p>
                    </motion.div>

                    <motion.div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: '1rem',
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                    >
                        {hashtags.map((item, index) => (
                            <motion.div
                                key={item.tag}
                                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                                whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    background: 'var(--c-white)',
                                    border: '3px solid var(--c-text)',
                                    borderRadius: '24px',
                                    borderLeft: `6px solid ${item.color}`,
                                    boxShadow: `6px 6px 0px ${item.color}`,
                                    padding: '1.5rem 1.4rem 1.4rem',
                                    cursor: 'default',
                                }}
                            >
                                {/* Watermark # */}
                                <span style={{
                                    position: 'absolute',
                                    right: '-0.5rem',
                                    bottom: '-1.5rem',
                                    fontSize: '7rem',
                                    fontWeight: 900,
                                    fontFamily: 'var(--font-head)',
                                    color: item.color,
                                    opacity: 0.09,
                                    lineHeight: 1,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                }}>
                                    #
                                </span>

                                {/* Index Badge */}
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 28,
                                    height: 28,
                                    borderRadius: '8px',
                                    background: item.color,
                                    border: '2px solid var(--c-text)',
                                    marginBottom: '0.85rem',
                                }}>
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontWeight: 900,
                                        fontSize: '0.75rem',
                                        color: item.color === 'var(--c-yellow)' ? 'var(--c-text)' : 'var(--c-white)',
                                    }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <p style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontWeight: 900,
                                    fontSize: '1.15rem',
                                    color: item.color,
                                    marginBottom: '0.5rem',
                                    lineHeight: 1.2,
                                }}>
                                    {item.tag}
                                </p>
                                <p style={{
                                    fontWeight: 600,
                                    fontSize: '0.88rem',
                                    color: 'var(--c-text-muted)',
                                    lineHeight: 1.6,
                                }}>
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* ── TOTAL SHOW STATS ── */}
            <section
                className="section"
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderTop: '4px dashed var(--c-pink)',
                    paddingTop: '6rem',
                    paddingBottom: '8rem',
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '-5rem',
                        left: '-4rem',
                        width: '18rem',
                        height: '18rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(155,114,250,0.18) 0%, rgba(155,114,250,0) 72%)',
                        pointerEvents: 'none',
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        right: '-5rem',
                        bottom: '-6rem',
                        width: '22rem',
                        height: '22rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(255,94,151,0.22) 0%, rgba(255,94,151,0) 72%)',
                        pointerEvents: 'none',
                    }}
                />
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}
                    >
                        <span className="subhead" style={{ fontSize: '1rem', color: 'var(--c-pink)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                            <Clapperboard style={{ width: 14, height: 14 }} /> Rekam Jejak Panggung
                        </span>
                        <h2 className="head title-stroke" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                            TOTAL SHOW
                        </h2>
                        <p style={{ maxWidth: '38rem', margin: '0.8rem auto 0', fontWeight: 600, color: 'var(--c-text-muted)' }}>
                            Angka yang jadi bukti kerja keras Levi di atas panggung.
                        </p>
                    </motion.div>

                    <div
                        className="about-showcase-grid"
                        style={{
                            display: 'grid',
                            gap: '2rem',
                            alignItems: 'stretch',
                            maxWidth: '1280px',
                            margin: '0 auto',
                            position: 'relative',
                            zIndex: 1,
                            padding: '1rem 12px 12px 1rem', // Space for larger shadows
                        }}
                    >
                        {showStats.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -12, rotate: index % 2 === 0 ? -2 : 2 }}
                                transition={{ delay: index * 0.07 }}
                                className="card-bubbly"
                                style={{
                                    padding: '3rem 1.5rem',
                                    width: '100%',
                                    textAlign: 'center',
                                    boxShadow: `12px 12px 0px ${item.color}`,
                                    background: 'var(--c-white)',
                                    minHeight: '280px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    zIndex: 1,
                                }}
                            >
                                {/* Background Watermark Number */}
                                <span style={{
                                    position: 'absolute',
                                    right: '-5%',
                                    bottom: '-15%',
                                    fontSize: 'clamp(8rem, 15vw, 10rem)',
                                    fontWeight: 900,
                                    fontFamily: 'var(--font-head)',
                                    color: item.color,
                                    opacity: 0.12,
                                    pointerEvents: 'none',
                                    zIndex: -1,
                                    lineHeight: 1,
                                }}>
                                    {item.value}
                                </span>

                                {/* Decorative Mini Dot */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    left: '1.5rem',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    background: item.color,
                                    border: '3px solid var(--c-text)',
                                }} />

                                <p style={{
                                    fontFamily: 'var(--font-head)',
                                    fontWeight: 900,
                                    fontSize: 'clamp(3rem, 6vw, 4rem)',
                                    lineHeight: 1,
                                    color: item.color,
                                    marginBottom: '1rem',
                                    WebkitTextStroke: '2px var(--c-text)',
                                }}>
                                    {item.value}
                                </p>
                                <p className="head" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.label}</p>
                                <p style={{ color: 'var(--c-text-muted)', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
