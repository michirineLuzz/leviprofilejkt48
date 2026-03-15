const DEFAULT_SCHEDULE_API_URL = 'https://admin.jkt48showroom-api.my.id/schedules';
const DEFAULT_NEXT_SCHEDULE_API_URL = 'https://api.crstlnz.my.id/api/next_schedule';

export type RemoteMember = {
  name?: string;
  stage_name?: string;
};

export type RemoteSchedule = {
  _id?: string;
  liveId?: string;
  showDate?: string;
  showTime?: string;
  isBirthdayShow?: boolean;
  birthdayMember?: string | { name?: string; stage_name?: string } | null;
  isComingSoon?: boolean;
  isGraduationShow?: boolean;
  graduateMember?: string | { name?: string; stage_name?: string } | null;
  setlist?: {
    name?: string;
    originalName?: string;
    description?: string;
  } | null;
  ticketShowroom?: string;
  ticketTheater?: string;
  memberList?: RemoteMember[];
};

export type RemoteNextSchedule = {
  date?: string;
  title?: string;
  url?: string;
};

export type ScheduleItem = {
  id: string;
  date: string;
  day: string;
  title: string;
  type: string;
  time: string;
  location: string;
  note?: string;
  url?: string;
  isDirectTicketLink?: boolean;
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function memberMatches(member: RemoteMember, memberNames: string[]) {
  const stageName = normalizeText(member.stage_name || '');
  const fullName = normalizeText(member.name || '');
  const targets = memberNames.map(normalizeText).filter(Boolean);

  return targets.some((target) => target === stageName || target === fullName);
}

function getScheduleTimestamp(schedule: RemoteSchedule) {
  if (!schedule.showDate) {
    return Number.MAX_SAFE_INTEGER;
  }

  const time = schedule.showTime || '00:00';
  const timestamp = new Date(`${schedule.showDate.slice(0, 10)}T${time}:00+07:00`).getTime();
  return Number.isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : timestamp;
}

function getTodayJakartaTimestamp() {
  const now = new Date();
  const jakartaNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  return jakartaNow.getTime();
}

const dayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  timeZone: 'Asia/Jakarta',
});

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  timeZone: 'Asia/Jakarta',
});

const isoDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function getScheduleApiUrl() {
  return import.meta.env.VITE_SCHEDULE_API_URL || DEFAULT_SCHEDULE_API_URL;
}

function getNextScheduleApiUrl() {
  return import.meta.env.VITE_NEXT_SCHEDULE_API_URL || DEFAULT_NEXT_SCHEDULE_API_URL;
}

function isTheaterUrl(url: string | undefined) {
  return typeof url === 'string' && url.startsWith('https://jkt48.com/theater/');
}

function toAbsoluteJkt48Url(url: string | undefined) {
  if (!url) {
    return undefined;
  }

  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url;
  }

  if (url.startsWith('/')) {
    return `https://jkt48.com${url}`;
  }

  return undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getMemberName(member: string | { name?: string; stage_name?: string } | null | undefined) {
  if (!member) return '';
  if (typeof member === 'string') return member;
  return member.stage_name || member.name || '';
}

function normalizeScheduleTitle(value: string) {
  return normalizeText(value.replace(/^\d{1,2}[:.]\d{2}\s*/u, ''));
}

function getScheduleDateKey(schedule: RemoteSchedule) {
  if (!schedule.showDate) {
    return '';
  }

  const date = new Date(schedule.showDate);
  return Number.isNaN(date.getTime()) ? '' : isoDateFormatter.format(date);
}

function getNextScheduleDateKey(schedule: RemoteNextSchedule) {
  if (!schedule.date) {
    return '';
  }

  const date = new Date(schedule.date);
  return Number.isNaN(date.getTime()) ? '' : isoDateFormatter.format(date);
}

function getNextScheduleTime(title: string | undefined) {
  const matched = title?.match(/^(\d{1,2}[:.]\d{2})/u)?.[1];
  return matched ? matched.replace('.', ':') : '';
}

function buildNextScheduleLookup(nextSchedules: RemoteNextSchedule[]) {
  const lookup = new Map<string, string>();

  for (const schedule of nextSchedules) {
    const dateKey = getNextScheduleDateKey(schedule);
    const timeKey = getNextScheduleTime(schedule.title);
    const titleKey = normalizeScheduleTitle(schedule.title || '');
    const url = toAbsoluteJkt48Url(schedule.url);

    if (!dateKey || !titleKey || !url) {
      continue;
    }

    lookup.set(`${dateKey}|${timeKey}|${titleKey}`, url);
  }

  return lookup;
}

