import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <main style={{ background: 'var(--c-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="card-bubbly" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px', background: 'var(--c-white)', border: '4px solid var(--c-text)', boxShadow: '15px 15px 0px var(--c-blue)' }}>
                
                <div className="head title-stroke" style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', lineHeight: 0.8, marginBottom: '1rem' }}>
                    404
                </div>
                
                <div style={{ display: 'inline-block', background: 'var(--c-yellow)', padding: '0.5rem 1.5rem', borderRadius: '100px', border: '3px solid var(--c-text)', boxShadow: '4px 4px 0px var(--c-pink)', marginBottom: '2rem', transform: 'rotate(-2deg)' }}>
                    <span className="head" style={{ fontSize: '1.5rem', color: 'var(--c-text)' }}>Halaman Hilang!</span>
                </div>
                
                <p style={{ color: 'var(--c-text-muted)', marginBottom: '3rem', fontSize: '1.2rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                    Wah, halamannya nyasar ke universe lain nih! Kita periksa halaman lain aja yuk!
                </p>
                
                <Link to="/" style={{ display: 'inline-block', background: 'var(--c-pink)', color: 'var(--c-white)', textDecoration: 'none', border: '3px solid var(--c-text)', padding: '1rem 2.5rem', borderRadius: '100px', fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 900, boxShadow: '6px 6px 0px var(--c-purple)', transition: 'all 0.2s' }}>
                    &larr; KEMBALI KE BERANDA
                </Link>
            </div>
        </main>
    );
}
