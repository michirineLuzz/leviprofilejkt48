import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Clock3, MapPin, Sparkles, Star, Tag, Ticket, Zap } from 'lucide-react';
import { MEMBER } from '../data';
import { fetchScheduleItems, type ScheduleItem } from '../lib/schedule';

const TYPE_COLOR: Record<string, { bg: string; text: string; shadow: string }> = {
    Theater: { bg: 'var(--c-pink)', text: 'var(--c-white)', shadow: 'var(--c-pink-light)' },
    Event: { bg: 'var(--c-blue)', text: 'var(--c-white)', shadow: '#b8e7ff' },
    Special: { bg: 'var(--c-yellow)', text: 'var(--c-text)', shadow: '#ffe79a' },
};

export default function Schedule() {
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadSchedules() {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const items = await fetchScheduleItems([
                    'Levi',
                    'Michelle Levia',
                ]);

                if (isMounted) {
                    setScheduleItems(items);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage('Jadwal otomatis belum bisa dimuat sekarang.');
                    setScheduleItems([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadSchedules();

        return () => {
            isMounted = false;
        };
    }, []);

    const hasEvents = scheduleItems.length > 0;
    const nextEvent = hasEvents ? scheduleItems[0] : null;
    const specialCount = scheduleItems.filter((item) => item.type === 'Special').length;

    return (
        <main style={{ minHeight: '100vh', paddingBottom: '6rem', overflow: 'hidden' }}>
            <section style={{ paddingTop: '8rem', paddingBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '-4rem',
                        width: '18rem',
                        height: '18rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(255,209,59,0.24) 0%, rgba(255,209,59,0) 70%)',
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '3rem',
                        right: '-4rem',
                        width: '20rem',
                        height: '20rem',
                        borderRadius: '999px',
                        background: 'radial-gradient(circle, rgba(255,94,151,0.24) 0%, rgba(255,94,151,0) 70%)',
                    }}
                />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div
                        className="schedule-hero-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1.02fr) minmax(300px, 0.98fr)',
                            gap: '2rem',
                            alignItems: 'stretch',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="card-bubbly"
                            whileHover={{ y: -6 }}
                            style={{
                                background: 'linear-gradient(140deg, #fff9fb 0%, #fff7df 100%)',
                                boxShadow: '12px 12px 0px var(--c-blue)',
                            }}
                        >
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                                <span className="pill pill-purple">
                                    <CalendarDays style={{ width: 14, height: 14 }} /> Jadwal Levi
                                </span>
                                <span className="pill" style={{ background: 'var(--c-white)' }}>
                                    <Sparkles style={{ width: 14, height: 14 }} /> {scheduleItems.length} Events
                                </span>
                            </div>

                            <p className="subhead" style={{ marginBottom: '0.6rem' }}>Schedule Desk</p>
                            <h1 className="head title-stroke" style={{ fontSize: 'clamp(3rem, 7vw, 5.4rem)', marginBottom: '1rem' }}>
                                SHOW CALENDAR
                            </h1>
                            <p style={{ fontSize: '1.08rem', fontWeight: 600, lineHeight: 1.75, maxWidth: '42rem', marginBottom: '1.5rem' }}>
                                Jadwal Perform, Event, dan Theater JKT48.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
                                {[
                                    { label: 'Next Up', value: nextEvent ? `${nextEvent.date} ${nextEvent.day}` : 'TBA', color: 'var(--c-pink)' },
                                    { label: 'Special Show', value: `${specialCount} events`, color: 'var(--c-yellow)' },
                                    { label: 'Main Venue', value: 'JKT48 Theater', color: 'var(--c-blue)' },
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
                                            borderRadius: '20px',
                                            padding: '1rem',
                                            boxShadow: `6px 6px 0px ${item.color}`,
                                        }}
                                    >
                                        <p className="subhead" style={{ color: 'var(--c-text-muted)', marginBottom: '0.3rem' }}>{item.label}</p>
                                        <p style={{ fontWeight: 800 }}>{item.value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="card-bubbly"
                            whileHover={{ y: -6 }}
                            style={{
                                background: 'linear-gradient(160deg, #fff8fb 0%, #ffeec6 100%)',
                                color: 'var(--c-text)',
                                boxShadow: '12px 12px 0px var(--c-yellow)',
                            }}
                        >
                            <p className="subhead" style={{ color: 'var(--c-pink)', marginBottom: '0.75rem' }}>Next Highlight</p>
                            {nextEvent ? (
                                <>
                                    <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', lineHeight: 1.1, marginBottom: '1rem' }}>
                                        {nextEvent.title}
                                    </h2>
                                    <div style={{ display: 'grid', gap: '0.85rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                            <CalendarDays style={{ width: 18, height: 18, color: 'var(--c-pink)' }} />
                                            <span style={{ fontWeight: 700 }}>{nextEvent.date} {nextEvent.day}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                            <Clock3 style={{ width: 18, height: 18, color: 'var(--c-purple)' }} />
                                            <span style={{ fontWeight: 700 }}>{nextEvent.time}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                            <MapPin style={{ width: 18, height: 18, color: 'var(--c-blue)' }} />
                                            <span style={{ fontWeight: 700 }}>{nextEvent.location}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div style={{ padding: '1rem 0' }}>
                                    <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', lineHeight: 1.2, marginBottom: '0.6rem', color: 'var(--c-text-muted)' }}>
                                        Belum ada jadwal bulan ini 🌸
                                    </h2>
                                    <p style={{ fontWeight: 600, color: 'var(--c-text-muted)', lineHeight: 1.65 }}>
                                        Stay tuned! Jadwal event Levi berikutnya akan segera diumumkan.
                                    </p>
                                </div>
                            )}

                            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1.4rem' }}>
                                {Object.entries(TYPE_COLOR).map(([type, config], index) => (
                                    <motion.div
                                        key={type}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.22 + index * 0.08 }}
                                        whileHover={{ x: 4 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            padding: '0.8rem 1rem',
                                            borderRadius: '18px',
                                            background: 'rgba(255,255,255,0.72)',
                                            border: '3px solid var(--c-text)',
                                        }}
                                    >
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
                                            <Star style={{ width: 14, height: 14, color: config.bg }} />
                                            {type}
                                        </span>
                                        <span className="subhead" style={{ color: 'var(--c-text)' }}>
                                            {scheduleItems.filter((item) => item.type === type).length} item
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '1rem' }}>
                <div className="container" style={{ maxWidth: '980px' }}>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
                        {Object.entries(TYPE_COLOR).map(([type, config]) => (
                            <div
                                key={type}
                                className="pill"
                                style={{
                                    background: config.bg,
                                    color: config.text,
                                    boxShadow: `3px 3px 0px ${config.shadow}`,
                                }}
                            >
                                <Zap style={{ width: 14, height: 14 }} /> {type}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {isLoading ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card-bubbly"
                                style={{
                                    textAlign: 'center',
                                    padding: '3.5rem 2rem',
                                    background: 'linear-gradient(140deg, #fff9fb 0%, #fff7df 100%)',
                                    boxShadow: '10px 10px 0px var(--c-blue)',
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗓️</div>
                                <h3 className="head" style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>
                                    Memuat Jadwal Otomatis
                                </h3>
                                <p style={{ fontWeight: 600, color: 'var(--c-text-muted)', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>
                                    Lagi ambil data terbaru dari API JKT48 Showroom.
                                </p>
                            </motion.div>
                        ) : hasEvents ? scheduleItems.map((item, index) => {
                            const typeStyle = TYPE_COLOR[item.type] || TYPE_COLOR.Theater;

                            return (
                                <motion.div
                                    key={`${item.title}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ x: 4 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ delay: index * 0.05 }}
                                    className="schedule-item-grid"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '96px minmax(0, 1fr) auto',
                                        gap: '1rem',
                                        alignItems: 'center',
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ y: -6, rotate: -1 }}
                                        style={{
                                            background: typeStyle.bg,
                                            color: typeStyle.text,
                                            border: '4px solid var(--c-text)',
                                            borderRadius: '28px',
                                            minHeight: '96px',
                                            display: 'grid',
                                            placeItems: 'center',
                                            boxShadow: `8px 8px 0px ${typeStyle.shadow}`,
                                        }}
                                    >
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', lineHeight: 1, fontWeight: 900 }}>{item.date}</div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>{item.day}</div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="card-bubbly"
                                        whileHover={{ y: -6 }}
                                        style={{
                                            background: index % 2 === 0 ? 'var(--c-white)' : '#fffaf4',
                                            boxShadow: `10px 10px 0px ${typeStyle.shadow}`,
                                            padding: '1.4rem',
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.8rem' }}>
                                            <span
                                                className="pill"
                                                style={{
                                                    background: typeStyle.bg,
                                                    color: typeStyle.text,
                                                    boxShadow: 'none',
                                                }}
                                            >
                                                <Sparkles style={{ width: 14, height: 14 }} /> {item.type}
                                            </span>
                                            {item.note && (
                                                <span className="pill" style={{ background: 'var(--c-white)', boxShadow: 'none' }}>
                                                    <Tag style={{ width: 14, height: 14 }} /> {item.note}
                                                </span>
                                            )}
                                            {item.url && !item.isDirectTicketLink && (
                                                <span className="pill" style={{ background: '#fff5d6', boxShadow: 'none' }}>
                                                    <Tag style={{ width: 14, height: 14 }} /> Link tiket langsung belum tersedia
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="head" style={{ fontSize: '1.45rem', marginBottom: '0.9rem' }}>{item.title}</h3>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontWeight: 700, color: 'var(--c-text-muted)' }}>
                                                <Clock3 style={{ width: 16, height: 16, color: 'var(--c-purple)' }} />
                                                {item.time}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontWeight: 700, color: 'var(--c-text-muted)' }}>
                                                <MapPin style={{ width: 16, height: 16, color: 'var(--c-blue)' }} />
                                                {item.location}
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div className="hidden-mobile">
                                        {item.url ? (
                                            <motion.a
                                                href={item.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                whileHover={{ rotate: 8, scale: 1.05, y: -2 }}
                                                title={item.isDirectTicketLink ? 'Beli tiket' : 'Buka jadwal theater'}
                                                aria-label={item.isDirectTicketLink ? 'Beli tiket' : 'Buka jadwal theater'}
                                                style={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: '50%',
                                                    border: '3px solid var(--c-text)',
                                                    background: 'var(--c-yellow)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '4px 4px 0px var(--c-text)',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Ticket style={{ width: 22, height: 22, color: 'var(--c-text)' }} />
                                            </motion.a>
                                        ) : (
                                            <div
                                                style={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: '50%',
                                                    border: '3px solid var(--c-text-muted)',
                                                    background: 'var(--c-bg)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    opacity: 0.5,
                                                }}
                                                title="Tiket belum / tidak tersedia"
                                            >
                                                <Ticket style={{ width: 22, height: 22, color: 'var(--c-text-muted)' }} />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        }) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card-bubbly"
                                style={{
                                    textAlign: 'center',
                                    padding: '3.5rem 2rem',
                                    background: 'linear-gradient(140deg, #fff9fb 0%, #fff7df 100%)',
                                    boxShadow: '10px 10px 0px var(--c-pink-light)',
                                }}
                            >
                                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🌸</div>
                                <h3 className="head" style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>
                                    {errorMessage ? 'Gagal Memuat Jadwal' : 'Belum Ada Jadwal Bulan Ini'}
                                </h3>
                                <p style={{ fontWeight: 600, color: 'var(--c-text-muted)', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>
                                    {errorMessage || 'Jadwal event Levi berikutnya belum diumumkan. Stay tuned dan pantau terus kanal resmi JKT48 untuk update terbaru ya!'}
                                </p>
                            </motion.div>
                        )}
                    </div>

                    <motion.div className="card-bubbly" whileHover={{ y: -4 }} style={{ marginTop: '2rem', background: '#fff7fb', boxShadow: '10px 10px 0px var(--c-pink-light)' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--c-text-muted)', textAlign: 'center' }}>
                            * Jadwal ini masih bisa berubah sewaktu-waktu. Untuk info paling valid, tetap cek kanal resmi JKT48 ya.
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
