# Levi Fan Site CMS

Website profile Levi JKT48 dengan:

- halaman publik `Home`, `About`, `Gallery`, `Media`, `Schedule`
- dashboard admin di `/admin`
- CMS berbasis Supabase untuk gallery, media YouTube, artikel, hashtag, dan statistik show
- deploy siap untuk Netlify

## Fitur Admin

Dashboard admin sekarang bisa dipakai untuk:

- menambahkan gambar gallery
- menambahkan media video YouTube
- menambahkan artikel
- menambahkan hashtag
- mengubah statistik `Total Show`, `Setlist Dilakukan`, `Senshuuraku`, `Shonichi`, `MV Terlibat`

Kalau Supabase belum diisi, halaman publik tetap pakai fallback data lokal supaya situs tidak kosong.

## Stack

- React 19
- Vite
- React Router
- Supabase JS
- Netlify

## Jalankan Lokal

1. Install dependency:

```bash
npm install
```

2. Copy env:

```bash
copy .env.example .env.local
```

3. Isi minimal env ini:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_SCHEDULE_API_URL=https://admin.jkt48showroom-api.my.id/schedules
VITE_NEXT_SCHEDULE_API_URL=https://api.crstlnz.my.id/api/next_schedule
VITE_IDN_LIVES_API_URL=https://api.crstlnz.my.id/api/idn_lives
VITE_SHOWROOM_LIVES_API_URL=https://jkt48showroom-api.my.id/api/rooms/onlives
```

4. Jalankan:

```bash
npm run dev
```

## Setup Supabase

### 1. Buat project

Di Supabase dashboard:

1. Buat project baru
2. Buka `Project Settings > API`
3. Copy:
   - `Project URL`
   - `anon public key`

### 2. Buat tabel

Jalankan SQL di file [schema.sql](./supabase/schema.sql) lewat `SQL Editor` Supabase.

Tabel yang dibuat:

- `gallery_items`
- `media_items`
- `hashtags`
- `show_metrics`

Policy yang dipasang:

- read: `anon` dan `authenticated`
- write: `authenticated`

Jadi visitor biasa bisa baca konten, tapi hanya admin login yang bisa edit.

### 3. Buat user admin

Di Supabase:

1. buka `Authentication > Users`
2. klik `Add user`
3. buat email + password untuk admin

Akun ini dipakai login di `/admin`.

## Cara Pakai Dashboard Admin

1. buka `/admin`
2. login dengan user Supabase Auth
3. edit section:
   - `Gallery`
   - `Media & Artikel`
   - `Hashtag`
   - `Show Stats`
4. klik `Simpan`

Catatan:

- untuk video YouTube, isi `Content URL` dengan link YouTube
- tombol `Ambil Thumbnail YouTube` akan generate thumbnail otomatis
- artikel tetap masuk lewat section `Media & Artikel`, cukup pilih tipe `article`

## Deploy ke Netlify

### 1. Push project ke GitHub

Commit project ini ke repository GitHub dulu.

### 2. Import ke Netlify

Di Netlify:

1. klik `Add new site`
2. pilih `Import an existing project`
3. connect ke GitHub repo kamu

### 3. Build settings

Isi:

- Build command: `npm run build`
- Publish directory: `dist`

### 4. Environment variables

Di `Site configuration > Environment variables`, isi:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SCHEDULE_API_URL`
- `VITE_NEXT_SCHEDULE_API_URL`
- `VITE_IDN_LIVES_API_URL`
- `VITE_SHOWROOM_LIVES_API_URL`

Nilai default API:

```env
VITE_SCHEDULE_API_URL=https://admin.jkt48showroom-api.my.id/schedules
VITE_NEXT_SCHEDULE_API_URL=https://api.crstlnz.my.id/api/next_schedule
VITE_IDN_LIVES_API_URL=https://api.crstlnz.my.id/api/idn_lives
VITE_SHOWROOM_LIVES_API_URL=https://jkt48showroom-api.my.id/api/rooms/onlives
```

### 5. SPA redirect

File [public/_redirects](./public/_redirects) sudah dibuat:

```txt
/* /index.html 200
```

Ini penting supaya route seperti `/about`, `/schedule`, dan `/admin` tetap jalan saat refresh di Netlify.

### 6. Deploy

Klik deploy. Setelah build selesai:

- halaman publik akan live
- `/admin` bisa dipakai login

## Deploy ke Vercel

Sama seperti Netlify, project ini juga sudah siap untuk di-deploy ke Vercel.

### 1. Import ke Vercel

1. Buka dashboard Vercel
2. Klik `Add New...` > `Project`
3. Import dari repository GitHub kamu

### 2. Konfigurasi
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

### 3. Environment Variables
Buka section `Environment Variables`. Masukkan variable yang sama dengan yang ada di atas (terutama `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`).

### 4. SPA Route Setting
File [vercel.json](./vercel.json) sudah ditambahkan di root folder supaya ketika me-refresh halaman `/about` atau `/admin` tidak menyebabkan error 404.

### 5. Deploy
Klik deploy dan tunggu proses build selesai.

## SEO (Sitemap & Robots.txt)

Project ini telah dilengkapi dengan pengaturan dasar SEO menggunakan `robots.txt` dan `sitemap.xml` yang berlokasi di dalam folder `public/`.

- `robots.txt`: Mengizinkan Googlebot melacak halaman publik dan melarang halaman `/admin` agar tidak masuk mesin pencari.
- `sitemap.xml`: Memberikan pemetaan website kamu yang mencakup root URL, About, Gallery, Media, dan Schedule.

**Penting:** Jika kamu sudah memiliki domain (contoh: *levijkt48.com*), disarankan agar membuka file `public/robots.txt` dan `public/sitemap.xml`, lalu mengganti tulisan `https://YOUR_DOMAIN.com` dengan domain milikmu.

## Struktur Data CMS

### `gallery_items`

- `id`
- `image_url`
- `label`
- `sort_order`

### `media_items`

- `id`
- `type` -> `video` atau `article`
- `title`
- `source`
- `date_label`
- `thumb_url`
- `url`
- `sort_order`

### `hashtags`

- `id`
- `tag`
- `description`
- `color`
- `sort_order`

### `show_metrics`

- `id`
- `label`
- `value`
- `description`
- `color`
- `sort_order`

## Route Penting

- `/` -> home
- `/about` -> profile Levi
- `/gallery` -> gallery
- `/media` -> media dan artikel
- `/schedule` -> jadwal otomatis
- `/admin` -> dashboard admin

## Validasi Lokal

Project ini sudah lolos:

```bash
npm run lint
npm run build
```
