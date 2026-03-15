import { GALLERY, MEDIA_ITEMS } from '../data';
import { getSupabaseClient } from './supabase';

export type GalleryItem = {
  id: string;
  image_url: string;
  label: string;
  sort_order: number;
};

export type MediaItem = {
  id: string;
  type: 'video' | 'article';
  title: string;
  source: string;
  date_label: string;
  thumb_url: string;
  url: string;
  sort_order: number;
};

export type HashtagItem = {
  id: string;
  tag: string;
  description: string;
  color: string;
  sort_order: number;
};

export type ShowMetricItem = {
  id: string;
  label: string;
  value: string;
  description: string;
  color: string;
  sort_order: number;
};

type InsertPayload<T> = Omit<T, 'id'> & { id?: string };

const fallbackHashtags: HashtagItem[] = [
  { id: '1', tag: '#SobatSahur', description: 'Tag untuk sahur', color: 'var(--c-pink)', sort_order: 1 },
  { id: '2', tag: '#LeVriday', description: 'Tag untuk hari Jumat', color: 'var(--c-purple)', sort_order: 2 },
  { id: '3', tag: '#TakjilLevi', description: 'Tag untuk berbuka puasa', color: 'var(--c-blue)', sort_order: 3 },
  { id: '4', tag: '#NgewaroLevi', description: 'Tag untuk balas PM', color: 'var(--c-yellow)', sort_order: 4 },
  { id: '5', tag: '#LevReport', description: 'Tag untuk update aktivitas', color: 'var(--c-emerald)', sort_order: 5 },
  { id: '6', tag: '#PassiOnFire', description: 'Tag untuk Team Passion', color: 'var(--c-orange)', sort_order: 6 },
  { id: '7', tag: '#SobatYuhu', description: 'Tag untuk menyapa Levi di X', color: 'var(--c-cyan)', sort_order: 7 },
];

const fallbackShowMetrics: ShowMetricItem[] = [
  { id: 'total-show', label: 'Total Show', value: '77', description: 'Penampilan di JKT48 Theater', color: 'var(--c-pink)', sort_order: 1 },
  { id: 'setlist', label: 'Setlist Dilakukan', value: '6', description: 'Berbagai setlist berbeda', color: 'var(--c-purple)', sort_order: 2 },
  { id: 'senshuuraku', label: 'Senshuuraku', value: '2', description: 'Show penutup setlist', color: 'var(--c-blue)', sort_order: 3 },
  { id: 'shonichi', label: 'Shonichi', value: '5', description: 'Show perdana setlist baru', color: 'var(--c-yellow)', sort_order: 4 },
  { id: 'mv-terlibat', label: 'MV Terlibat', value: '1', description: 'Music Video resmi', color: 'var(--c-orange)', sort_order: 5 },
];

const fallbackGallery: GalleryItem[] = GALLERY.map((item, index) => ({
  id: String(index + 1),
  image_url: item.src,
  label: item.label,
  sort_order: index + 1,
}));

const fallbackMedia: MediaItem[] = MEDIA_ITEMS.map((item, index) => ({
  id: String(index + 1),
  type: item.type,
  title: item.title,
  source: item.source,
  date_label: item.date,
  thumb_url: item.thumb,
  url: item.url,
  sort_order: index + 1,
}));

async function fetchRows<T>(table: string, fallback: T[]) {
  const client = getSupabaseClient();
  if (!client) {
    return fallback;
  }

  const { data, error } = await client.from(table).select('*').order('sort_order', { ascending: true });
  if (error || !data || data.length === 0) {
    return fallback;
  }

  return data as T[];
}

async function upsertRow<T>(table: string, payload: InsertPayload<T>) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase belum dikonfigurasi');
  }

  const { error } = await client.from(table).upsert(payload).select().single();
  if (error) {
    throw error;
  }
}

async function deleteRow(table: string, id: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase belum dikonfigurasi');
  }

  const { error } = await client.from(table).delete().eq('id', id);
  if (error) {
    throw error;
  }
}

export function getYoutubeThumbnail(url: string) {
  const patterns = [
    /v=([^&]+)/u,
    /youtu\.be\/([^?&/]+)/u,
    /embed\/([^?&/]+)/u,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
  }

  return '';
}

export async function fetchGalleryItems() {
  return fetchRows<GalleryItem>('gallery_items', fallbackGallery);
}

export async function fetchMediaItems() {
  return fetchRows<MediaItem>('media_items', fallbackMedia);
}

export async function fetchHashtags() {
  return fetchRows<HashtagItem>('hashtags', fallbackHashtags);
}

export async function fetchShowMetrics() {
  return fetchRows<ShowMetricItem>('show_metrics', fallbackShowMetrics);
}

export async function saveGalleryItem(payload: InsertPayload<GalleryItem>) {
  await upsertRow<GalleryItem>('gallery_items', payload);
}

export async function saveMediaItem(payload: InsertPayload<MediaItem>) {
  await upsertRow<MediaItem>('media_items', payload);
}

export async function saveHashtagItem(payload: InsertPayload<HashtagItem>) {
  await upsertRow<HashtagItem>('hashtags', payload);
}

export async function saveShowMetricItem(payload: InsertPayload<ShowMetricItem>) {
  await upsertRow<ShowMetricItem>('show_metrics', payload);
}

export async function removeGalleryItem(id: string) {
  await deleteRow('gallery_items', id);
}

export async function removeMediaItem(id: string) {
  await deleteRow('media_items', id);
}

export async function removeHashtagItem(id: string) {
  await deleteRow('hashtags', id);
}

export async function removeShowMetricItem(id: string) {
  await deleteRow('show_metrics', id);
}
