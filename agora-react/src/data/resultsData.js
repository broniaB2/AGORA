/** Published results demo payload */
export const resultsByKey = {
  city: {
    name: 'Kampala City Council Elections',
    published: '25 Apr 2025, 6:00 PM',
    totalVoters: 18200,
    votesCast: 12430,
    turnoutPct: 68,
    precincts: [
      { name: 'Nakawa', turnout: 72 },
      { name: 'Makindye', turnout: 65 },
      { name: 'Kawempe', turnout: 67 },
      { name: 'Central', turnout: 71 },
      { name: 'Rubaga', turnout: 60 },
    ],
    posts: [
      {
        id: 'nakawa',
        label: 'Nakawa Division',
        candidates: [
          { name: 'Sarah Nalwanga', initials: 'SN', color: '#2d7a4f', votes: 3842 },
          { name: 'David Ssemanda', initials: 'DS', color: '#1a7fdb', votes: 2981 },
          { name: 'Peter Onyango', initials: 'PO', color: '#0e4a85', votes: 2104 },
          { name: 'Faith Nakato', initials: 'FN', color: '#4a2db5', votes: 1876 },
          { name: 'Brian Kato', initials: 'BK', color: '#8a5200', votes: 1627 },
        ],
      },
      {
        id: 'makindye',
        label: 'Makindye Division',
        candidates: [
          { name: 'Aisha Mugisha', initials: 'AM', color: '#2d7a4f', votes: 2210 },
          { name: 'Grace Atim', initials: 'GA', color: '#1362b0', votes: 1843 },
          { name: 'Moses Ssali', initials: 'MS', color: '#9b2020', votes: 1187 },
        ],
      },
      {
        id: 'kawempe',
        label: 'Kawempe Division',
        candidates: [
          { name: 'Jane Nantongo', initials: 'JN', color: '#2d7a4f', votes: 1740 },
          { name: 'Kevin Mugabi', initials: 'KM', color: '#4a2db5', votes: 1420 },
        ],
      },
    ],
  },
  health: {
    name: 'District Health Officer Selection',
    published: '5 May 2025, 6:00 PM',
    totalVoters: 340,
    votesCast: 298,
    turnoutPct: 88,
    precincts: [
      { name: 'Panel A', turnout: 90 },
      { name: 'Panel B', turnout: 85 },
      { name: 'Panel C', turnout: 88 },
    ],
    posts: [
      {
        id: 'dho',
        label: 'District Health Officer',
        candidates: [
          { name: 'Dr. Ruth Nambi', initials: 'RN', color: '#2d7a4f', votes: 168 },
          { name: 'Dr. James Wamala', initials: 'JW', color: '#1362b0', votes: 82 },
          { name: 'Dr. Mary Akello', initials: 'MA', color: '#8a5200', votes: 48 },
        ],
      },
    ],
  },
  guild: {
    name: 'Makerere Student Guild 2025',
    published: '1 May 2025, 10:00 PM',
    totalVoters: 8400,
    votesCast: 5820,
    turnoutPct: 69,
    precincts: [
      { name: 'Arts & Soc Sci', turnout: 74 },
      { name: 'Engineering', turnout: 68 },
      { name: 'Medicine', turnout: 72 },
      { name: 'Business', turnout: 62 },
    ],
    posts: [
      {
        id: 'gp',
        label: 'Guild President',
        candidates: [
          { name: 'Linda Auma', initials: 'LA', color: '#9b2020', votes: 2340 },
          { name: 'Kevin Mugabi', initials: 'KM', color: '#4a2db5', votes: 2188 },
          { name: 'Tom Onen', initials: 'TO', color: '#0e4a85', votes: 1292 },
        ],
      },
      {
        id: 'gs',
        label: 'Guild Secretary',
        candidates: [
          { name: 'Carol Nakiganda', initials: 'CN', color: '#2d7a4f', votes: 3240 },
          { name: 'Paul Mwanje', initials: 'PM', color: '#8a5200', votes: 2580 },
        ],
      },
    ],
  },
}
