/** Nested demo data for live voting UI */
export const votingElections = {
  city: {
    name: 'Kampala City Council',
    totalVoters: 18200,
    posts: [
      {
        id: 'nakawa',
        label: 'Nakawa',
        candidates: [
          { id: 1, name: 'Sarah Nalwanga', initials: 'SN', color: '#2d7a4f', votes: 1389 },
          { id: 2, name: 'David Ssemanda', initials: 'DS', color: '#1a7fdb', votes: 1247 },
          { id: 3, name: 'Peter Onyango', initials: 'PO', color: '#0e4a85', votes: 978 },
          { id: 4, name: 'Faith Nakato', initials: 'FN', color: '#4a2db5', votes: 431 },
          { id: 5, name: 'Brian Kato', initials: 'BK', color: '#8a5200', votes: 247 },
        ],
      },
      {
        id: 'makindye',
        label: 'Makindye',
        candidates: [
          { id: 6, name: 'Aisha Mugisha', initials: 'AM', color: '#2d7a4f', votes: 856 },
          { id: 7, name: 'Grace Atim', initials: 'GA', color: '#1362b0', votes: 743 },
          { id: 8, name: 'Moses Ssali', initials: 'MS', color: '#9b2020', votes: 420 },
        ],
      },
      {
        id: 'kawempe',
        label: 'Kawempe',
        candidates: [
          { id: 9, name: 'Jane Nantongo', initials: 'JN', color: '#2d7a4f', votes: 612 },
          { id: 10, name: 'Kevin Mugabi', initials: 'KM', color: '#4a2db5', votes: 488 },
        ],
      },
    ],
  },
  health: {
    name: 'District Health Officer',
    totalVoters: 340,
    posts: [
      {
        id: 'dho',
        label: 'Health Officer',
        candidates: [
          { id: 11, name: 'Dr. Ruth Nambi', initials: 'RN', color: '#2d7a4f', votes: 142 },
          { id: 12, name: 'Dr. James Wamala', initials: 'JW', color: '#1362b0', votes: 98 },
          { id: 13, name: 'Dr. Mary Akello', initials: 'MA', color: '#8a5200', votes: 54 },
        ],
      },
    ],
  },
  guild: {
    name: 'Student Guild 2025',
    totalVoters: 8400,
    posts: [
      {
        id: 'gp',
        label: 'President',
        candidates: [
          { id: 14, name: 'Linda Auma', initials: 'LA', color: '#9b2020', votes: 1840 },
          { id: 15, name: 'Kevin Mugabi', initials: 'KM', color: '#4a2db5', votes: 1622 },
          { id: 16, name: 'Tom Onen', initials: 'TO', color: '#0e4a85', votes: 890 },
        ],
      },
      {
        id: 'gs',
        label: 'Secretary',
        candidates: [
          { id: 17, name: 'Carol Nakiganda', initials: 'CN', color: '#2d7a4f', votes: 2140 },
          { id: 18, name: 'Paul Mwanje', initials: 'PM', color: '#8a5200', votes: 1230 },
        ],
      },
    ],
  },
}
