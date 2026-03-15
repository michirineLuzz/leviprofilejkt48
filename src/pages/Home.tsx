import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import {
    ArrowRight,
    Calendar,
    Camera,
    Radio,
    Heart,
    Music,
    Sparkles,
    Star,
    UserRound,
} from 'lucide-react';
import { MEMBER } from '../data';
import { fetchLeviLiveStatus, type LiveStatus } from '../lib/live';

function Ticker() {
    const items = ['MICHELLE LEVIA', 'JKT48', 'TEAM PASSION', 'GEN 12'];
    const doubled = [...items, ...items, ...items];

    return (
        <div className="marquee-container" style={{ margin: '0' }}>
            <div className="marquee-track">
                {doubled.map((item, index) => (
                    <span
                        key={`${item}-${index}`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0 1.5rem',
                            fontFamily: 'var(--font-head)',
                            fontSize: '1rem',
                            fontWeight: 900,
                            letterSpacing: '0.08em',
                            color: 'var(--c-yellow)',
                        }}
                    >
                        {item}
                        <span style={{ color: 'var(--c-pink)' }}>♡</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

const NAV_CARDS = [
    {
        to: '/about',
        title: 'Biodata',
        desc: 'Masuk ke profile lengkap, cerita, dan fun facts Levi.',
        icon: <UserRound style={{ width: 28, height: 28 }} />,
        color: 'var(--c-pink)',
        shadow: 'var(--c-pink-light)',
    },
    {
        to: '/gallery',
        title: 'Galeri',
        desc: 'Lihat scrapbook visual dan foto-foto Levi.',
        icon: <Camera style={{ width: 28, height: 28 }} />,
        color: 'var(--c-blue)',
        shadow: '#bbe8ff',
    },
    {
        to: '/media',
        title: 'Media',
        desc: 'Buka video, artikel, dan konten pilihan.',
        icon: <Music style={{ width: 28, height: 28 }} />,
        color: 'var(--c-purple)',
        shadow: '#d8cbff',
    },
    {
        to: '/schedule',
        title: 'Jadwal',
        desc: 'Pantau event, show, dan agenda terbaru.',
        icon: <Calendar style={{ width: 28, height: 28 }} />,
        color: 'var(--c-yellow)',
        shadow: '#ffe89c',
    },
];


export default function Home() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
    const badgeY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
    const [liveStatus, setLiveStatus] = useState<LiveStatus>({ isLive: false, platform: null });

    useEffect(() => {
        let isMounted = true;

        async function loadLiveStatus() {
            try {
                const status = await fetchLeviLiveStatus(['Levi', 'Michelle Levia', 'jkt48_levi']);
                if (isMounted) {
                    setLiveStatus(status);
                }
            } catch {
                if (isMounted) {
                    setLiveStatus({ isLive: false, platform: null });
                }
            }
        }

        loadLiveStatus();
        const intervalId = window.setInterval(loadLiveStatus, 60000);

        return () => {
            isMounted = false;
            window.clearInterval(intervalId);
        };
    }, []);

    return (
        <main style={{ minHeight: '100vh', overflow: 'hidden' }}>
            <section
                ref={heroRef}
                style={{
                    position: 'relative',
                    minHeight: '100vh',
                    paddingTop: '8rem',
                    paddingBottom: '4rem',
                    overflow: 'hidden',
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '2rem',
                        left: '-6rem',
                        width: '24rem',
                        height: '24rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(255,94,151,0.25) 0%, rgba(255,94,151,0) 70%)',
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '4rem',
                        right: '-6rem',
                        width: '26rem',
                        height: '26rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(90,194,255,0.25) 0%, rgba(90,194,255,0) 70%)',
                    }}
                />

                <motion.div
                    className="float-anim hidden-mobile"
                    initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
                    style={{ position: 'absolute', top: '18%', left: '8%', color: 'var(--c-pink)' }}
                >
                    <Heart style={{ width: 76, height: 76, fill: 'var(--c-pink)' }} />
                </motion.div>
                <motion.div
                    className="spin-anim hidden-mobile"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    style={{ position: 'absolute', top: '12%', right: '12%', color: 'var(--c-yellow)' }}
                >
                    <Star style={{ width: 92, height: 92, fill: 'var(--c-yellow)' }} />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div
                        className="home-hero-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(320px, 0.95fr)',
                            gap: '2rem',
                            alignItems: 'center',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="home-hero-copy"
                        >
                            <div
                                className="card-bubbly"
                                whileHover={{ y: -6 }}
                                style={{
                                    background: 'linear-gradient(135deg, #fff9fc 0%, #fff6de 100%)',
                                    boxShadow: '12px 12px 0px var(--c-pink-light)',
                                }}
                            >
                                <motion.div
                                    initial="hidden"
                                    animate="show"
                                    variants={{
                                        hidden: {},
                                        show: { transition: { staggerChildren: 0.08 } },
                                    }}
                                    style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}
                                >
                                    <motion.span
                                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                                        className="pill pill-purple"
                                    >
                                        <Sparkles style={{ width: 14, height: 14 }} /> {MEMBER.generation}
                                    </motion.span>
                                    <motion.span
                                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                                        className="pill pill-blue"
                                    >
                                        <Star style={{ width: 14, height: 14 }} /> {MEMBER.team}
                                    </motion.span>
                                    <motion.span
                                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                                        className="pill"
                                        style={{
                                            background: liveStatus.isLive ? '#ffecf1' : 'var(--c-white)',
                                            color: 'var(--c-text)',
                                            boxShadow: liveStatus.isLive ? '3px 3px 0px var(--c-pink)' : undefined,
                                        }}
                                    >
                                        <Radio style={{ width: 14, height: 14, color: liveStatus.isLive ? 'var(--c-pink)' : 'var(--c-text-muted)' }} />
                                        {liveStatus.isLive ? `Live di ${liveStatus.platform}` : 'Offline'}
                                    </motion.span>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="subhead"
                                    style={{ marginBottom: '0.65rem' }}
                                >
                                    Landing Page
                                </motion.p>
                                <motion.h1
                                    initial={{ opacity: 0, y: 22 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', bounce: 0.35 }}
                                    className="head title-stroke"
                                    style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95, marginBottom: '0.9rem' }}
                                >
                                    MICHELLE LEVIA
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        padding: '0.55rem 1rem',
                                        borderRadius: '999px',
                                        background: 'var(--c-white)',
                                        border: '3px solid var(--c-text)',
                                        boxShadow: '4px 4px 0px var(--c-blue)',
                                        marginBottom: '1.25rem',
                                    }}
                                >
                                    <span style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', fontWeight: 800 }}>{MEMBER.nameJP}</span>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.38 }}
                                    style={{ fontSize: '1.08rem', fontWeight: 600, lineHeight: 1.8, maxWidth: '42rem', marginBottom: '1.5rem' }}
                                >
                                    Selamat datang di archive Levi! Tempat di mana kamu bisa kepoin profil, lihat galeri, cek berbagai konten, sampai mantau jadwal shownya.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.46 }}
                                    className="card-bubbly"
                                    style={{
                                        padding: '1rem 1.1rem',
                                        marginBottom: '1.4rem',
                                        background: liveStatus.isLive ? '#fff1f6' : 'var(--c-white)',
                                        boxShadow: `8px 8px 0px ${liveStatus.isLive ? 'var(--c-pink-light)' : 'var(--c-blue)'}`,
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            <p className="subhead" style={{ marginBottom: '0.25rem', color: liveStatus.isLive ? 'var(--c-pink)' : 'var(--c-text-muted)' }}>
                                                Live Status
                                            </p>
                                            <p style={{ fontWeight: 800 }}>
                                                {liveStatus.isLive
                                                    ? `Levi lagi live di ${liveStatus.platform}`
                                                    : 'Levi lagi belum live sekarang'}
                                            </p>
                                            {liveStatus.isLive && liveStatus.title && (
                                                <p style={{ marginTop: '0.3rem', fontWeight: 600, color: 'var(--c-text-muted)' }}>
                                                    {liveStatus.title}
                                                </p>
                                            )}
                                        </div>
                                        {liveStatus.isLive && liveStatus.url ? (
                                            <motion.a
                                                href={liveStatus.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                whileHover={{ y: -4 }}
                                                whileTap={{ y: 2 }}
                                                className="btn btn-primary"
                                            >
                                                Tonton Levi Live <ArrowRight style={{ strokeWidth: 3 }} />
                                            </motion.a>
                                        ) : (
                                            <div
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.55rem',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '999px',
                                                    border: '3px solid var(--c-text)',
                                                    background: 'var(--c-bg)',
                                                    fontWeight: 800,
                                                }}
                                            >
                                                <Radio style={{ width: 16, height: 16 }} />
                                                Standby aja dulu
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.58 }}
                                    style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}
                                >
                                    <motion.div whileHover={{ y: -4 }} whileTap={{ y: 2 }}>
                                        <Link to="/about" className="btn btn-primary">
                                            Explore Levi <ArrowRight style={{ strokeWidth: 3 }} />
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ y: -4 }} whileTap={{ y: 2 }}>
                                        <Link to="/gallery" className="btn btn-secondary">
                                            Lihat Galeri
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30, rotate: 2 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ type: 'spring', bounce: 0.35, duration: 0.9 }}
                            className="home-hero-media"
                            style={{ position: 'relative', display: 'grid', gap: '1rem' }}
                        >
                            <motion.div style={{ y: imageY }} whileHover={{ rotate: -1.5, y: -8 }}>
                                <div className="img-sticker" style={{ background: 'var(--c-white)', boxShadow: '12px 12px 0px var(--c-blue)' }}>
                                    <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', background: 'linear-gradient(180deg, #ffe2ee 0%, #ffffff 100%)' }}>
                                        <motion.img
                                            src={MEMBER.heroImg}
                                            alt={`${MEMBER.firstName} ${MEMBER.lastName}`}
                                            className="img-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.35 }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1.1rem 1.25rem',
                                            borderTop: '4px solid var(--c-text)',
                                            background: 'var(--c-white)',
                                        }}
                                    >
                                        <div>
                                            <p className="subhead" style={{ marginBottom: '0.25rem' }}>Profile Visual</p>
                                            <p className="head" style={{ fontSize: '1.35rem' }}>
                                                {MEMBER.firstName} {MEMBER.lastName}
                                            </p>
                                        </div>
                                        <Heart style={{ width: 26, height: 26, color: 'var(--c-pink)', fill: 'var(--c-pink)' }} />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Ticker />
            <section className="section" style={{ paddingTop: '3.5rem' }}>
                <div className="container">
                    <div
                        className="home-overview-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
                            gap: '1.5rem',
                            alignItems: 'stretch',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="card-bubbly"
                            style={{
                                background: 'var(--c-yellow)',
                                boxShadow: '10px 10px 0px var(--c-purple)',
                            }}
                        >
                            <p className="subhead" style={{ color: 'var(--c-text)', marginBottom: '0.55rem' }}>Quick Read</p>
                            <h2 className="head" style={{ fontSize: '2.4rem', marginBottom: '0.9rem' }}>
                                Kenapa halaman ini dibuat
                            </h2>
                            <p style={{ fontWeight: 600, lineHeight: 1.8, marginBottom: '1rem' }}>
                                Website ini didedikasikan sebagai satu tempat lengkap untuk merangkum seluruh perjalanan, aktivitas, dan jadwal Levi.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="card-bubbly"
                            style={{
                                background: 'linear-gradient(140deg, #fffdfd 0%, #fff8f0 100%)',
                                boxShadow: '10px 10px 0px var(--c-blue)',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                                <div>
                                    <p className="subhead" style={{ color: 'var(--c-pink)', marginBottom: '0.35rem' }}>Section Map</p>
                                    <h2 className="head" style={{ fontSize: '2.2rem' }}>Choose where to start</h2>
                                </div>
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: '50%',
                                        border: '3px solid var(--c-text)',
                                        background: 'var(--c-pink)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '4px 4px 0px var(--c-text)',
                                    }}
                                >
                                    <ArrowRight style={{ width: 22, height: 22, color: 'var(--c-white)' }} />
                                </div>
                            </div>

                            <div className="home-nav-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                                {NAV_CARDS.map((card, index) => (
                                    <motion.div
                                        key={card.to}
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.06, type: 'spring', bounce: 0.35 }}
                                    >
                                        <Link
                                            to={card.to}
                                            className="card-bubbly"
                                            style={{
                                                display: 'block',
                                                height: '100%',
                                                textDecoration: 'none',
                                                padding: '1.35rem',
                                                background: 'var(--c-white)',
                                                boxShadow: `8px 8px 0px ${card.shadow}`,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: '18px',
                                                    border: '3px solid var(--c-text)',
                                                    background: card.color,
                                                    color: card.color === 'var(--c-yellow)' ? 'var(--c-text)' : 'var(--c-white)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginBottom: '0.9rem',
                                                }}
                                            >
                                                {card.icon}
                                            </div>
                                            <h3 className="head" style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>{card.title}</h3>
                                            <p style={{ color: 'var(--c-text-muted)', fontWeight: 600, lineHeight: 1.6 }}>{card.desc}</p>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
