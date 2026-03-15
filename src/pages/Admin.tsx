import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ImagePlus, Hash, LayoutDashboard, LogOut, Newspaper, Save, Sparkles, Trash2, Video, Palette } from 'lucide-react';
import {
  fetchGalleryItems,
  fetchHashtags,
  fetchMediaItems,
  fetchShowMetrics,
  getYoutubeThumbnail,
  removeGalleryItem,
  removeHashtagItem,
  removeMediaItem,
  removeShowMetricItem,
  saveGalleryItem,
  saveHashtagItem,
  saveMediaItem,
  saveShowMetricItem,
  type GalleryItem,
  type HashtagItem,
  type MediaItem,
  type ShowMetricItem,
} from '../lib/cms';
import { getSupabaseClient, hasSupabaseConfig } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';

type SessionState = 'checking' | 'signed_out' | 'signed_in';

const cardStyle: CSSProperties = {
  background: 'var(--c-white)',
  boxShadow: '10px 10px 0px var(--c-blue)',
};

function uid() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  type = 'text',
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  type?: string;
}) {
  const commonStyle: CSSProperties = {
    width: '100%',
    border: '3px solid var(--c-text)',
    borderRadius: '16px',
    padding: '0.8rem 0.9rem',
    fontWeight: 700,
    background: 'var(--c-white)',
  };

  return (
    <label style={{ display: 'grid', gap: '0.45rem' }}>
      <span className="subhead" style={{ color: 'var(--c-text-muted)' }}>{label}</span>
      {multiline ? (
        <textarea value={String(value)} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={3} style={{ ...commonStyle, resize: 'vertical' }} />
      ) : (
        <input value={String(value)} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} style={commonStyle} />
      )}
    </label>
  );
}

