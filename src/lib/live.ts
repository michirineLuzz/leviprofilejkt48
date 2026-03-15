const DEFAULT_IDN_LIVES_API_URL = 'https://api.crstlnz.my.id/api/idn_lives';
const DEFAULT_SHOWROOM_LIVES_API_URL = 'https://jkt48showroom-api.my.id/api/rooms/onlives';

export type LiveStatus = {
  isLive: boolean;
  platform: 'IDN Live' | 'Showroom' | null;
  title?: string;
  url?: string;
};

type UnknownRecord = Record<string, unknown>;

function getIdnLivesApiUrl() {
  return import.meta.env.VITE_IDN_LIVES_API_URL || DEFAULT_IDN_LIVES_API_URL;
}

function getShowroomLivesApiUrl() {
  return import.meta.env.VITE_SHOWROOM_LIVES_API_URL || DEFAULT_SHOWROOM_LIVES_API_URL;
}

function isObject(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function toStringValue(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function findFirstString(record: UnknownRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return '';
}

function memberMatches(record: UnknownRecord, memberNames: string[]) {
  const getValues = (obj: UnknownRecord): string[] => {
    let results: string[] = [];
    const keysToSearch = ['name', 'member_name', 'main_name', 'title', 'username', 'idn_username', 'room_url_key', 'url_key', 'slug'];

    for (const key of keysToSearch) {
      if (typeof obj[key] === 'string') results.push(obj[key] as string);
    }

    // Cek nested object spt 'user' atau 'creator'
    if (isObject(obj.user)) results = [...results, ...getValues(obj.user as UnknownRecord)];
    if (isObject(obj.creator)) results = [...results, ...getValues(obj.creator as UnknownRecord)];

    return results;
  };

  const candidates = getValues(record).map(normalizeText).filter(Boolean);
  const targets = memberNames.map(normalizeText).filter(Boolean);

  return candidates.some((candidate) =>
    targets.some((target) => candidate.includes(target) || target.includes(candidate))
  );
}

function buildAbsoluteUrl(url: string) {
  if (!url) return undefined;
  if (url.startsWith('https://') || url.startsWith('http://')) return url;
  if (url.startsWith('/')) return `https://www.showroom-live.com${url}`;
  return undefined;
}

function extractIdnLiveStatus(payload: unknown, memberNames: string[]): LiveStatus | null {
  if (!Array.isArray(payload)) {
    return null;
  }

  for (const item of payload) {
    if (!isObject(item) || !memberMatches(item, memberNames)) {
      continue;
    }

    // Ambil data dari nested 'user' kalau ada (ciri khas IDN)
    const user = isObject(item.user) ? (item.user as UnknownRecord) : null;
    const username = toStringValue(user?.username || item.username || item.idn_username);
    const slug = toStringValue(item.slug);
    const title = findFirstString(item, ['title']) || findFirstString(user || {}, ['name', 'username']) || 'Levi sedang live di IDN';

    // Format URL IDN: https://www.idn.app/username/live/slug
    const url = username && slug
      ? `https://www.idn.app/${username}/live/${slug}`
      : findFirstString(item, ['url', 'link', 'share_url']);

    return {
      isLive: true,
      platform: 'IDN Live',
      title,
      url: url || undefined,
    };
  }

  return null;
}

function extractShowroomLiveStatus(payload: unknown, memberNames: string[]): LiveStatus | null {
  if (!isObject(payload) || !Array.isArray(payload.data)) {
    return null;
  }

  for (const item of payload.data) {
    if (!isObject(item) || !memberMatches(item, memberNames)) {
      continue;
    }

    const directUrl = findFirstString(item, ['url', 'web_url', 'share_url', 'room_url']);
    const roomKey = findFirstString(item, ['room_url_key', 'url_key']);

    return {
      isLive: true,
      platform: 'Showroom',
      title: findFirstString(item, ['title', 'name', 'room_name']) || 'Levi sedang live di Showroom',
      url: directUrl || buildAbsoluteUrl(roomKey ? `/r/${roomKey}` : '') || undefined,
    };
  }

  return null;
}

export async function fetchLeviLiveStatus(memberNames: string[]) {
  const [idnResponse, showroomResponse] = await Promise.all([
    fetch(getIdnLivesApiUrl()),
    fetch(getShowroomLivesApiUrl()),
  ]);

  if (!idnResponse.ok) {
    throw new Error(`IDN lives API error: ${idnResponse.status}`);
  }

  if (!showroomResponse.ok) {
    throw new Error(`Showroom lives API error: ${showroomResponse.status}`);
  }

  const [idnPayload, showroomPayload]: [unknown, unknown] = await Promise.all([
    idnResponse.json(),
    showroomResponse.json(),
  ]);

  const idnLive = extractIdnLiveStatus(idnPayload, memberNames);
  if (idnLive) {
    return idnLive;
  }

  const showroomLive = extractShowroomLiveStatus(showroomPayload, memberNames);
  if (showroomLive) {
    return showroomLive;
  }

  return {
    isLive: false,
    platform: null,
  } satisfies LiveStatus;
}
