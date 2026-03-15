import { useMemo, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Clapperboard, FileText, Filter, PlayCircle, Radio, Sparkles } from 'lucide-react';
import { fetchMediaItems, type MediaItem } from '../lib/cms';
import { useCmsResource } from '../hooks/useCmsResource';

type FilterType = 'all' | 'video' | 'article';

const FILTERS: { key: FilterType; label: string; icon: ReactNode; color: string }[] = [
    { key: 'all', label: 'All Media', icon: <Filter style={{ width: 16, height: 16 }} />, color: 'var(--c-pink)' },
    { key: 'video', label: 'Video', icon: <Clapperboard style={{ width: 16, height: 16 }} />, color: 'var(--c-blue)' },
    { key: 'article', label: 'Artikel', icon: <FileText style={{ width: 16, height: 16 }} />, color: 'var(--c-yellow)' },
];

export default function Media() {
    const [filter, setFilter] = useState<FilterType>('all');
    const { data: mediaItems } = useCmsResource<MediaItem[]>(fetchMediaItems, [], []);

    const filtered = useMemo(
        () => filter === 'all' ? mediaItems : mediaItems.filter((item) => item.type === filter),
        [filter, mediaItems]
    );

    const featured = filtered[0];

    return (
        <main style={{ minHeight: '100vh', paddingBottom: '6rem', overflow: 'hidden' }}>
            <section style={{ paddingTop: '8rem', paddingBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '-2rem',
                        left: '-4rem',
                        width: '18rem',
                        height: '18rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(155,114,250,0.25) 0%, rgba(155,114,250,0) 70%)',
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '4rem',
                        right: '-5rem',
                        width: '22rem',
                        height: '22rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(255,209,59,0.26) 0%, rgba(255,209,59,0) 70%)',
                    }}
                />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="card-bubbly"
                        whileHover={{ y: -6 }}
                        style={{
                            background: 'linear-gradient(135deg, #fff9fc 0%, #fff6dc 100%)',
                            boxShadow: '12px 12px 0px var(--c-blue)',
                        }}
                    >
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                            <span className="pill pill-purple">
                                <Radio style={{ width: 14, height: 14 }} /> Media Hub
                            </span>
                            <span className="pill" style={{ background: 'var(--c-white)' }}>
                                <Sparkles style={{ width: 14, height: 14 }} /> {mediaItems.length} Entries
                            </span>
                        </div>

                        <div
                            className="media-hero-grid"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(0, 1.05fr) minmax(260px, 0.95fr)',
                                gap: '2rem',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <p className="subhead" style={{ marginBottom: '0.6rem' }}>Media Library</p>
                                <h1 className="head title-stroke" style={{ fontSize: 'clamp(3rem, 7vw, 5.4rem)', marginBottom: '1rem' }}>
                                    WATCH, READ, REPLAY
                                </h1>
                                <p style={{ fontSize: '1.08rem', fontWeight: 600, lineHeight: 1.75, maxWidth: '40rem' }}>
                                    Kumpulan konten Levi dalam satu tempat! Mulai dari video penampilan panggung, dokumentasi aktivitas, sampai berbagai artikel menarik.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {[
                                    { label: 'Featured', value: featured ? featured.source : 'Belum ada', color: 'var(--c-pink)' },
                                    { label: 'Current Filter', value: filter === 'all' ? 'Semua konten' : filter, color: 'var(--c-blue)' },
                                    { label: 'Layout', value: 'Editorial card stack', color: 'var(--c-yellow)' },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.18 + index * 0.08 }}
                                        whileHover={{ y: -4 }}
                                        style={{
                                            background: 'var(--c-white)',
                                            border: '3px solid var(--c-text)',
                                            borderRadius: '22px',
                                            padding: '1rem 1.1rem',
                                            boxShadow: `6px 6px 0px ${item.color}`,
                                        }}
                                    >
                                        <p className="subhead" style={{ color: 'var(--c-text-muted)', marginBottom: '0.35rem' }}>{item.label}</p>
                                        <p style={{ fontWeight: 800 }}>{item.value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {FILTERS.map((item) => {
                            const active = filter === item.key;
                            return (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => setFilter(item.key)}
                                    onMouseEnter={(e) => {
                                        if (!active) e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = active ? 'translate(4px, 4px)' : 'translate(0)';
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.55rem',
                                        padding: '0.8rem 1.4rem',
                                        borderRadius: '999px',
                                        border: '3px solid var(--c-text)',
                                        background: active ? item.color : 'var(--c-white)',
                                        color: active && item.key !== 'article' ? 'var(--c-white)' : 'var(--c-text)',
                                        boxShadow: active ? 'none' : '4px 4px 0px var(--c-text)',
                                        transform: active ? 'translate(4px, 4px)' : 'translate(0)',
                                        fontFamily: 'var(--font-head)',
                                        fontWeight: 800,
                                        transition: 'all 0.18s ease',
                                    }}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {featured && (
                <section className="section" style={{ paddingTop: '0.5rem', paddingBottom: '2rem' }}>
                    <div className="container">
                        <motion.a
                            href={featured.url}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="card-bubbly media-featured-grid"
                            whileHover={{ y: -8 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(0, 1.1fr) minmax(260px, 0.9fr)',
                                gap: '1.5rem',
                                textDecoration: 'none',
                                background: 'linear-gradient(140deg, #fff5fb 0%, #ffffff 100%)',
                                boxShadow: '12px 12px 0px var(--c-pink-light)',
                            }}
                        >
                            <div style={{ display: 'grid', alignContent: 'center' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                    <span className="pill" style={{ background: 'var(--c-yellow)' }}>
                                        <PlayCircle style={{ width: 14, height: 14 }} />
                                        Featured
                                    </span>
                                    <span className="pill pill-purple">{featured.type}</span>
                                </div>
                                <h2 className="head" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.85rem' }}>
                                    {featured.title}
                                </h2>
                                <p style={{ fontWeight: 600, lineHeight: 1.7, color: 'var(--c-text-muted)', marginBottom: '1.1rem' }}>
                                    Konten teratas ditampilkan besar supaya mempunyai titik fokus yang jelas begitu dibuka.
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <span className="subhead" style={{ color: 'var(--c-pink)' }}>{featured.source}</span>
                                    <span className="subhead" style={{ color: 'var(--c-text-muted)' }}>{featured.date_label}</span>
                                </div>
                            </div>

                            <div style={{ position: 'relative', borderRadius: '26px', overflow: 'hidden', border: '4px solid var(--c-text)', minHeight: '250px', background: '#fff1f6' }}>
                                <motion.img src={featured.thumb_url} alt={featured.title} className="img-cover" whileHover={{ scale: 1.04 }} transition={{ duration: 0.35 }} />
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 'auto 1rem 1rem auto',
                                        width: 56,
                                        height: 56,
                                        borderRadius: '50%',
                                        background: 'var(--c-pink)',
                                        border: '3px solid var(--c-text)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '4px 4px 0px var(--c-text)',
                                    }}
                                >
                                    <ArrowUpRight style={{ width: 22, height: 22, color: 'var(--c-white)' }} />
                                </div>
                            </div>
                        </motion.a>
                    </div>
                </section>
            )}

            <section className="section" style={{ paddingTop: '0.5rem' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {filtered.map((item, index) => (
                            <motion.a
                                key={`${item.title}-${index}`}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ delay: (index % 3) * 0.06 }}
                                className="card-bubbly"
                                whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                                style={{
                                    padding: '1rem',
                                    textDecoration: 'none',
                                    background: index % 2 === 0 ? 'var(--c-white)' : '#fff9f3',
                                    boxShadow: `8px 8px 0px ${item.type === 'video' ? 'var(--c-blue)' : 'var(--c-yellow)'}`,
                                }}
                            >
                                <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: '20px', border: '3px solid var(--c-text)', marginBottom: '1rem', background: '#fff1f7' }}>
                                    <motion.img src={item.thumb_url} alt={item.title} className="img-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.35 }} />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '0.8rem',
                                            left: '0.8rem',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            padding: '0.35rem 0.75rem',
                                            borderRadius: '999px',
                                            background: item.type === 'video' ? 'var(--c-blue)' : 'var(--c-yellow)',
                                            border: '2px solid var(--c-text)',
                                            color: item.type === 'video' ? 'var(--c-white)' : 'var(--c-text)',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.72rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {item.type === 'video' ? <Clapperboard style={{ width: 14, height: 14 }} /> : <FileText style={{ width: 14, height: 14 }} />}
                                        {item.type}
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gap: '0.75rem' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                        <span className="subhead" style={{ color: 'var(--c-pink)' }}>{item.source}</span>
                                        <span className="subhead" style={{ color: 'var(--c-text-muted)' }}>{item.date_label}</span>
                                    </div>
                                    <h3 className="head" style={{ fontSize: '1.35rem', lineHeight: 1.25 }}>{item.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                        <p style={{ color: 'var(--c-text-muted)', fontWeight: 600 }}>
                                            Klik untuk buka konten
                                        </p>
                                        <span
                                            style={{
                                                width: 42,
                                                height: 42,
                                                borderRadius: '50%',
                                                background: 'var(--c-text)',
                                                color: 'var(--c-white)',
                                                border: '3px solid var(--c-text)',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <ArrowUpRight style={{ width: 18, height: 18 }} />
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="card-bubbly" style={{ textAlign: 'center', marginTop: '1rem', background: '#fffaf5' }}>
                            <h3 className="head" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Belum ada konten di filter ini</h3>
                            <p style={{ fontWeight: 600, color: 'var(--c-text-muted)' }}>Coba ganti filter supaya daftar medianya muncul lagi.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
