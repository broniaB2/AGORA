import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from '../components/Elections.module.css'
import { elections, electionStatusLabel } from '../data/electionsData.js'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'live', label: '🟢 Live' },
  { key: 'applying', label: '📋 Applying' },
  { key: 'upcoming', label: '🗓 Upcoming' },
  { key: 'screening', label: '🤖 Screening' },
  { key: 'closed', label: '✓ Closed' },
]

function statusBadgeClass(status) {
  const map = {
    live: styles.statusLive,
    applying: styles.statusApplying,
    upcoming: styles.statusUpcoming,
    screening: styles.statusScreening,
    closed: styles.statusClosed,
  }
  return map[status] || styles.statusClosed
}

export default function Elections() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [detail, setDetail] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return elections.filter((e) => {
      const okF = filter === 'all' || e.status === filter
      const okQ = !q || e.title.toLowerCase().includes(q) || e.region.toLowerCase().includes(q)
      return okF && okQ
    })
  }, [filter, search])

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h1>Elections</h1>
          <p>{user?.role === 'commission' ? 'Manage and monitor elections under your commission.' : 'Browse elections in your region.'}</p>
        </div>
        {user?.role === 'commission' && (
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setCreateOpen(true)}>
            ＋ Create election
          </button>
        )}
      </div>

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`${styles.filterBtn} ${filter === f.key ? styles.active : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
        <div className={styles.filterSearch}>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search elections…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className={styles.searchBtn}>
            🔍
          </button>
        </div>
      </div>

      <div className={styles.electionsGrid}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState} style={{ gridColumn: '1 / -1' }}>
            <div className={styles.emptyStateIcon}>🗳️</div>
            <h3>No elections found</h3>
            <p>Try another filter or search term.</p>
          </div>
        ) : (
          filtered.map((e) => {
            const pct = e.maxApplicants ? Math.min(100, Math.round((e.applicants / e.maxApplicants) * 100)) : null
            return (
              <div key={e.id} className={styles.electionCard} onClick={() => setDetail(e)}>
                <div className={styles.cardTop}>
                  <div className={styles.cardIconWrap}>{e.icon}</div>
                  <span className={`${styles.statusBadge} ${statusBadgeClass(e.status)}`}>{electionStatusLabel(e.status)}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTitle}>{e.title}</div>
                  <div className={styles.cardDesc}>{e.desc}</div>
                  <div className={styles.cardMeta}>
                    <div className={styles.metaRow}>
                      <span className={styles.metaIcon}>📍</span>
                      {e.region}
                    </div>
                    <div className={styles.metaRow}>
                      <span className={styles.metaIcon}>🗓</span>
                      Voting: {e.votingStart} → {e.votingEnd}
                    </div>
                    <div className={styles.metaRow}>
                      <span className={styles.metaIcon}>📋</span>
                      {e.posts.length} post{e.posts.length > 1 ? 's' : ''}
                    </div>
                  </div>
                  {pct !== null && (
                    <div className={styles.applicantBarWrap}>
                      <div className={styles.applicantBarLabel}>
                        <span>{e.applicants.toLocaleString()} applicants</span>
                        <span>{pct}% filled</span>
                      </div>
                      <div className={styles.applicantBar}>
                        <div
                          className={styles.applicantFill}
                          style={{
                            width: `${pct}%`,
                            background:
                              pct >= 95
                                ? 'linear-gradient(90deg,#f5b84a,#e08a00)'
                                : 'linear-gradient(90deg,var(--blue-400),var(--blue-500))',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.cardFooter}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                    onClick={(ev) => {
                      ev.stopPropagation()
                      setDetail(e)
                    }}
                  >
                    View details
                  </button>
                  {e.status === 'live' && (
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}
                      onClick={(ev) => {
                        ev.stopPropagation()
                        navigate('/voting')
                      }}
                    >
                      Vote
                    </button>
                  )}
                  {e.status === 'applying' && user?.role === 'citizen' && (
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}
                      onClick={(ev) => {
                        ev.stopPropagation()
                        navigate('/apply')
                      }}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Detail panel */}
      <div
        className={styles.detailOverlay}
        style={{ opacity: detail ? 1 : 0, pointerEvents: detail ? 'auto' : 'none' }}
        onClick={() => setDetail(null)}
        aria-hidden={!detail}
      />
      <div
        className={styles.detailPanel}
        style={{ right: detail ? 0 : '-520px' }}
        onClick={(ev) => ev.stopPropagation()}
      >
        {detail && (
          <>
            <div className={styles.detailHeader}>
              <div className={styles.detailIcon}>{detail.icon}</div>
              <div className={styles.detailHeaderInfo}>
                <div>
                  <span className={`${styles.statusBadge} ${statusBadgeClass(detail.status)}`}>
                    {electionStatusLabel(detail.status)}
                  </span>
                </div>
                <div className={styles.detailTitle}>{detail.title}</div>
              </div>
              <button type="button" className={styles.detailClose} onClick={() => setDetail(null)}>
                ✕
              </button>
            </div>
            <div className={styles.detailBody}>
              <div className={styles.detailSection}>
                <div className={styles.detailSectionTitle}>Overview</div>
                <div className={styles.detailInfoGrid}>
                  <div className={styles.detailInfoItem}>
                    <div className={styles.detailInfoLabel}>Region</div>
                    <div className={styles.detailInfoValue}>{detail.region}</div>
                  </div>
                  <div className={styles.detailInfoItem}>
                    <div className={styles.detailInfoLabel}>Applicants</div>
                    <div className={styles.detailInfoValue}>
                      {detail.applicants.toLocaleString()}
                      {detail.maxApplicants ? ` / ${detail.maxApplicants}` : ''}
                    </div>
                  </div>
                  <div className={styles.detailInfoItem}>
                    <div className={styles.detailInfoLabel}>Voting</div>
                    <div className={styles.detailInfoValue}>
                      {detail.votingStart} → {detail.votingEnd}
                    </div>
                  </div>
                  <div className={styles.detailInfoItem}>
                    <div className={styles.detailInfoLabel}>Results</div>
                    <div className={styles.detailInfoValue}>{detail.resultsDate}</div>
                  </div>
                </div>
              </div>
              <div className={styles.detailSection}>
                <div className={styles.detailSectionTitle}>Posts</div>
                {detail.posts.map((p) => (
                  <div key={p.name} style={{ marginBottom: 8, fontSize: 14 }}>
                    <strong>{p.name}</strong>
                    <span style={{ color: 'var(--gray-500)', marginLeft: 8 }}>
                      {p.candidates} applicants{p.max ? ` · max ${p.max}` : ''}
                    </span>
                  </div>
                ))}
              </div>
              <div className={styles.detailSection}>
                <div className={styles.detailSectionTitle}>Requirements</div>
                <ul style={{ paddingLeft: 18, color: 'var(--gray-700)', fontSize: 14 }}>
                  {detail.requirements.map((r) => (
                    <li key={r} style={{ marginBottom: 6 }}>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.detailFooter}>
              <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setDetail(null)}>
                Close
              </button>
              {detail.status === 'applying' && user?.role === 'citizen' && (
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => navigate('/apply')}
                >
                  Apply →
                </button>
              )}
              {detail.status === 'live' && (
                <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate('/voting')}>
                  Go to voting
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Create modal */}
      <div
        className={styles.modalOverlay}
        style={{ opacity: createOpen ? 1 : 0, pointerEvents: createOpen ? 'auto' : 'none' }}
        onClick={() => setCreateOpen(false)}
      >
        <div className={styles.modal} onClick={(ev) => ev.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>Create election</h2>
            <button type="button" className={styles.modalClose} onClick={() => setCreateOpen(false)}>
              ✕
            </button>
          </div>
          <p style={{ color: 'var(--gray-600)', marginBottom: 16 }}>
            Demo only — hook this form to your commission API when ready.
          </p>
          <div className={styles.modalFooter}>
            <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setCreateOpen(false)}>
              Cancel
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setCreateOpen(false)}>
              Save draft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