function SectionShell({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card-bubbly" style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
        <div>
          <p className="subhead" style={{ color: 'var(--c-pink)', marginBottom: '0.35rem' }}>{title}</p>
          <p style={{ fontWeight: 700, color: 'var(--c-text-muted)' }}>{description}</p>
        </div>
        <div style={{ width: 52, height: 52, borderRadius: '18px', background: 'var(--c-yellow)', border: '3px solid var(--c-text)', display: 'grid', placeItems: 'center' }}>
          {icon}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function Admin() {
  const supabase = getSupabaseClient();
  const { themeColor, setThemeColor, availableColors } = useTheme();
  const [sessionState, setSessionState] = useState<SessionState>('checking');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [hashtags, setHashtags] = useState<HashtagItem[]>([]);
  const [showMetrics, setShowMetrics] = useState<ShowMetricItem[]>([]);

  useEffect(() => {
    if (!supabase) {
      setSessionState('signed_out');
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSessionState(data.session ? 'signed_in' : 'signed_out');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionState(session ? 'signed_in' : 'signed_out');
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (sessionState !== 'signed_in') {
      return;
    }

    void reloadAll();
  }, [sessionState]);

  async function reloadAll() {
    const [galleryData, mediaData, hashtagData, showMetricData] = await Promise.all([
      fetchGalleryItems(),
      fetchMediaItems(),
      fetchHashtags(),
      fetchShowMetrics(),
    ]);

    setGalleryItems(galleryData);
    setMediaItems(mediaData);
    setHashtags(hashtagData);
    setShowMetrics(showMetricData);
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;

    setIsSaving(true);
    setStatusMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsSaving(false);

    if (error) {
      setStatusMessage(error.message);
      return;
    }

    setStatusMessage('Login berhasil.');
  }

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  async function handleImportDefaults(type: 'gallery' | 'media' | 'hashtags' | 'metrics') {
    const { 
      fallbackGallery, 
      fallbackMedia, 
      fallbackHashtags, 
      fallbackShowMetrics 
    } = await import('../lib/cms');

    let itemsToSave: any[] = [];
    let saveFn: (item: any) => Promise<void>;

    if (type === 'gallery') { itemsToSave = fallbackGallery; saveFn = (item) => import('../lib/cms').then(m => m.saveGalleryItem(item)); }
    else if (type === 'media') { itemsToSave = fallbackMedia; saveFn = (item) => import('../lib/cms').then(m => m.saveMediaItem(item)); }
    else if (type === 'hashtags') { itemsToSave = fallbackHashtags; saveFn = (item) => import('../lib/cms').then(m => m.saveHashtagItem(item)); }
    else { itemsToSave = fallbackShowMetrics; saveFn = (item) => import('../lib/cms').then(m => m.saveShowMetricItem(item)); }

    setStatusMessage(`Sedang mengimpor data ${type}...`);
    setIsSaving(true);

    try {
      for (const item of itemsToSave) {
        await saveFn(item);
      }
      await reloadAll();
      setStatusMessage(`Berhasil mengimpor ${itemsToSave.length} data ${type}.`);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Gagal impor data');
    } finally {
      setIsSaving(false);
    }
  }

  async function runSave(action: () => Promise<void>, successMessage: string): Promise<boolean> {
    try {
      setIsSaving(true);
      setStatusMessage(null);
      await action();
      setStatusMessage(successMessage);
      return true;
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Terjadi error saat menyimpan');
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  if (!hasSupabaseConfig()) {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="card-bubbly" style={{ ...cardStyle, maxWidth: '760px', margin: '0 auto' }}>
            <p className="subhead" style={{ marginBottom: '0.6rem' }}>Admin Setup</p>
            <h1 className="head" style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>Supabase belum dikonfigurasi</h1>
            <p style={{ fontWeight: 600, lineHeight: 1.7 }}>
              Isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` dulu. Setelah itu halaman admin ini bisa dipakai buat login dan CRUD konten.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (sessionState !== 'signed_in') {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="container">
          <motion.form onSubmit={handleLogin} className="card-bubbly" style={{ ...cardStyle, maxWidth: '560px', margin: '0 auto', display: 'grid', gap: '1rem' }}>
            <div>
              <p className="subhead" style={{ marginBottom: '0.6rem' }}>Admin Login</p>
              <h1 className="head" style={{ fontSize: '2.6rem', marginBottom: '0.8rem' }}>Dashboard Levi CMS</h1>
              <p style={{ fontWeight: 600, color: 'var(--c-text-muted)', lineHeight: 1.7 }}>
                Login pakai akun Supabase Auth yang kamu buat untuk admin.
              </p>
            </div>
            <Field label="Email" value={email} onChange={setEmail} placeholder="admin@example.com" type="email" />
            <Field label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" />
            <button type="submit" className="btn btn-primary" disabled={isSaving} style={{ justifyContent: 'center' }}>
              <LayoutDashboard style={{ width: 18, height: 18 }} /> {isSaving ? 'Masuk...' : 'Masuk ke Dashboard'}
            </button>
            {statusMessage && <p style={{ fontWeight: 700, color: 'var(--c-pink)' }}>{statusMessage}</p>}
          </motion.form>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ display: 'grid', gap: '1.5rem' }}>
        <section className="card-bubbly" style={{ background: 'linear-gradient(135deg, #fff9fc 0%, #fff6dd 100%)', boxShadow: '12px 12px 0px var(--c-pink-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
                <span className="pill pill-purple"><Sparkles style={{ width: 14, height: 14 }} /> Supabase CMS</span>
                <span className="pill" style={{ background: 'var(--c-yellow)' }}><LayoutDashboard style={{ width: 14, height: 14 }} /> Admin</span>
              </div>
              <h1 className="head title-stroke" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.3rem)', marginBottom: '0.6rem' }}>LEVI ADMIN DASHBOARD</h1>
              <p style={{ fontWeight: 600, color: 'var(--c-text-muted)' }}>
                Kelola gallery, media YouTube, artikel, hashtag, dan statistik perform Levi dari satu tempat.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={async () => {
                  if (confirm('Ini akan memasukkan semua data bawaan Levi ke Supabase. Lanjutkan?')) {
                    await handleImportDefaults('gallery');
                    await handleImportDefaults('media');
                    await handleImportDefaults('hashtags');
                    await handleImportDefaults('metrics');
                    setStatusMessage('Semua data default berhasil di-import!');
                  }
                }} 
                className="btn btn-secondary" 
                style={{ background: 'var(--c-white)' }}
              >
                <Sparkles style={{ width: 18, height: 18, color: 'var(--c-pink)' }} /> Import Semua Data Default
              </button>
              <button type="button" onClick={handleLogout} className="btn btn-secondary">
                <LogOut style={{ width: 18, height: 18 }} /> Keluar
              </button>
            </div>
          </div>
          {statusMessage && <p style={{ marginTop: '1rem', fontWeight: 700, color: 'var(--c-pink)' }}>{statusMessage}</p>}
        </section>

        <SectionShell title="Theme Color" description="Pilih warna tema untuk website Levi." icon={<Palette style={{ width: 22, height: 22 }} />}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ fontWeight: 600, color: 'var(--c-text-muted)' }}>
              Pilih warna tema yang akan digunakan di seluruh website. Perubahan akan langsung terlihat.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.8rem' }}>
              {availableColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setThemeColor(color.value)}
                  style={{
                    padding: '1rem',
                    border: `3px solid ${themeColor === color.value ? 'var(--c-text)' : 'var(--c-gray)'}`,
                    borderRadius: '16px',
                    background: color.value,
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: themeColor === color.value ? '5px 5px 0px var(--c-text)' : '3px 3px 0px var(--c-gray)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    e.currentTarget.style.boxShadow = themeColor === color.value ? '7px 7px 0px var(--c-text)' : '5px 5px 0px var(--c-gray)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = themeColor === color.value ? '5px 5px 0px var(--c-text)' : '3px 3px 0px var(--c-gray)';
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'white', display: 'grid', placeItems: 'center' }}>
                    <Palette style={{ width: 20, height: 20, color: color.value }} />
                  </div>
                  <span style={{ fontSize: '0.85rem', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{color.name}</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: '0.5rem', padding: '1rem', background: 'var(--c-bg-surface)', border: '2px solid var(--c-text)', borderRadius: '12px' }}>
              <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Current Theme Color:</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '12px', background: themeColor, border: '3px solid var(--c-text)' }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{themeColor}</p>
                  <p style={{ fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '0.9rem' }}>
                    {availableColors.find(c => c.value === themeColor)?.name || 'Custom Color'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell title="Gallery" description="Tambah atau edit gambar gallery Levi." icon={<ImagePlus style={{ width: 22, height: 22 }} />}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {galleryItems.map((item, index) => (
              <div key={item.id} style={{ display: 'grid', gap: '0.8rem', padding: '1rem', border: '3px solid var(--c-text)', borderRadius: '22px', background: index % 2 === 0 ? 'var(--c-white)' : '#fffaf5' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                  <Field label="Label" value={item.label} onChange={(value) => setGalleryItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, label: value } : entry))} />
                  <Field label="Image URL" value={item.image_url} onChange={(value) => setGalleryItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, image_url: value } : entry))} />
                  <Field label="Urutan" value={item.sort_order} onChange={(value) => setGalleryItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, sort_order: Number(value) || 0 } : entry))} type="number" />
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-primary" disabled={isSaving} onClick={() => runSave(() => saveGalleryItem(item), 'Gallery berhasil disimpan.')}>
                    <Save style={{ width: 18, height: 18 }} /> Simpan
                  </button>
                  <button type="button" className="btn btn-secondary" disabled={isSaving} onClick={async () => {
                    if (await runSave(() => removeGalleryItem(item.id), 'Gallery berhasil dihapus.')) {
                      setGalleryItems((current) => current.filter((entry) => entry.id !== item.id));
                    }
                  }}>
                    <Trash2 style={{ width: 18, height: 18 }} /> Hapus
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setGalleryItems((current) => [...current, { id: uid(), label: 'Foto Levi', image_url: '', sort_order: current.length + 1 }])}>
                <ImagePlus style={{ width: 18, height: 18 }} /> Tambah Gambar
              </button>
              {galleryItems.length <= 1 && (
                <button type="button" className="btn btn-secondary" style={{ background: '#f0f0f0' }} onClick={() => handleImportDefaults('gallery')}>
                  Muat Gambar Bawaan
                </button>
              )}
            </div>
          </div>
        </SectionShell>

        <SectionShell title="Media & Artikel" description="Konten video YouTube dan artikel untuk halaman media." icon={<Video style={{ width: 22, height: 22 }} />}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {mediaItems.map((item, index) => (
              <div key={item.id} style={{ display: 'grid', gap: '0.8rem', padding: '1rem', border: '3px solid var(--c-text)', borderRadius: '22px', background: index % 2 === 0 ? 'var(--c-white)' : '#fffaf5' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                  <label style={{ display: 'grid', gap: '0.45rem' }}>
                    <span className="subhead" style={{ color: 'var(--c-text-muted)' }}>Tipe</span>
                    <select value={item.type} onChange={(event) => setMediaItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, type: event.target.value as MediaItem['type'] } : entry))} style={{ border: '3px solid var(--c-text)', borderRadius: '16px', padding: '0.8rem 0.9rem', fontWeight: 700 }}>
                      <option value="video">Video</option>
                      <option value="article">Article</option>
                    </select>
                  </label>
                  <Field label="Judul" value={item.title} onChange={(value) => setMediaItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, title: value } : entry))} />
                  <Field label="Source" value={item.source} onChange={(value) => setMediaItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, source: value } : entry))} />
                  <Field label="Date Label" value={item.date_label} onChange={(value) => setMediaItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, date_label: value } : entry))} />
                  <Field label="Content URL" value={item.url} onChange={(value) => setMediaItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, url: value } : entry))} />
                  <Field label="Thumbnail URL" value={item.thumb_url} onChange={(value) => setMediaItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, thumb_url: value } : entry))} />
                  <Field label="Urutan" value={item.sort_order} onChange={(value) => setMediaItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, sort_order: Number(value) || 0 } : entry))} type="number" />
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {item.type === 'video' && (
                    <button type="button" className="btn btn-secondary" onClick={() => setMediaItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, thumb_url: getYoutubeThumbnail(entry.url) || entry.thumb_url } : entry))}>
                      <Video style={{ width: 18, height: 18 }} /> Ambil Thumbnail YouTube
                    </button>
                  )}
                  <button type="button" className="btn btn-primary" disabled={isSaving} onClick={() => runSave(() => saveMediaItem(item), 'Media berhasil disimpan.')}>
                    <Save style={{ width: 18, height: 18 }} /> Simpan
                  </button>
                  <button type="button" className="btn btn-secondary" disabled={isSaving} onClick={async () => {
                    if (await runSave(() => removeMediaItem(item.id), 'Media berhasil dihapus.')) {
                      setMediaItems((current) => current.filter((entry) => entry.id !== item.id));
                    }
                  }}>
                    <Trash2 style={{ width: 18, height: 18 }} /> Hapus
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setMediaItems((current) => [...current, { id: uid(), type: 'video', title: '', source: 'YouTube', date_label: '', thumb_url: '', url: '', sort_order: current.length + 1 }])}>
                <Newspaper style={{ width: 18, height: 18 }} /> Tambah Media / Artikel
              </button>
              {mediaItems.length <= 1 && (
                <button type="button" className="btn btn-secondary" style={{ background: '#f0f0f0' }} onClick={() => handleImportDefaults('media')}>
                  Muat Media Bawaan
                </button>
              )}
            </div>
          </div>
        </SectionShell>

        <SectionShell title="Hashtag" description="Hashtag untuk section About Levi." icon={<Hash style={{ width: 22, height: 22 }} />}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {hashtags.map((item, index) => (
              <div key={item.id} style={{ display: 'grid', gap: '0.8rem', padding: '1rem', border: '3px solid var(--c-text)', borderRadius: '22px', background: index % 2 === 0 ? 'var(--c-white)' : '#fffaf5' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                  <Field label="Tag" value={item.tag} onChange={(value) => setHashtags((current) => current.map((entry) => entry.id === item.id ? { ...entry, tag: value } : entry))} />
                  <Field label="Deskripsi" value={item.description} onChange={(value) => setHashtags((current) => current.map((entry) => entry.id === item.id ? { ...entry, description: value } : entry))} />
                  <label style={{ display: 'grid', gap: '0.45rem' }}>
                    <span className="subhead" style={{ color: 'var(--c-text-muted)' }}>Warna</span>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <select 
                        value={item.color} 
                        onChange={(event) => setHashtags((current) => current.map((entry) => entry.id === item.id ? { ...entry, color: event.target.value } : entry))} 
                        style={{ flex: 1, border: '3px solid var(--c-text)', borderRadius: '16px', padding: '0.8rem 0.9rem', fontWeight: 700, background: 'var(--c-white)' }}
                      >
                        <option value="var(--c-pink)">Pink (Default)</option>
                        <option value="var(--c-purple)">Purple</option>
                        <option value="var(--c-blue)">Blue</option>
                        <option value="var(--c-yellow)">Yellow</option>
                        <option value="var(--c-orange)">Orange</option>
                        <option value="var(--c-emerald)">Emerald</option>
                        <option value="var(--c-cyan)">Cyan</option>
                        {availableColors.map(c => (
                          <option key={c.value} value={c.value}>{c.name}</option>
                        ))}
                      </select>
                      <div style={{ width: 48, borderRadius: '12px', border: '3px solid var(--c-text)', background: item.color }} />
                    </div>
                  </label>
                  <Field label="Urutan" value={item.sort_order} onChange={(value) => setHashtags((current) => current.map((entry) => entry.id === item.id ? { ...entry, sort_order: Number(value) || 0 } : entry))} type="number" />
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-primary" disabled={isSaving} onClick={() => runSave(() => saveHashtagItem(item), 'Hashtag berhasil disimpan.')}>
                    <Save style={{ width: 18, height: 18 }} /> Simpan
                  </button>
                  <button type="button" className="btn btn-secondary" disabled={isSaving} onClick={async () => {
                    if (await runSave(() => removeHashtagItem(item.id), 'Hashtag berhasil dihapus.')) {
                      setHashtags((current) => current.filter((entry) => entry.id !== item.id));
                    }
                  }}>
                    <Trash2 style={{ width: 18, height: 18 }} /> Hapus
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setHashtags((current) => [...current, { id: uid(), tag: '#HashtagBaru', description: '', color: 'var(--c-pink)', sort_order: current.length + 1 }])}>
                <Hash style={{ width: 18, height: 18 }} /> Tambah Hashtag
              </button>
              {hashtags.length <= 1 && (
                <button type="button" className="btn btn-secondary" style={{ background: '#f0f0f0' }} onClick={() => handleImportDefaults('hashtags')}>
                  Muat Hashtag Bawaan
                </button>
              )}
            </div>
          </div>
        </SectionShell>

        <SectionShell title="Show Stats" description="Edit total show, setlist, senshuuraku, shonichi, dan MV terlibat." icon={<LayoutDashboard style={{ width: 22, height: 22 }} />}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {showMetrics.map((item, index) => (
              <div key={item.id} style={{ display: 'grid', gap: '0.8rem', padding: '1rem', border: '3px solid var(--c-text)', borderRadius: '22px', background: index % 2 === 0 ? 'var(--c-white)' : '#fffaf5' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                  <Field label="Label" value={item.label} onChange={(value) => setShowMetrics((current) => current.map((entry) => entry.id === item.id ? { ...entry, label: value } : entry))} />
                  <Field label="Value" value={item.value} onChange={(value) => setShowMetrics((current) => current.map((entry) => entry.id === item.id ? { ...entry, value: value } : entry))} />
                  <Field label="Deskripsi" value={item.description} onChange={(value) => setShowMetrics((current) => current.map((entry) => entry.id === item.id ? { ...entry, description: value } : entry))} />
                  <label style={{ display: 'grid', gap: '0.45rem' }}>
                    <span className="subhead" style={{ color: 'var(--c-text-muted)' }}>Warna</span>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <select 
                        value={item.color} 
                        onChange={(event) => setShowMetrics((current) => current.map((entry) => entry.id === item.id ? { ...entry, color: event.target.value } : entry))} 
                        style={{ flex: 1, border: '3px solid var(--c-text)', borderRadius: '16px', padding: '0.8rem 0.9rem', fontWeight: 700, background: 'var(--c-white)' }}
                      >
                        <option value="var(--c-pink)">Pink</option>
                        <option value="var(--c-purple)">Purple</option>
                        <option value="var(--c-blue)">Blue (Default)</option>
                        <option value="var(--c-yellow)">Yellow</option>
                        <option value="var(--c-orange)">Orange</option>
                        <option value="var(--c-emerald)">Emerald</option>
                        <option value="var(--c-cyan)">Cyan</option>
                        {availableColors.map(c => (
                          <option key={c.value} value={c.value}>{c.name}</option>
                        ))}
                      </select>
                      <div style={{ width: 48, borderRadius: '12px', border: '3px solid var(--c-text)', background: item.color }} />
                    </div>
                  </label>
                  <Field label="Urutan" value={item.sort_order} onChange={(value) => setShowMetrics((current) => current.map((entry) => entry.id === item.id ? { ...entry, sort_order: Number(value) || 0 } : entry))} type="number" />
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-primary" disabled={isSaving} onClick={() => runSave(() => saveShowMetricItem(item), 'Show stat berhasil disimpan.')}>
                    <Save style={{ width: 18, height: 18 }} /> Simpan
                  </button>
                  <button type="button" className="btn btn-secondary" disabled={isSaving} onClick={async () => {
                    if (await runSave(() => removeShowMetricItem(item.id), 'Show stat berhasil dihapus.')) {
                      setShowMetrics((current) => current.filter((entry) => entry.id !== item.id));
                    }
                  }}>
                    <Trash2 style={{ width: 18, height: 18 }} /> Hapus
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowMetrics((current) => [...current, { id: uid(), label: 'Metric Baru', value: '0', description: '', color: 'var(--c-blue)', sort_order: current.length + 1 }])}>
                <LayoutDashboard style={{ width: 18, height: 18 }} /> Tambah Metric
              </button>
              {showMetrics.length <= 1 && (
                <button type="button" className="btn btn-secondary" style={{ background: '#f0f0f0' }} onClick={() => handleImportDefaults('metrics')}>
                  Muat Default Stats
                </button>
              )}
            </div>
          </div>
        </SectionShell>
      </div>
    </main>
  );
}
