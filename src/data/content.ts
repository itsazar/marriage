// ---------------------------------------------------------------------------
//  Edit everything about the wedding here. No need to touch component files.
// ---------------------------------------------------------------------------

export const couple = {
  bride: 'Lavanya',
  groom: 'Azar',
  // The "&" pairing shown in the hero. Order: displayed as `${a} & ${b}`.
  displayA: 'Lavanya',
  displayB: 'Azar',
  hashtag: '#LavanyaWedsAzar',
}

// Target date/time the countdown ticks down to (the wedding muhurtham).
// Format: YYYY, monthIndex (0 = Jan), day, hour (24h), minute
export const countdownTarget = new Date(2026, 8, 13, 5, 0, 0) // Sep 13, 2026, 5:00 AM

export const heroTagline = 'Two souls, one shore, forever entwined.'

export const events = [
  {
    id: 'reception',
    name: 'Reception',
    tamilName: 'வரவேற்பு',
    date: 'Friday, September 12',
    time: '7:00 PM – 10:00 PM',
    blurb: 'An evening of music, feasting and celebration under the coastal stars.',
    icon: 'sparkles',
  },
  {
    id: 'wedding',
    name: 'The Wedding',
    tamilName: 'திருமணம்',
    date: 'Saturday, September 13',
    time: '5:00 AM – 7:00 AM',
    blurb: 'The sacred vows at dawn, as the sun rises over the Bay of Bengal.',
    icon: 'rings',
  },
]

export const loveStory = [
  {
    chapter: 'Chapter One',
    emoji: '🎒',
    icon: 'book',
    title: 'It Started at School',
    lines: [
      'So, we met way back in school. Same classrooms, same corridors, zero clue about what was coming.',
      'Just two kids, minding their own business… or so we thought.',
    ],
  },
  {
    chapter: 'Chapter Two',
    emoji: '⚔️',
    icon: 'clash',
    title: 'We Were Basically Enemies',
    lines: [
      'Plot twist: we could NOT stand each other. Total rivals.',
      'The kind who argue about everything just to win the argument.',
    ],
  },
  {
    chapter: 'Chapter Three',
    emoji: '🤝',
    icon: 'friends',
    title: 'Then… We Became Friends',
    lines: [
      'Somewhere between all the bickering, the fights turned into inside jokes.',
      'Enemies became friends — and honestly, the best kind of friends.',
    ],
  },
  {
    chapter: 'Chapter Four',
    emoji: '💜',
    icon: 'heart',
    title: 'And It Became More',
    lines: [
      "We didn't plan on falling for each other. It just kind of… happened.",
      'Slowly, over years of showing up for one another, friendship turned into love.',
    ],
  },
  {
    chapter: 'Chapter Five',
    emoji: '⏳',
    icon: 'hourglass',
    title: 'The Loooong Wait',
    lines: [
      'Different faiths, different worlds, and a whole lot of "not yet."',
      'For almost 20 years, we held on — stubborn, hopeful, and completely sure.',
    ],
  },
  {
    chapter: 'Chapter Six',
    emoji: '🎉',
    icon: 'celebrate',
    title: 'Our Families Said Yes',
    lines: [
      'With a lot of patience (and honestly, a few thousand prayers), our families came around.',
      'Two traditions, one big happy mess of love.',
    ],
  },
  {
    chapter: 'Chapter Seven',
    emoji: '💍',
    icon: 'ring',
    title: 'And Here We Are',
    lines: [
      "So… this is it. After all these years, we're finally doing it.",
      "And we'd love nothing more than to have you there.",
    ],
    finale: { date: '12 & 13 September 2026', names: 'Azar ❤️ Lavanya' },
  },
]

export const venue = {
  name: 'Chennai Island Beach Resort',
  area: 'Muttukadu, East Coast Road',
  city: 'Chennai, Tamil Nadu',
  // Directions button + embedded map both use this search query.
  mapsQuery: 'Chennai Island Beach Resort Muttukadu',
  note: 'Parking available on-site. Beachwear-friendly, but do carry a light shawl for the morning breeze.',
}

// Placeholder gallery. Replace `src` with your own photo URLs / imported images.
export const gallery = [
  { src: '', caption: 'The proposal' },
  { src: '', caption: 'Sun, sand & us' },
  { src: '', caption: 'Golden hour' },
  { src: '', caption: 'Together' },
  { src: '', caption: 'By the bay' },
  { src: '', caption: 'Forever begins' },
]

// Paste your Google Form link here when ready.
export const rsvpFormUrl = 'https://forms.gle/your-google-form-id'
export const rsvpDeadline = 'Kindly respond before September 1st'
