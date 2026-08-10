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
export const countdownTarget = new Date(2026, 8, 13, 6, 0, 0) // Sep 13, 2026, 6:00 AM

export const heroTagline = 'Two souls, one shore, forever entwined.'

export const events = [
  {
    id: 'reception',
    name: 'Reception',
    tamilName: 'வரவேற்பு',
    date: 'Saturday, September 12',
    time: '7:00 PM – 9:00 PM',
    blurb: 'An evening of music, feasting and celebration under the coastal stars.',
    icon: 'sparkles',
    // Calendar invite times: [year, month(1-12), day, hour(24h), minute]
    start: [2026, 9, 12, 19, 0],
    end: [2026, 9, 12, 21, 0],
    dressCode: {
      label: 'Festive & Glam',
      hint: 'Jewel tones, flowy fabrics',
      colors: ['#7b2d3a', '#c9a24b', '#0e807b'],
    },
  },
  {
    id: 'wedding',
    name: 'The Wedding',
    tamilName: 'திருமணம்',
    date: 'Sunday, September 13',
    time: '6:00 AM – 7:00 AM',
    blurb: 'A Hindu-style ceremony — the sacred vows at dawn, as the sun rises over the Bay of Bengal.',
    icon: 'rings',
    start: [2026, 9, 13, 6, 0],
    end: [2026, 9, 13, 7, 0],
    dressCode: {
      label: 'Traditional & Beach-formal',
      hint: 'Soft pastels, breezy silks',
      colors: ['#f6ece0', '#e07a5f', '#f2a65a'],
    },
  },
  {
    id: 'walima',
    name: 'The Walima',
    tamilName: 'வலீமா',
    date: 'Thursday, September 17',
    time: '12:00 PM – 3:00 PM',
    blurb: 'A Muslim-style Walima feast in Gannavaram, Telangana — good food and blessings to celebrate the union.',
    icon: 'sparkles',
    start: [2026, 9, 17, 12, 0],
    end: [2026, 9, 17, 15, 0],
    dressCode: {
      label: 'Traditional & Elegant',
      hint: 'Rich hues, festive attire',
      colors: ['#0e807b', '#c9a24b', '#7b2d3a'],
    },
  },
]

// Playful "His vs Hers" flip cards in the Meet the Couple section.
export const coupleFacts = {
  bride: {
    name: 'Lavanya',
    role: 'The Bride',
    tagline: 'Sunshine with a stubborn streak',
    facts: [
      { q: 'Superpower', a: 'Winning every argument 😎' },
      { q: 'Weakness', a: 'Street shopping & bargaining' },
      { q: 'Always', a: 'Right (allegedly)' },
      { q: 'Says sorry', a: "Never — she's never wrong" },
    ],
  },
  groom: {
    name: 'Azar',
    role: 'The Groom',
    tagline: 'Calm, charming, hopelessly in love',
    facts: [
      { q: 'Superpower', a: 'Losing debates gracefully 🏆' },
      { q: 'Weakness', a: 'Her smile (every single time)' },
      { q: 'Always', a: 'The designated driver' },
      { q: 'Says sorry', a: 'First — for the sake of peace' },
    ],
  },
}

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
  gettingThere: [
    { icon: 'plane', title: 'By Air', detail: "Chennai Int'l Airport (MAA) — about a 40 min drive south." },
    { icon: 'car', title: 'By Road', detail: 'Right on the ECR — roughly 30 min from the city centre.' },
    { icon: 'parking', title: 'Parking', detail: 'Free, secure on-site parking for all our guests.' },
    { icon: 'bed', title: 'Stay', detail: 'Resort rooms & several ECR hotels within a short drive.' },
  ],
}

// Sample well-wishes seeded into the guestbook wall.
export const guestbookSeed = [
  { name: 'Priya', message: "So happy for you both! Can't wait to dance at the wedding 💃" },
  { name: 'Karthik', message: '20 years in the making — worth every second. Congrats!' },
  { name: 'Meera', message: 'A beach wedding at sunrise? Iconic. See you there ❤️' },
]

// Gallery photos. Files live in `public/gallery/` and are served from the site root.
// To swap a photo, just replace the matching file in that folder (keep the same name).
export const gallery = [
  { src: '/gallery/1.jpg', caption: 'Where it all began' },
  { src: '/gallery/2.jpg', caption: 'Seeking blessings' },
  { src: '/gallery/3.jpg', caption: 'Us, today' },
  { src: '/gallery/4.jpg', caption: 'A rose & a smile' },
  { src: '/gallery/5.jpg', caption: 'Just us' },
  { src: '/gallery/6.jpg', caption: 'Coffee & us' },
  { src: '/gallery/7.jpg', caption: 'Evenings out' },
]

