import React, { useMemo, useState } from 'react'
import styles from '../components/Results.module.css'
import { resultsByKey } from '../data/resultsData.js'

const TABS = [
  { key: 'city', label: '🏙️ City Council' },
  { key: 'health', label: '🏥 Health Officer' },
  { key: 'guild', label: '🎓 Student Guild' },
]

export default function Results() {
  const [tab, setTab] = useState('city')
  const [postIdx, setPostIdx] = useState(0)

  const data = resultsByKey[tab]
  const post = data.posts[postIdx]

  const ranked = useMemo(() => [...post.candidates].sort((a, b) => b.votes - a.votes), [post])
  const winner = ranked[0]
  const total = ranked.reduce((s, c) => s + c.votes, 0)

  return (
    <div className={`page fade-in ${styles.resultsWrap}`}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Official results</h1>
        <p className="page-subtitle">
          Published {data.published} · {data.turnoutPct}% turnout · {data.votesCast.toLocaleString()} votes cast
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
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
        {data.posts.map((p, i) => (
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

      <div className={styles.summaryGrid}>
        <div className={styles.sumCard}>
          <div className={styles.sumNum}>{data.votesCast.toLocaleString()}</div>
          <div className={styles.sumLabel}>Votes cast</div>
        </div>
        <div className={styles.sumCard}>
          <div className={styles.sumNum}>{data.totalVoters.toLocaleString()}</div>
          <div className={styles.sumLabel}>Registered voters</div>
        </div>
        <div className={styles.sumCard}>
          <div className={styles.sumNum}>{data.turnoutPct}%</div>
          <div className={styles.sumLabel}>Turnout</div>
        </div>
        <div className={styles.sumCard}>
          <div className={styles.sumNum}>{post.candidates.length}</div>
          <div className={styles.sumLabel}>Candidates</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24, textAlign: 'center', border: '2px solid var(--amber-bg)' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏆</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>{winner.name}</div>
        <div style={{ color: 'var(--gray-500)', marginBottom: 12 }}>{post.label}</div>
        <div style={{ fontSize: 32, fontWeight: 700 }}>{winner.votes.toLocaleString()} votes</div>
        <div style={{ fontSize: 14, color: 'var(--gray-600)', marginTop: 8 }}>
          {total ? Math.round((winner.votes / total) * 100) : 0}% vote share
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: 16 }}>Full breakdown</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--gray-500)', fontSize: 12 }}>
              <th style={{ padding: '8px 0' }}>#</th>
              <th style={{ padding: '8px 0' }}>Candidate</th>
              <th style={{ padding: '8px 0' }}>Votes</th>
              <th style={{ padding: '8px 0' }}>Share</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((c, i) => (
              <tr key={c.name} style={{ borderTop: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '10px 0' }}>{i + 1}</td>
                <td style={{ padding: '10px 0', fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: '10px 0' }}>{c.votes.toLocaleString()}</td>
                <td style={{ padding: '10px 0' }}>{total ? Math.round((c.votes / total) * 100) : 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div style={{ fontWeight: 600, marginBottom: 12 }}>Turnout by precinct</div>
        {data.precincts.map((p) => (
          <div key={p.name} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span>{p.name}</span>
              <span>{p.turnout}%</span>
            </div>
            <div className="progress-bar" style={{ marginTop: 4 }}>
              <div className="progress-fill" style={{ width: `${p.turnout}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
