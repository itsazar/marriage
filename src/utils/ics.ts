/**
 * Build and trigger a download of an .ics calendar invite.
 * Times are written as floating local time (India Standard Time on the day).
 */

/** [year, month(1-12), day, hour(24h), minute] */
export type IcsTime = [number, number, number, number, number]

type IcsEvent = {
  title: string
  start: IcsTime
  end: IcsTime
  description?: string
  location?: string
  fileName?: string
}

const VENUE = 'Chennai Island Beach Resort, Muttukadu, East Coast Road, Chennai, Tamil Nadu'

function fmt([y, mo, d, h, mi]: IcsTime) {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${y}${p(mo)}${p(d)}T${p(h)}${p(mi)}00`
}

function escapeText(s: string) {
  return s.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n')
}

/** Build and download an .ics calendar invite for any event. */
export function downloadEventIcs({ title, start, end, description, location, fileName }: IcsEvent) {
  const uid = `${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}@wedding.local`
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lavanya & Azar//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escapeText(title)}`,
    description ? `DESCRIPTION:${escapeText(description)}` : '',
    location ? `LOCATION:${escapeText(location)}` : '',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(title)} tomorrow!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName ?? 'event.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** Convenience: the wedding-day invite used by the hero "Save the Date". */
export function downloadWeddingIcs() {
  downloadEventIcs({
    title: 'Lavanya & Azar — Wedding',
    start: [2026, 9, 13, 5, 0],
    end: [2026, 9, 13, 7, 0],
    description:
      'The sacred vows at dawn, as the sun rises over the Bay of Bengal. #LavanyaWedsAzar',
    location: VENUE,
    fileName: 'Lavanya-Azar-Wedding.ics',
  })
}
