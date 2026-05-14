import React, { useMemo, useState } from 'react'
import { votingElections } from '../data/votingData.js'

const TABS = [
  { key: 'city', label: '🏙️ City Council' },
  { key: 'health', label: '🏥 Health Officer' },
  { key: 'guild', label: '🎓 Student Guild' },
]

export default function Voting() {
  const [tab, setTab] = useState('city')
  const [postIdx, setPostIdx] = useState(0)

  const bundle = votingElections[tab]
  const post = bundle.posts[postIdx]
  const totalVotes = useMemo(() => post.candidates.reduce((s, c) => s + c.votes, 0), [post])
  const max = Math.max(...post.candidates.map((c) => c.votes), 1)

  return (
    <div className="page fade-in">
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Live voting</h1>
        <p className="page-subtitle">Demo tallies — connect to realtime channel when backend exists.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={tab === t.key ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
            onClick={() => {
              setTab(t.key)
              setPostIdx(0)
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {bundle.posts.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={postIdx === i ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
            onClick={() => setPostIdx(i)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 8 }}>{bundle.name}</div>
        <div style={{ fontSize: 22, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{post.label}</div>
        <div style={{ fontSize: 14, color: 'var(--gray-500)' }}>
          {totalVotes.toLocaleString()} votes counted · {bundle.totalVoters.toLocaleString()} registered voters (demo)
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {post.candidates.map((c) => {
          const pct = totalVotes ? Math.round((c.votes / totalVotes) * 100) : 0
          const bar = Math.round((c.votes / max) * 100)
          return (
            <div key={c.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: c.color,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {c.initials}
                  </div>
                  <span style={{ fontWeight: 600 }}>{c.name}</span>
                </div>
                <span style={{ fontWeight: 700 }}>
                  {c.votes.toLocaleString()} ({pct}%)
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${bar}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <p style={{ marginTop: 24, fontSize: 13, color: 'var(--gray-500)' }}>
        Ballot casting UI hooks here — this screen mirrors aggregate counts only.
      </p>
    </div>
  )
}
