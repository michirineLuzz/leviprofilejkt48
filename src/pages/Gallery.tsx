import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Camera, ChevronLeft, ChevronRight, Expand, Heart, Images, Sparkles, X } from 'lucide-react';
import { fetchGalleryItems, type GalleryItem } from '../lib/cms';
import { useCmsResource } from '../hooks/useCmsResource';

const STICKER_COLORS = ['var(--c-pink)', 'var(--c-blue)', 'var(--c-yellow)', 'var(--c-purple)'];

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { data: galleryItems } = useCmsResource<GalleryItem[]>(fetchGalleryItems, [], []);

    const prev = () => setActiveIndex((i) => i === null ? null : i === 0 ? galleryItems.length - 1 : i - 1);
    const next = () => setActiveIndex((i) => i === null ? null : i === galleryItems.length - 1 ? 0 : i + 1);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (activeIndex === null) return;
            if (e.key === 'Escape') setActiveIndex(null);
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [activeIndex]);

    return (
        <main style={{ minHeight: '100vh', paddingBottom: '6rem', overflow: 'hidden' }}>
            <section style={{ paddingTop: '8rem', paddingBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '-5rem',
                        width: '18rem',
                        height: '18rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(255,94,151,0.26) 0%, rgba(255,94,151,0) 70%)',
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '2rem',
                        right: '-5rem',
                        width: '20rem',
                        height: '20rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(90,194,255,0.24) 0%, rgba(90,194,255,0) 70%)',
                    }}
                />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div
                        className="gallery-hero-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.95fr)',
                            gap: '2rem',
                            alignItems: 'center',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="card-bubbly"
                            whileHover={{ y: -6 }}
                            style={{
                                background: 'linear-gradient(140deg, #fff8fb 0%, #fffef8 100%)',
                                boxShadow: '12px 12px 0px var(--c-pink-light)',
                            }}
                        >
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                                <span className="pill pill-purple">
                                    <Camera style={{ width: 14, height: 14 }} /> Photo Dump
                                </span>
                                <span className="pill" style={{ background: 'var(--c-yellow)' }}>
                                    <Images style={{ width: 14, height: 14 }} /> {galleryItems.length} Shots
                                </span>
                            </div>

                            <p className="subhead" style={{ marginBottom: '0.6rem' }}>Gallery Room</p>
                            <h1 className="head title-stroke" style={{ fontSize: 'clamp(3rem, 7vw, 5.8rem)', marginBottom: '1rem' }}>
                                LEVI SNAPBOOK
                            </h1>
                            <p style={{ fontSize: '1.08rem', fontWeight: 600, lineHeight: 1.75, maxWidth: '42rem', marginBottom: '1.5rem' }}>
                                Halaman galeri yang terasa seperti scrapbook digital: playful, penuh frame buat melihat foto Levi.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
                                {[
                                    { label: 'Mood', value: 'Sweet + lively', color: 'var(--c-pink)' },
                                    { label: 'Style', value: 'Sticker scrapbook', color: 'var(--c-blue)' },
                                    { label: 'Best Use', value: 'Klik buat zoom', color: 'var(--c-yellow)' },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            border: '3px solid var(--c-text)',
                                            borderRadius: '20px',
                                            padding: '1rem',
                                            background: 'var(--c-white)',
                                            boxShadow: `6px 6px 0px ${item.color}`,
                                        }}
                                    >
                                        <p className="subhead" style={{ color: 'var(--c-text-muted)', marginBottom: '0.35rem' }}>{item.label}</p>
                                        <p style={{ fontWeight: 800 }}>{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24, rotate: 2 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ type: 'spring', bounce: 0.35, duration: 0.8 }}
                            style={{ position: 'relative', minHeight: '24rem' }}
                        >
                            {[0, 1, 2].map((idx) => {
                                const photo = galleryItems[idx];
                                if (!photo) return null;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 18, rotate: idx === 1 ? 12 : -12 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1, type: 'spring', bounce: 0.4 }}
                                        whileHover={{ y: -8, rotate: idx === 1 ? 6 : -6 }}
                                        style={{
                                            position: 'absolute',
                                            inset: idx === 0 ? '0 auto auto 1rem' : idx === 1 ? '4rem 0 auto auto' : '12rem auto auto 4rem',
                                            width: idx === 0 ? '70%' : idx === 1 ? '52%' : '48%',
                                            transform: idx === 0 ? 'rotate(-7deg)' : idx === 1 ? 'rotate(8deg)' : 'rotate(-4deg)',
                                            background: 'var(--c-white)',
                                            border: '4px solid var(--c-text)',
                                            borderRadius: '28px',
                                            padding: '0.8rem 0.8rem 1.2rem',
                                            boxShadow: `10px 10px 0px ${STICKER_COLORS[idx]}`,
                                        }}
                                    >
                                        <div style={{ aspectRatio: idx === 2 ? '1 / 1' : '4 / 5', overflow: 'hidden', borderRadius: '18px', border: '3px solid var(--c-text)' }}>
                                            <motion.img src={photo.image_url} alt={photo.label} className="img-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.35 }} loading="lazy" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '1rem' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                    >
                        <span className="subhead" style={{ color: 'var(--c-pink)', display: 'inline-block', marginBottom: '0.5rem' }}>
                            Pick A Frame
                        </span>
                        <h2 className="head title-stroke" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}>
                            MOMENTS TO OPEN
                        </h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
                        {galleryItems.map((item, index) => {
                            const accent = STICKER_COLORS[index % STICKER_COLORS.length];
                            const rotate = index % 2 === 0 ? '-1.5deg' : '1.5deg';

                            return (
                                <motion.button
                                    key={`${item.image_url}-${index}`}
                                    type="button"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ delay: (index % 4) * 0.06 }}
                                    whileHover={{ y: -8, rotate: index % 2 === 0 ? -2 : 2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`Lihat foto: ${item.label}`}
                                    style={{
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        background: 'var(--c-white)',
                                        border: '4px solid var(--c-text)',
                                        borderRadius: '28px',
                                        padding: '0.9rem 0.9rem 1.15rem',
                                        boxShadow: `8px 8px 0px ${accent}`,
                                        transform: `rotate(${rotate})`,
                                    }}
                                >
                                    <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: '18px', border: '3px solid var(--c-text)', marginBottom: '0.9rem' }}>
                                        <motion.img src={item.image_url} alt={item.label} className="img-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.35 }} loading="lazy" />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 'auto 0.75rem 0.75rem auto',
                                                width: 42,
                                                height: 42,
                                                borderRadius: '50%',
                                                background: accent,
                                                border: '3px solid var(--c-text)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '3px 3px 0px var(--c-text)',
                                            }}
                                        >
                                            <Expand style={{ width: 18, height: 18, color: accent === 'var(--c-yellow)' ? 'var(--c-text)' : 'var(--c-white)' }} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                                        <div>
                                            <p className="subhead" style={{ color: 'var(--c-text-muted)', marginBottom: '0.25rem' }}>Photo #{String(index + 1).padStart(2, '0')}</p>
                                            <p className="head" style={{ fontSize: '1.15rem' }}>{item.label}</p>
                                        </div>
                                        <Heart style={{ width: 20, height: 20, color: 'var(--c-pink)', fill: 'var(--c-pink)' }} />
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveIndex(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 300,
                            background: 'rgba(255, 240, 245, 0.92)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveIndex(null)}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                width: 52,
                                height: 52,
                                borderRadius: '50%',
                                border: '3px solid var(--c-text)',
                                background: 'var(--c-pink)',
                                color: 'var(--c-white)',
                                cursor: 'pointer',
                                boxShadow: '4px 4px 0px var(--c-text)',
                            }}
                            aria-label="Tutup lightbox"
                        >
                            <X style={{ width: 22, height: 22, margin: '0 auto' }} />
                        </button>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            style={{
                                position: 'absolute',
                                left: '1.5rem',
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                border: '3px solid var(--c-text)',
                                background: 'var(--c-yellow)',
                                color: 'var(--c-text)',
                                cursor: 'pointer',
                                boxShadow: '4px 4px 0px var(--c-text)',
                            }}
                            aria-label="Foto sebelumnya"
                        >
                            <ChevronLeft style={{ width: 24, height: 24, margin: '0 auto' }} />
                        </button>

                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 22, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 22 }}
                            transition={{ type: 'spring', bounce: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: 'min(100%, 980px)',
                                background: 'var(--c-white)',
                                border: '4px solid var(--c-text)',
                                borderRadius: '34px',
                                padding: '1rem',
                                boxShadow: '14px 14px 0px var(--c-purple)',
                            }}
                        >
                            <div
                                className="gallery-lightbox-grid"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'minmax(0, 1fr) minmax(240px, 300px)',
                                    gap: '1rem',
                                }}
                            >
                                <div style={{ borderRadius: '24px', overflow: 'hidden', border: '3px solid var(--c-text)', background: '#fff7fb', minHeight: '300px' }}>
                                    <motion.img src={galleryItems[activeIndex].image_url} alt={galleryItems[activeIndex].label} className="img-cover" style={{ objectFit: 'contain', background: '#fff7fb' }} initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.25 }} />
                                </div>

                                <motion.div
                                    className="card-bubbly"
                                    initial={{ opacity: 0, x: 14 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 }}
                                    style={{
                                        padding: '1.5rem',
                                        background: 'linear-gradient(180deg, #fff8fb 0%, #fff5d4 100%)',
                                        boxShadow: '8px 8px 0px var(--c-yellow)',
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                        <span className="pill pill-purple">
                                            <Sparkles style={{ width: 14, height: 14 }} /> Highlight
                                        </span>
                                        <span className="pill" style={{ background: 'var(--c-white)' }}>
                                            {activeIndex + 1} / {galleryItems.length}
                                        </span>
                                    </div>
                                    <h3 className="head" style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{galleryItems[activeIndex].label}</h3>
                                    <p style={{ fontWeight: 600, lineHeight: 1.7, color: 'var(--c-text-muted)', marginBottom: '1.2rem' }}>
                                        Mode tampilan besar buat nikmatin detail frame, ekspresi, dan nuansa fotonya lebih enak tanpa gangguan elemen lain.
                                    </p>
                                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                                        <div style={{ border: '3px solid var(--c-text)', borderRadius: '18px', padding: '0.9rem', background: 'var(--c-white)' }}>
                                            <p className="subhead" style={{ color: 'var(--c-text-muted)', marginBottom: '0.25rem' }}>Collection</p>
                                            <p style={{ fontWeight: 800 }}>Levi Archive</p>
                                        </div>
                                        <div style={{ border: '3px solid var(--c-text)', borderRadius: '18px', padding: '0.9rem', background: 'var(--c-white)' }}>
                                            <p className="subhead" style={{ color: 'var(--c-text-muted)', marginBottom: '0.25rem' }}>View Tip</p>
                                            <p style={{ fontWeight: 800 }}>Pakai arrow keyboard untuk pindah foto</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            style={{
                                position: 'absolute',
                                right: '1.5rem',
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                border: '3px solid var(--c-text)',
                                background: 'var(--c-blue)',
                                color: 'var(--c-white)',
                                cursor: 'pointer',
                                boxShadow: '4px 4px 0px var(--c-text)',
                            }}
                            aria-label="Foto berikutnya"
                        >
                            <ChevronRight style={{ width: 24, height: 24, margin: '0 auto' }} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
