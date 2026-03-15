import { NavLink } from 'react-router-dom';
import { Heart, Instagram, Music, Twitter, Youtube } from 'lucide-react';
import { MEMBER } from '../data';

const NAV_LINKS = [
    { name: 'Home', to: '/' },
    { name: 'Biodata', to: '/about' },
    { name: 'Galeri', to: '/gallery' },
    { name: 'Media', to: '/media' },
    { name: 'Jadwal', to: '/schedule' },
];

const SOCIALS = [
    { name: 'Instagram', href: MEMBER.social.instagram, icon: <Instagram style={{ width: 18, height: 18 }} />, color: 'var(--c-pink)' },
    { name: 'X', href: MEMBER.social.x, icon: <Twitter style={{ width: 18, height: 18 }} />, color: 'var(--c-text)' },
    { name: 'TikTok', href: MEMBER.social.tiktok, icon: <Music style={{ width: 18, height: 18 }} />, color: 'var(--c-purple)' },
    { name: 'YouTube', href: MEMBER.social.youtube, icon: <Youtube style={{ width: 18, height: 18 }} />, color: 'var(--c-blue)' },
];

export default function Footer() {
    return (
        <footer
            style={{
                position: 'relative',
                overflow: 'hidden',
                marginTop: '2rem',
                padding: '3.5rem 0 1.5rem',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, #fff8ea 100%)',
                borderTop: '4px solid var(--c-text)',
            }}
        >
            <div className="container">
                <div
                    className="footer-simple-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
                        gap: '1.25rem',
                        alignItems: 'center',
                    }}
                >
                    <div
                        className="card-bubbly"
                        style={{
                            background: 'linear-gradient(135deg, #fffafd 0%, #fff5db 100%)',
                            boxShadow: '10px 10px 0px var(--c-pink-light)',
                        }}
                    >
                        <p className="subhead" style={{ color: 'var(--c-pink)', marginBottom: '0.5rem' }}>Levi Archive</p>
                        <h2 className="head" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '0.75rem' }}>
                            {MEMBER.firstName} {MEMBER.lastName}
                        </h2>
                        <p style={{ fontWeight: 600, lineHeight: 1.75, color: 'var(--c-text-muted)', maxWidth: '38rem' }}>
                            Landing page sederhana untuk lihat biodata, galeri, media, dan jadwal dalam satu tempat.
                        </p>
                    </div>

                    <div
                        className="card-bubbly"
                        style={{
                            background: 'rgba(255,255,255,0.88)',
                            boxShadow: '10px 10px 0px var(--c-blue)',
                            padding: '1.5rem',
                        }}
                    >
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div className="footer-nav-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                                {NAV_LINKS.map((link) => (
                                    <NavLink
                                        key={link.name}
                                        to={link.to}
                                        style={({ isActive }) => ({
                                            textDecoration: 'none',
                                            padding: '0.65rem 0.95rem',
                                            borderRadius: '999px',
                                            border: '2px solid var(--c-text)',
                                            background: isActive ? 'var(--c-yellow)' : 'var(--c-white)',
                                            color: 'var(--c-text)',
                                            fontFamily: 'var(--font-head)',
                                            fontSize: '0.95rem',
                                            fontWeight: 800,
                                            boxShadow: isActive ? 'none' : '3px 3px 0px var(--c-text)',
                                            transform: isActive ? 'translate(3px, 3px)' : 'translate(0, 0)',
                                        })}
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>

                            <div className="footer-social-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                                {SOCIALS.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.name}
                                        title={social.name}
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: '50%',
                                            border: '3px solid var(--c-text)',
                                            background: social.color,
                                            color: 'var(--c-white)',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textDecoration: 'none',
                                            boxShadow: '3px 3px 0px var(--c-text)',
                                        }}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="footer-credit-bar"
                    style={{
                        marginTop: '1.25rem',
                        paddingTop: '1.25rem',
                        borderTop: '3px dashed var(--c-pink-light)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--c-text-muted)' }}>
                        © {new Date().getFullYear()} Michelle Levia
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--c-text-muted)' }}>
                        Built with love <Heart style={{ width: 14, height: 14, color: 'var(--c-pink)', fill: 'var(--c-pink)' }} /> By Rizz.
                    </span>
                </div>
            </div>
        </footer>
    );
}
