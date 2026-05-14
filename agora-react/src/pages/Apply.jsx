import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from '../components/Apply.module.css'
import { applySteps, applyElectionOptions } from '../data/applyData.js'

export default function Apply() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [electionId, setElectionId] = useState(null)
  const [post, setPost] = useState('')
  const [why, setWhy] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const elect = applyElectionOptions.find((e) => e.id === electionId)

  return (
    <div className={styles.applyLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Application steps</div>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {applySteps.map((s, i) => {
            const n = i + 1
            const done = n < step
            const active = n === step
            return (
              <li
                key={s.label}
                onClick={() => done && setStep(n)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  marginBottom: 8,
                  cursor: done ? 'pointer' : 'default',
                  background: active ? 'var(--blue-50)' : 'transparent',
                  border: active ? '1px solid var(--blue-100)' : '1px solid transparent',
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  Step {n}
                </div>
                <div style={{ fontWeight: 600, color: active ? 'var(--blue-700)' : 'var(--gray-700)' }}>{s.label}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{s.sub}</div>
              </li>
            )
          })}
        </ol>
        <div className={styles.sidebarDivider} />
        <div style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.5 }}>
          <strong>🤖 AI tip:</strong> Complete documents and a structured statement score higher.
        </div>
      </aside>

      <main className={styles.applyMain}>
        {step === 1 && (
          <>
            <h1 className="page-title">Choose an election</h1>
            <p className="page-subtitle" style={{ marginBottom: 24 }}>
              Select the election and post you want to apply for.
            </p>
            {applyElectionOptions.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setElectionId(e.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: 16,
                  marginBottom: 12,
                  borderRadius: 12,
                  border: electionId === e.id ? '2px solid var(--blue-500)' : '1px solid var(--gray-200)',
                  background: electionId === e.id ? 'var(--blue-50)' : '#fff',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 6 }}>{e.icon}</div>
                <div style={{ fontWeight: 600 }}>{e.title}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>{e.meta}</div>
                {electionId === e.id && (
                  <div style={{ marginTop: 12 }}>
                    {e.posts.map((p) => (
                      <label key={p} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 14 }}>
                        <input type="radio" name="post" checked={post === p} onChange={() => setPost(p)} />
                        {p}
                      </label>
                    ))}
                  </div>
                )}
              </button>
            ))}
            <div className={styles.stepNav}>
              <button type="button" className="btn btn-primary" disabled={!electionId || !post} onClick={() => setStep(2)}>
                Continue →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="page-title">Personal details</h1>
            <p className="page-subtitle" style={{ marginBottom: 24 }}>
              Prefilled from your account (demo).
            </p>
            <div className="field-row">
              <div className="field">
                <label>First name</label>
                <input readOnly value={user?.name?.split(' ')[0] || ''} />
              </div>
              <div className="field">
                <label>Last name</label>
                <input readOnly value={user?.name?.split(' ').slice(1).join(' ') || ''} />
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input readOnly value={user?.email || ''} />
            </div>
            <div className={styles.stepNav}>
              <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                Continue →
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="page-title">Documents</h1>
            <p className="page-subtitle" style={{ marginBottom: 24 }}>
              Upload flows connect to your storage service later.
            </p>
            {['National ID', 'Academic certificate', 'Passport photo'].map((label) => (
              <div key={label} className={styles.docReqItem} style={{ marginBottom: 10 }}>
                <div className={styles.docReqIcon}>📄</div>
                <div className={styles.docReqLabel}>
                  <div className={styles.docReqName}>{label}</div>
                  <div className={styles.docReqNote}>JPG, PNG or PDF · max 5 MB</div>
                </div>
                <button type="button" className="btn btn-outline btn-sm">
                  Upload
                </button>
              </div>
            ))}
            <div className={styles.stepNav}>
              <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(4)}>
                Continue →
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="page-title">Personal statement</h1>
            <p className="page-subtitle" style={{ marginBottom: 24 }}>
              Tell voters why you are running.
            </p>
            <div className="field">
              <label htmlFor="why">Why are you running?</label>
              <textarea id="why" rows={6} value={why} onChange={(e) => setWhy(e.target.value)} placeholder="Your motivation…" />
            </div>
            <div className={styles.stepNav}>
              <button type="button" className="btn btn-outline" onClick={() => setStep(3)}>
                ← Back
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(5)}>
                Review →
              </button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="page-title">Review</h1>
            <p className="page-subtitle" style={{ marginBottom: 24 }}>
              Confirm before submitting.
            </p>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Election</div>
              <div style={{ fontWeight: 600 }}>{elect?.title}</div>
              <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 12 }}>Post</div>
              <div>{post}</div>
              <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 12 }}>Statement</div>
              <div style={{ fontSize: 14 }}>{why || '—'}</div>
            </div>
            <label style={{ display: 'flex', gap: 10, marginBottom: 20, fontSize: 14 }}>
              <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
              I confirm the information above is accurate.
            </label>
            <div className={styles.stepNav}>
              <button type="button" className="btn btn-outline" onClick={() => setStep(4)}>
                ← Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!confirmed}
                onClick={() => navigate('/dashboard')}
              >
                Submit application
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
