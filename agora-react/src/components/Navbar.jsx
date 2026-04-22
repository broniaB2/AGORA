/**
 * FILE: src/components/Navbar.jsx
 *
 * PURPOSE: Shared top navigation bar rendered on every protected page.
 *   - Reads the current user from AuthContext (name, initials, role).
 *   - Uses NavLink from react-router-dom for active-state highlighting.
 *   - Shows/hides nav items based on user role.
 *   - Includes a demo RoleSwitcher widget (remove in production).
 *   - Logout button clears auth state and redirects to /login.
 */

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, logout, switchRole } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  // Nav links visible to all roles
  const baseLinks = [
    { to: '/dashboard',  label: 'Dashboard' },
    { to: '/elections',  label: 'Elections' },
    { to: '/polls',      label: 'Polls' },
    { to: '/voting',     label: 'Voting' },
    { to: '/results',    label: 'Results' },
    { to: '/schedule',   label: 'Schedule' },
  ]

  // Extra links per role
  const roleLinks = {
    commission: [
      { to: '/applications', label: 'Applications' },
      { to: '/screening',    label: 'Screening' },
    ],
    citizen: [
      { to: '/apply', label: 'Apply' },
    ],
    candidate: [
      { to: '/apply', label: 'My application' },
    ],
  }

  const extraLinks = roleLinks[user?.role] || []
  const allLinks = [...baseLinks, ...extraLinks]

  const roleBadgeStyle = {
    commission: { background: 'var(--green-bg)',  color: 'var(--green-text)' },
    citizen:    { background: 'var(--blue-100)',  color: 'var(--blue-700)' },
    candidate:  { background: 'var(--amber-bg)',  color: 'var(--amber-text)' },
  }[user?.role] || {}

  return (
    <>
      <nav className={styles.topnav}>
        {/* Brand */}
        <div className={styles.brand} onClick={() => navigate('/dashboard')}>
          <div className={styles.brandIcon}>🏛️</div>
          <span className={styles.brandName}>Agora</span>
        </div>

        {/* Desktop links */}
        <div className={styles.links}>
          {allLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.linkActive : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className={styles.right}>
          {/* Notification bell */}
          <button className={styles.bellBtn} title="Notifications">
            🔔
            <span className={styles.bellDot} />
          </button>

          {/* User menu */}
          <div className={styles.userWrap} onClick={() => setMenuOpen(o => !o)}>
            <div
              className={styles.avatar}
              style={{ background: user?.avatarColor }}
            >
              {user?.initials}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user?.name}</div>
              <div className={styles.userRole} style={roleBadgeStyle}>
                {user?.role}
              </div>
            </div>
            <span className={styles.chevron}>{menuOpen ? '▴' : '▾'}</span>
          </div>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <div style={{ fontWeight: 500, color: 'var(--gray-800)' }}>{user?.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{user?.email}</div>
              </div>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={() => { setMenuOpen(false); navigate('/dashboard') }}>
                👤 My profile
              </button>
              <button className={styles.dropdownItem} onClick={() => { setMenuOpen(false) }}>
                🔔 Notifications
              </button>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={handleLogout}
                style={{ color: 'var(--red-text)' }}>
                ← Log out
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)}>
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {allLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className={styles.mobileDivider} />
          <button className={styles.mobileLink} onClick={handleLogout}
            style={{ color: 'var(--red-text)', textAlign: 'left', border: 'none', background: 'none', width: '100%', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14 }}>
            ← Log out
          </button>
        </div>
      )}

      {/* ── DEMO: Role switcher (remove in production) ── */}
      <div className={styles.roleSwitcher}>
        <p>Demo: switch role</p>
        <div className={styles.rsButtons}>
          {['citizen', 'commission', 'candidate'].map(r => (
            <button
              key={r}
              className={`${styles.rsBtn} ${user?.role === r ? styles.rsBtnActive : ''}`}
              onClick={() => switchRole(r)}
            >
              {{ citizen: '🗳️', commission: '⚖️', candidate: '🏅' }[r]} {r}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
