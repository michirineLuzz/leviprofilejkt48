import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, Menu, Sparkles, X } from 'lucide-react';

const NAV_LINKS = [
    { name: 'HOME', to: '/' },
    { name: 'BIODATA', to: '/about' },
    { name: 'GALERI', to: '/gallery' },
    { name: 'MEDIA', to: '/media' },
    { name: 'JADWAL', to: '/schedule' },
    { name: 'LIVE', to: '/live' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            if (currentScrollY > lastScrollY && currentScrollY > 90) {
                setVisible(false);
                setOpen(false);
            } else if (currentScrollY < lastScrollY) {
                setVisible(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            style={{
                position: 'fixed',
                inset: '0 0 auto 0',
                zIndex: 100,
                padding: scrolled ? '0.8rem 0' : '1.2rem 0',
                transform: visible ? 'translateY(0)' : 'translateY(-140%)',
                transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), padding 0.25s ease',
            }}
        >
            <div className="container">
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        padding: scrolled ? '0.7rem 1rem' : '0.85rem 1.1rem',
                        borderRadius: '999px',
                        border: '4px solid var(--c-text)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,248,252,0.98) 100%)',
                        boxShadow: scrolled ? '0 14px 40px rgba(65,42,52,0.16)' : '8px 8px 0px var(--c-pink-light)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <NavLink
                        to="/"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', minWidth: 0 }}
                    >
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                border: '3px solid var(--c-text)',
                                background: 'var(--c-pink)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '3px 3px 0px var(--c-text)',
                                flexShrink: 0,
                            }}
                        >
                            <Heart style={{ width: 20, height: 20, color: 'var(--c-white)', fill: 'var(--c-white)' }} />
                        </div>

                        <div style={{ display: 'grid', minWidth: 0 }}>
                            <span className="head" style={{ fontSize: '1.25rem', lineHeight: 1 }}>Michelle Levia</span>
                            <span className="subhead" style={{ color: 'var(--c-text-muted)', fontSize: '0.68rem' }}>
                                12th Generation
                            </span>
                        </div>
                    </NavLink>

                    <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                style={({ isActive }) => ({
                                    textDecoration: 'none',
                                    padding: '0.7rem 1rem',
                                    borderRadius: '999px',
                                    border: '3px solid var(--c-text)',
                                    background: isActive ? 'var(--c-yellow)' : 'rgba(255,255,255,0.72)',
                                    color: 'var(--c-text)',
                                    fontFamily: 'var(--font-head)',
                                    fontWeight: 800,
                                    fontSize: '0.9rem',
                                    boxShadow: isActive ? 'none' : '3px 3px 0px transparent',
                                    transform: isActive ? 'translate(3px, 3px)' : 'translate(0, 0)',
                                    transition: 'all 0.18s ease',
                                })}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                padding: '0.6rem 0.9rem',
                                borderRadius: '999px',
                                border: '3px solid var(--c-text)',
                                background: 'var(--c-purple)',
                                color: 'var(--c-white)',
                                boxShadow: '4px 4px 0px var(--c-pink-light)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                            }}
                        >
                            Archive Levi
                        </div>
                    </div>

                    <button
                        type="button"
                        className="show-mobile"
                        onClick={() => setOpen((value) => !value)}
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            border: '3px solid var(--c-text)',
                            background: open ? 'var(--c-pink)' : 'var(--c-yellow)',
                            color: open ? 'var(--c-white)' : 'var(--c-text)',
                            boxShadow: '3px 3px 0px var(--c-text)',
                            cursor: 'pointer',
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        {open ? <X style={{ width: 20, height: 20, strokeWidth: 3 }} /> : <Menu style={{ width: 20, height: 20, strokeWidth: 3 }} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="show-mobile"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 'auto',
                            right: '0',
                            width: '280px',
                            maxWidth: 'calc(100vw - 2rem)',
                            marginTop: '0.8rem',
                            display: 'none',
                        }}
                    >
                        <div
                            style={{
                                background: 'linear-gradient(180deg, #fffafd 0%, #fff6dc 100%)',
                                border: '4px solid var(--c-text)',
                                borderRadius: '32px',
                                padding: '1.5rem',
                                boxShadow: '12px 12px 0px var(--c-pink-light)',
                                display: 'grid',
                                gap: '0.8rem',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '0.55rem 1rem',
                                    borderRadius: '12px',
                                    border: '3px solid var(--c-text)',
                                    background: 'var(--c-white)',
                                    width: '100%',
                                    marginBottom: '0.4rem'
                                }}
                            >
                                <span className="subhead" style={{ color: 'var(--c-text)', margin: 0, fontSize: '0.85rem' }}>Quick Menu</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
                                {NAV_LINKS.map((link) => (
                                    <NavLink
                                        key={link.name}
                                        to={link.to}
                                        style={({ isActive }) => ({
                                            textDecoration: 'none',
                                            padding: '1.25rem',
                                            borderRadius: '16px',
                                            border: '4px solid var(--c-text)',
                                            background: isActive ? 'var(--c-blue)' : 'var(--c-white)',
                                            color: isActive ? 'var(--c-white)' : 'var(--c-text)',
                                            boxShadow: isActive ? 'none' : '6px 6px 0px var(--c-text)',
                                            transform: isActive ? 'translate(6px, 6px)' : 'translate(0, 0)',
                                            fontFamily: 'var(--font-head)',
                                            fontWeight: 900,
                                            fontSize: '1.2rem',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        })}
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
