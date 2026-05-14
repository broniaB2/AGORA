import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from '../components/dashboard.module.css'
import {
  dashboardElectionPreview,
  timelineItems,
  dashboardStatsByRole,
  dashboardNotificationsByRole,
} from '../data/dashboardData.js'

const badgeLabel = {
  citizen: '🗳️ Citizen',
  commission: '⚖️ Commission officer',
  candidate: '🏅 Candidate',
}

const iconBg = {
  blue: 'var(--blue-100)',
  green: 'var(--green-bg)',
  amber: 'var(--amber-bg)',
  purple: '#f0eeff',
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const role = user?.role || 'citizen'
  const stats = dashboardStatsByRole[role] || dashboardStatsByRole.citizen
  const notifications = dashboardNotificationsByRole[role] || dashboardNotificationsByRole.citizen

  const badgeStyle =
    role === 'commission'
      ? { background: 'var(--green-bg)', color: 'var(--green-text)' }
      : role === 'candidate'
        ? { background: 'var(--amber-bg)', color: 'var(--amber-text)' }
        : { background: 'var(--blue-100)', color: 'var(--blue-700)' }

  return (
    <div className="page fade-in">
      <div className={styles.pageHeader}>
        <div className={styles.roleBadge} style={badgeStyle}>
          {badgeLabel[role] || badgeLabel.citizen}
        </div>
        <h1 className="page-title">Good morning, {user?.name?.split(' ')[0] || 'there'}</h1>
        <p className="page-subtitle" style={{ marginTop: 6 }}>
          {role === 'commission'
            ? 'You have elections and applications requiring attention today.'
            : role === 'candidate'
              ? 'Your campaign is live. Here is how you are performing.'
              : "Here's what's happening in your district today."}
        </p>
      </div>

      <div className={styles.statsRow}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: iconBg[s.cls] || iconBg.blue }}>
              {s.icon}
            </div>
            <span className={styles.statNum}>{s.num}</span>
            <div className={styles.statLabel}>{s.label}</div>
            <div
              className={styles.statTrend}
              style={{
                color: s.tc === 'up' ? 'var(--green-text)' : 'var(--blue-500)',
              }}
            >
              {s.trend}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashGrid}>
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontWeight: 600, color: 'var(--gray-800)' }}>Active elections</span>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => navigate('/elections')}>
                View all →
              </button>
            </div>
            {dashboardElectionPreview.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => navigate('/elections')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  borderBottom: '1px solid var(--gray-100)',
                  background: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span style={{ fontSize: 22 }}>{e.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: 'var(--gray-800)' }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{e.org}</div>
                </div>
                <span
                  className={`badge ${
                    e.status === 'live'
                      ? 'badge-live'
                      : e.status === 'applying'
                        ? 'badge-applying'
                        : e.status === 'upcoming'
                          ? 'badge-upcoming'
                          : 'badge-closed'
                  }`}
                >
                  {e.statusLabel}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 14 }}>Election roadmap</div>
            <div className={styles.timeline}>
              {timelineItems.map((t, i) => (
                <div key={i} className={styles.tlItem}>
                  <div
                    className={styles.tlDot}
                    style={{
                      background: t.active ? 'var(--blue-500)' : t.done ? 'var(--blue-400)' : 'var(--gray-300)',
                      boxShadow: t.active ? '0 0 0 3px rgba(58,158,245,.25)' : undefined,
                    }}
                  />
                  <div>
                    <div className={styles.tlText}>{t.text}</div>
                    <div className={styles.tlDate}>{t.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 14 }}>Quick actions</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button type="button" className={styles.qaBtn} onClick={() => navigate('/elections')}>
                <span className={styles.qaIcon}>🗳️</span>
                <span className={styles.qaLabel}>Browse elections</span>
              </button>
              <button type="button" className={styles.qaBtn} onClick={() => navigate('/apply')}>
                <span className={styles.qaIcon}>📋</span>
                <span className={styles.qaLabel}>Apply for a post</span>
              </button>
              <button type="button" className={styles.qaBtn} onClick={() => navigate('/results')}>
                <span className={styles.qaIcon}>📊</span>
                <span className={styles.qaLabel}>View results</span>
              </button>
              <button type="button" className={styles.qaBtn} onClick={() => navigate('/polls')}>
                <span className={styles.qaIcon}>📮</span>
                <span className={styles.qaLabel}>Polls</span>
              </button>
            </div>
          </div>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 600 }}>Notifications</span>
              <span style={{ fontSize: 12, color: 'var(--blue-500)', cursor: 'pointer' }}>Mark all read</span>
            </div>
            {notifications.map((n, i) => (
              <div key={i} className={styles.notifItem}>
                <div
                  className={styles.notifDotIcon}
                  style={{ background: n.read ? 'var(--gray-300)' : 'var(--blue-400)' }}
                />
                <div>
                  <div className={styles.notifText}>{n.text}</div>
                  <div className={styles.notifTime}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
