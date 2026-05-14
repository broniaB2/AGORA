import React, { useMemo, useState } from 'react'
import styles from '../components/Applications.module.css'
import { applicants as applicantsSeed, applicantStatusLabel } from '../data/applicationsData.js'

export default function Applications() {
  const [rows, setRows] = useState(applicantsSeed)
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return rows.filter((a) => {
      const okS = status === 'all' || a.status === status
      const okQ = !q || a.name.toLowerCase().includes(q) || a.post.toLowerCase().includes(q)
      return okS && okQ
    })
  }, [rows, status, search])

  function setStatusFilter(id, next) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)))
    setSelected((cur) => (cur?.id === id ? { ...cur, status: next } : cur))
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Applications</h1>
          <p>Review submitted applications and AI screening scores.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className={`${styles.btn} ${styles.btnOutline}`}>
            ⬇ Export CSV
          </button>
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
            🤖 Run AI screening
          </button>
        </div>
      </div>

      <div className={styles.toolbar}>
        <select className={styles.electSelect} defaultValue="all">
          <option value="all">All elections</option>
          <option value="1">🏙️ Kampala City Council Elections</option>
        </select>
        <input
          className={styles.searchInput}
          placeholder="Search applicants…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.filterTabs}>
          {['all', 'pending', 'screening', 'approved', 'rejected'].map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.ftab} ${status === s ? styles.active : ''}`}
              onClick={() => setStatus(s)}
            >
              {s === 'all' ? 'All' : applicantStatusLabel[s] || s}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableHeaderRow}>
          <span className={styles.tableTitle}>Showing {filtered.length} applicants</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--gray-50)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Applicant</th>
                <th style={{ padding: '12px 16px' }}>Post</th>
                <th style={{ padding: '12px 16px' }}>Score</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }} />
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} style={{ borderTop: '1px solid var(--gray-100)', cursor: 'pointer' }} onClick={() => setSelected(a)}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: a.color,
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {a.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500 }}>
                          {a.name}
                          {a.flagged ? <span style={{ color: '#e05050', fontSize: 11, marginLeft: 6 }}>⚑ Flagged</span> : null}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{a.nationalId}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--gray-700)' }}>{a.post}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--blue-700)' }}>{a.score}%</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="badge badge-applying">{applicantStatusLabel[a.status] || a.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }} onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnSm} ${styles.btnApprove}`}
                      onClick={() => setStatusFilter(a.id, 'approved')}
                    >
                      ✓
                    </button>{' '}
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnSm} ${styles.btnReject}`}
                      onClick={() => setStatusFilter(a.id, 'rejected')}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15,31,46,.35)',
          opacity: selected ? 1 : 0,
          pointerEvents: selected ? 'auto' : 'none',
          transition: 'opacity .2s',
          zIndex: 150,
        }}
        onClick={() => setSelected(null)}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: selected ? 0 : '-440px',
          width: 420,
          height: '100vh',
          background: '#fff',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 160,
          transition: 'right .25s ease',
          padding: 24,
          overflowY: 'auto',
        }}
      >
        {selected && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 6 }}>{selected.name}</h2>
                <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>
                  {selected.post} · Submitted {selected.submitted}
                </p>
              </div>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 20 }}>{selected.statement}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className={`${styles.btn} ${styles.btnApprove}`} onClick={() => setStatusFilter(selected.id, 'approved')}>
                Approve
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnReject}`} onClick={() => setStatusFilter(selected.id, 'rejected')}>
                Reject
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
