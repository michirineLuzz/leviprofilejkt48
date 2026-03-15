import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Radio, ExternalLink, Sparkles, Heart, Star, Tv } from 'lucide-react';
import { fetchLeviLiveStatus, type LiveStatus } from '../lib/live';
import { MEMBER } from '../data';

export default function Live() {
    const [liveStatus, setLiveStatus] = useState<LiveStatus>({ isLive: false, platform: null });
    const [loading, setLoading] = useState(true);

    async function loadLiveStatus() {
        try {
            const status = await fetchLeviLiveStatus(['Levi', 'Michelle Levia', 'jkt48_levi', 'JKT48_Levi']);
            setLiveStatus(status);
        } catch (error) {
            console.error('Failed to fetch live status:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadLiveStatus();
        const intervalId = window.setInterval(loadLiveStatus, 60000);
        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <main style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ marginBottom: '3rem' }}>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', bounce: 0.5 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '999px',
                                background: liveStatus.isLive ? 'var(--c-pink)' : 'var(--c-bg-surface)',
                                color: liveStatus.isLive ? 'white' : 'var(--c-text-muted)',
                                border: '3px solid var(--c-text)',
                                boxShadow: '4px 4px 0px var(--c-text)',
                                marginBottom: '1.5rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}
                        >
                            {liveStatus.isLive ? (
                                <motion.span
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Radio style={{ width: 18, height: 18 }} /> ON AIR
                                </motion.span>
                            ) : (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Radio style={{ width: 18, height: 18 }} /> STANDBY
                                </span>
                            )}
                        </motion.div>

                        <h1 className="head title-stroke" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '1rem' }}>
                            LIVE STATUS
                        </h1>
                        <p style={{ fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '1.1rem' }}>
                            Pantau keberadaan Levi di streaming JKT48.
                        </p>
                    </div>

                    {loading ? (
                        <div className="card-bubbly" style={{ padding: '4rem' }}>
                            <div className="spin-anim" style={{ display: 'inline-block' }}>
                                <Sparkles style={{ width: 48, height: 48, color: 'var(--c-yellow)' }} />
                            </div>
                            <p style={{ marginTop: '1rem', fontWeight: 800 }}>Mengecek status Levi...</p>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="card-bubbly"
                            style={{
                                background: liveStatus.isLive
                                    ? 'linear-gradient(135deg, #fff5f8 0%, #fff0f5 100%)'
                                    : 'var(--c-white)',
                                padding: '3rem 2rem',
                                border: '4px solid var(--c-text)',
                                boxShadow: liveStatus.isLive
                                    ? '16px 16px 0px var(--c-pink-light)'
                                    : '12px 12px 0px var(--c-blue)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {liveStatus.isLive && (
                                <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                                    <Radio style={{ width: 200, height: 200, color: 'var(--c-pink)' }} />
                                </div>
                            )}

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    margin: '0 auto 2rem',
                                    border: '4px solid var(--c-text)',
                                    background: 'var(--c-bg)',
                                    display: 'grid',
                                    placeItems: 'center',
                                    boxShadow: '6px 6px 0px var(--c-text)'
                                }}>
                                    <Tv style={{ width: 44, height: 44, color: liveStatus.isLive ? 'var(--c-pink)' : 'var(--c-text-muted)' }} />
                                </div>

                                <h2 className="head" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                                    {liveStatus.isLive
                                        ? `Levi is Streaming!`
                                        : 'Currently Offline'}
                                </h2>

                                <div style={{
                                    display: 'inline-block',
                                    padding: '1rem 2rem',
                                    background: 'var(--c-bg)',
                                    border: '3px solid var(--c-text)',
                                    borderRadius: '20px',
                                    marginBottom: '2rem'
                                }}>
                                    <p style={{ fontWeight: 800, fontSize: '1.2rem', color: liveStatus.isLive ? 'var(--c-text)' : 'var(--c-text-muted)' }}>
                                        {liveStatus.isLive
                                            ? `Sedang live di ${liveStatus.platform}`
                                            : 'Levi sedang tidak berada di room manapun.'}
                                    </p>
                                    {liveStatus.isLive && liveStatus.title && (
                                        <p style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--c-pink)', fontStyle: 'italic' }}>
                                            "{liveStatus.title}"
                                        </p>
                                    )}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                    {liveStatus.isLive && liveStatus.url ? (
                                        <motion.a
                                            href={liveStatus.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            whileHover={{ y: -6, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="btn btn-primary"
                                            style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}
                                        >
                                            Meluncur ke TKP <ExternalLink style={{ width: 20, height: 20, strokeWidth: 3 }} />
                                        </motion.a>
                                    ) : (
                                        <>
                                            <motion.a
                                                href={MEMBER.social.tiktok}
                                                target="_blank"
                                                rel="noreferrer"
                                                whileHover={{ y: -4 }}
                                                className="btn btn-secondary"
                                            >
                                                Cek TikTok
                                            </motion.a>
                                            <motion.a
                                                href={MEMBER.social.x}
                                                target="_blank"
                                                rel="noreferrer"
                                                whileHover={{ y: -4 }}
                                                className="btn btn-secondary"
                                            >
                                                Cek X Levi
                                            </motion.a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div className="card-bubbly" style={{ background: 'var(--c-white)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                <Heart style={{ color: 'var(--c-pink)', fill: 'var(--c-pink)' }} />
                                <h3 className="head" style={{ fontSize: '1.2rem' }}>Dukungan Fans</h3>
                            </div>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--c-text-muted)' }}>
                                Jangan lupa kasih semangat, gift, dan komentar positif pas Levi live ya!
                            </p>
                        </div>
                        <div className="card-bubbly" style={{ background: 'var(--c-white)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                <Star style={{ color: 'var(--c-yellow)', fill: 'var(--c-yellow)' }} />
                                <h3 className="head" style={{ fontSize: '1.2rem' }}>Oshi Terang</h3>
                            </div>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--c-text-muted)' }}>
                                Kehadiran kamu di room sangat berarti buat Levi. Yuhu!
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