function getScheduleType(schedule: RemoteSchedule) {
  if (schedule.isBirthdayShow || schedule.isGraduationShow) {
    return 'Special';
  }

  const originalName = schedule.setlist?.originalName?.toLowerCase() || '';
  const title = schedule.setlist?.name?.toLowerCase() || '';

  if (originalName.includes('event') || title.includes('event') || schedule.isComingSoon) {
    return 'Event';
  }

  return 'Theater';
}

function buildScheduleNote(schedule: RemoteSchedule, isMemberScheduled: boolean) {
  const notes: string[] = [];

  if (isMemberScheduled) {
    notes.push('Levi tampil');
  }

  if (schedule.isBirthdayShow) {
    const memberName = getMemberName(schedule.birthdayMember);
    notes.push(memberName ? `Birthday Show ${memberName}` : 'Birthday Show');
  }

  if (schedule.isGraduationShow) {
    const memberName = getMemberName(schedule.graduateMember);
    notes.push(memberName ? `Graduation Show ${memberName}` : 'Graduation Show');
  }

  if (schedule.isComingSoon) {
    notes.push('Coming Soon');
  }

  return notes.join(' • ') || undefined;
}

function mapSchedule(
  schedule: RemoteSchedule,
  memberKeywords: string[],
  nextScheduleLookup: Map<string, string>,
) {
  const eventDate = schedule.showDate ? new Date(schedule.showDate) : null;
  const memberList = Array.isArray(schedule.memberList) ? schedule.memberList : [];
  const isMemberScheduled = memberList.some((member) => memberMatches(member, memberKeywords));
  const title = schedule.setlist?.name || schedule.setlist?.originalName || 'JKT48 Show';
  const directTicketUrl = nextScheduleLookup.get(
    `${getScheduleDateKey(schedule)}|${schedule.showTime || ''}|${normalizeScheduleTitle(title)}`,
  );
  const ticketUrl = directTicketUrl || schedule.ticketTheater || undefined;

  return {
    id: schedule._id || schedule.liveId || `${schedule.showDate || 'unknown'}-${schedule.showTime || 'tba'}`,
    date: eventDate ? dateFormatter.format(eventDate) : 'TBA',
    day: eventDate ? dayFormatter.format(eventDate) : 'TBA',
    title,
    type: getScheduleType(schedule),
    time: schedule.showTime ? `${schedule.showTime} WIB` : 'TBA',
    location: 'JKT48 Theater',
    note: buildScheduleNote(schedule, isMemberScheduled),
    url: ticketUrl,
    isDirectTicketLink: Boolean(directTicketUrl),
  } satisfies ScheduleItem;
}

export function filterSchedulesForMember(schedules: RemoteSchedule[], memberNames: string[]) {
  return schedules.filter((schedule) => {
    if (!isTheaterUrl(schedule.ticketTheater)) {
      return false;
    }

    const memberList = Array.isArray(schedule.memberList) ? schedule.memberList : [];
    return memberList.some((member) => memberMatches(member, memberNames));
  });
}

export async function fetchScheduleItems(memberNames: string[]) {
  const [response, nextScheduleResponse] = await Promise.all([
    fetch(getScheduleApiUrl()),
    fetch(getNextScheduleApiUrl()),
  ]);

  if (!response.ok) {
    throw new Error(`Schedule API error: ${response.status}`);
  }

  if (!nextScheduleResponse.ok) {
    throw new Error(`Next schedule API error: ${nextScheduleResponse.status}`);
  }

  const [payload, nextSchedulePayload]: [unknown, unknown] = await Promise.all([
    response.json(),
    nextScheduleResponse.json(),
  ]);

  if (!Array.isArray(payload)) {
    throw new Error('Invalid schedule payload');
  }

  if (!Array.isArray(nextSchedulePayload)) {
    throw new Error('Invalid next schedule payload');
  }

  const schedules = payload.filter(isObject) as RemoteSchedule[];
  const nextSchedules = nextSchedulePayload.filter(isObject) as RemoteNextSchedule[];
  const memberSchedules = filterSchedulesForMember(schedules, memberNames);
  const todayTimestamp = getTodayJakartaTimestamp();
  const nextScheduleLookup = buildNextScheduleLookup(nextSchedules);

  return memberSchedules
    .filter((schedule) => getScheduleTimestamp(schedule) >= todayTimestamp)
    .sort((left, right) => getScheduleTimestamp(left) - getScheduleTimestamp(right))
    .slice(0, 1)
    .map((schedule) => mapSchedule(schedule, memberNames, nextScheduleLookup));
}
