import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { pollsSeed } from '../data/pollsData.js'

function clonePolls() {
  return pollsSeed.map((p) => ({
    ...p,
    votes: [...p.votes],
    votedBy: [...p.votedBy],
  }))
}

export default function Polls() {
  const { user } = useAuth()
  const uid = user?.id || 'anonymous'
  const [polls, setPolls] = useState(clonePolls)
  const [pick, setPick] = useState({})

  function recordVote(pollId) {
    const idx = pick[pollId]
    if (idx === undefined) return
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== pollId || p.closed || p.votedBy.includes(uid)) return p
        const votes = [...p.votes]
        votes[idx] += 1
        return {
          ...p,
          votes,
          votedBy: [...p.votedBy, uid],
        }
      }),
    )
  }

  return (
    <div className="page fade-in">
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Polls</h1>
        <p className="page-subtitle">Lightweight group decisions — demo voting stored in component state.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {polls.map((p) => {
          const hasVoted = p.votedBy.includes(uid)
          const maxV = Math.max(...p.votes, 1)
          const voteTotal = p.votes.reduce((s, v) => s + v, 0)
          return (
            <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{p.title}</div>
              {p.desc ? <p style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 12 }}>{p.desc}</p> : null}
              <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 12 }}>
                By {p.creator} · {p.closed ? 'Closed' : 'Open'} · {voteTotal} votes
              </div>
              {!hasVoted && !p.closed ? (
                <>
                  {p.options.map((opt, i) => (
                    <label key={opt} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14, cursor: 'pointer' }}>
                      <input type="radio" name={`poll-${p.id}`} checked={pick[p.id] === i} onChange={() => setPick({ ...pick, [p.id]: i })} />
                      {opt}
                    </label>
                  ))}
                  <button type="button" className="btn btn-primary btn-sm" style={{ marginTop: 'auto' }} disabled={pick[p.id] === undefined} onClick={() => recordVote(p.id)}>
                    Submit vote
                  </button>
                </>
              ) : (
                <div style={{ marginTop: 8 }}>
                  {p.options.map((opt, i) => {
                    const pct = voteTotal ? Math.round((p.votes[i] / voteTotal) * 100) : 0
                    const w = Math.round((p.votes[i] / maxV) * 100)
                    return (
                      <div key={opt} style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                          <span>{opt}</span>
                          <span>
                            {p.votes[i]} ({pct}%)
                          </span>
                        </div>
                        <div className="progress-bar" style={{ marginTop: 4 }}>
                          <div className="progress-fill" style={{ width: `${w}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