// Paste your Google Form link here when ready.
export const rsvpFormUrl = 'https://forms.gle/your-google-form-id'
export const rsvpDeadline = 'Kindly respond before September 1st'

// ---------------------------------------------------------------------------
//  Two Traditions, One Love — a little guide to both celebrations.
// ---------------------------------------------------------------------------
export const traditions = {
  intro:
    'Two faiths, two beautiful traditions, one shared love. A little guide to what each celebration means to us.',
  items: [
    {
      id: 'hindu',
      motif: 'kolam' as const,
      title: 'Hindu Wedding',
      subtitle: 'Chennai · September 13',
      lines: [
        'A dawn ceremony (muhurtham) where sacred vows are exchanged before the holy fire.',
        'Kolam art, jasmine flowers, the tying of the thaali, and seven steps taken together as one.',
      ],
      note: 'Come as you are — your blessings are all we ask you to bring.',
    },
    {
      id: 'walima',
      motif: 'arabesque' as const,
      title: 'Muslim Walima',
      subtitle: 'Gannavaram, Telangana · September 17',
      lines: [
        'The Walima is the celebratory feast that follows the nikah, sharing our joy far and wide.',
        'A warm gathering of good food, blessings and duas for a happy, blessed married life.',
      ],
      note: 'Modest, festive attire is lovely — and hearty appetites are very welcome.',
    },
  ],
}

// ---------------------------------------------------------------------------
//  Songs of Our Story — the soundtrack to twenty years of us.
// ---------------------------------------------------------------------------
export const playlist = {
  note: 'The soundtrack to twenty years of us. Press play and fall in love with us all over again.',
  // Optional: paste a Spotify playlist embed URL (…/embed/playlist/ID) to show a live player.
  spotifyEmbedUrl: '',
  songs: [
    { title: 'Thangamey', artist: 'Justin Prabhakaran (Paava Kadhaigal)', mood: 'The first spark', src: '/audio/thangamey.mp3' },
    { title: 'A Million Dreams', artist: 'The Greatest Showman', mood: 'Dreaming of us', src: '/audio/a-million-dreams.mp3' },
    { title: 'Perfect', artist: 'Ed Sheeran', mood: 'Made for each other', src: '/audio/perfect.mp3' },
    { title: 'A Thousand Years', artist: 'Christina Perri', mood: 'The long wait', src: '/audio/a-thousand-years.mp3' },
    { title: 'Mudhal Nee Mudivum Nee', artist: 'Sid Sriram', mood: 'You, the beginning & the end', src: '/audio/mudhal-nee-mudivum-nee.mp3' },
  ],
}

// ---------------------------------------------------------------------------
//  Travel & Stay — events span two cities this time.
// ---------------------------------------------------------------------------
export const travelStay = [
  {
    id: 'chennai',
    city: 'Chennai, Tamil Nadu',
    forEvents: 'Reception & Wedding · Sep 12–13',
    icon: 'beach' as const,
    tips: [
      "Fly into Chennai Int'l Airport (MAA), about 40 min from the venue.",
      'The venue sits on the ECR — cabs and autos are easy to find.',
      'Plenty of resort rooms and ECR hotels for a beachside stay.',
    ],
  },
  {
    id: 'gannavaram',
    city: 'Gannavaram, Telangana',
    forEvents: 'Walima · Sep 17',
    icon: 'palm' as const,
    tips: [
      'Nearest hub is Vijayawada — well connected by train and road.',
      'Vijayawada Airport (VGA) is the closest for flyers.',
      'We’ll share a list of nearby stays as the date draws near.',
    ],
  },
]

// ---------------------------------------------------------------------------
//  Frequently Asked Questions.
// ---------------------------------------------------------------------------
export const faqs = [
  {
    q: 'Can I bring my children?',
    a: 'Absolutely — little ones make every celebration merrier. Do let us know in your RSVP so we can plan.',
  },
  {
    q: 'What should I wear?',
    a: 'Festive and comfortable. The wedding is a breezy beach morning, so soft fabrics work best; the Walima calls for modest, elegant attire.',
  },
  {
    q: 'Do I need to attend all the events?',
    a: 'Join us for whatever you can — every moment you share with us means the world.',
  },
  {
    q: 'Are gifts expected?',
    a: 'Your presence is the only gift we hope for. If you’d still like to bless us, your love and good wishes are more than enough.',
  },
  {
    q: 'Whom do I contact for help?',
    a: 'Reach out to the family contacts shared on your invitation, and we’ll be glad to assist.',
  },
]
