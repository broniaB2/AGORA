import React, { useMemo, useState } from 'react'
import { screeningElections } from '../data/screeningData.js'

const KEYS = [
  { key: 'city', label: '🏙️ City Council' },
  { key: 'health', label: '🏥 Health Officer' },
  { key: 'guild', label: '🎓 Student Guild' },
]

export default function Screening() {
  const [electKey, setElectKey] = useState('city')
  const [postIdx, setPostIdx] = useState(0)

  const bundle = screeningElections[electKey]
  const post = bundle.posts[postIdx]

  const sortedApplicants = useMemo(() => [...post.applicants].sort((a, b) => b.score - a.score), [post])

  return (
    <div className="page fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Screening</h1>
          <p className="page-subtitle">Review AI-assisted scores per post (demo data).</p>
        </div>
        <button type="button" className="btn btn-primary">
          ✅ Finalise shortlist
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {KEYS.map((k) => (
          <button
            key={k.key}
            type="button"
            className={electKey === k.key ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
            onClick={() => {
              setElectKey(k.key)
              setPostIdx(0)
            }}
          >
            {k.label}
          </button>
        ))}
      </div>

      <p style={{ marginBottom: 16, color: 'var(--gray-600)' }}>
        <strong>{bundle.name}</strong>
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {bundle.posts.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={postIdx === i ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
            onClick={() => setPostIdx(i)}
          >
            {p.label.split('—')[0].trim()} ({p.applicants.length}/{p.max})
          </button>
        ))}
      </div>

      <div style={{ fontSize: 14, marginBottom: 16 }}>
        Post: <strong>{post.label}</strong>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sortedApplicants.map((a) => (
          <div key={a.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: a.color,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {a.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                    Submitted {a.submitted} · {a.status}
                    {a.flagged ? ' · ⚑ flagged' : ''}
                  </div>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--blue-700)' }}>{a.score}%</div>
            </div>
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.5 }}>{a.statement}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
