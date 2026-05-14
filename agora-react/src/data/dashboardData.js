/** Cards on the dashboard — demo only */
export const dashboardElectionPreview = [
  {
    id: 1,
    icon: '🏙️',
    title: 'Kampala City Council Elections',
    org: 'Electoral Commission of Uganda',
    status: 'live',
    statusLabel: 'Live',
  },
  {
    id: 2,
    icon: '🏥',
    title: 'District Health Officer Selection',
    org: 'Kampala Health Authority',
    status: 'applying',
    statusLabel: 'Applying',
  },
  {
    id: 3,
    icon: '🎓',
    title: 'Makerere Student Guild 2025',
    org: 'Makerere University',
    status: 'upcoming',
    statusLabel: 'Upcoming',
  },
  {
    id: 4,
    icon: '🌿',
    title: 'Community Development Chair',
    org: 'Rubaga Community Board',
    status: 'closed',
    statusLabel: 'Closed',
  },
]

export const timelineItems = [
  { done: true, active: false, text: 'Nomination window opened', date: '10 Apr 2025' },
  { done: true, active: false, text: 'AI screening complete — 612 of 847 processed', date: '18 Apr 2025' },
  { done: false, active: true, text: 'Voting in progress — City Council Elections', date: '20–25 Apr 2025' },
  { done: false, active: false, text: 'Results published automatically at deadline', date: '25 Apr 2025, 6 PM' },
]

export const dashboardStatsByRole = {
  citizen: [
    { icon: '🗳️', num: '3', label: 'Upcoming votes', trend: '↑ 1 new this week' },
    { icon: '✅', num: '7', label: 'Votes cast', trend: 'All verified' },
    { icon: '📋', num: '2', label: 'My applications', trend: 'In screening' },
    { icon: '📊', num: '94%', label: 'Participation rate', trend: '↑ 4% vs last cycle' },
  ],
  commission: [
    { icon: '📂', num: '847', label: 'Total applications', trend: '↑ 124 since yesterday' },
    { icon: '🤖', num: '612', label: 'AI screened', trend: '72% complete' },
    { icon: '⏳', num: '5', label: 'Needs review', trend: 'Action needed' },
    { icon: '🗳️', num: '3', label: 'Live elections', trend: 'All running normally' },
  ],
  candidate: [
    { icon: '🗳️', num: '1,247', label: 'Votes received', trend: '↑ 89 in last hour' },
    { icon: '📊', num: '2nd', label: 'Current position', trend: 'Out of 5 candidates' },
    { icon: '👥', num: '68%', label: 'Turnout so far', trend: 'Above district average' },
    { icon: '⏱️', num: '14h', label: 'Voting time left', trend: 'Closes 25 Apr, 6 PM' },
  ],
}

export const dashboardNotificationsByRole = {
  citizen: [
    { text: 'Voting opens for Kampala City Council on 25 April.', time: '2 hours ago', read: false },
    { text: 'Your application for District Health Officer has been received.', time: 'Yesterday', read: false },
    { text: 'Results for Community Dev. Chair have been published.', time: '3 days ago', read: true },
  ],
  commission: [
    { text: 'AI agent flagged 5 applications with incomplete documents.', time: '1 hour ago', read: false },
    { text: 'Application window for City Council closes in 48 hours.', time: '3 hours ago', read: false },
    { text: 'Results for Student Guild have been auto-published.', time: '2 days ago', read: true },
  ],
  candidate: [
    { text: "You've moved up to 2nd place in City Council results.", time: '45 min ago', read: false },
    { text: '500 voters have cast ballots in your constituency.', time: '2 hours ago', read: false },
    { text: 'Your application was approved by the Commission.', time: '5 days ago', read: true },
  ],
}
