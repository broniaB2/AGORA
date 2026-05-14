import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from '../components/AuthShell.module.css'

const ROLES = ['citizen', 'commission', 'candidate']
const ROLE_ICONS = { citizen: '🗳️', commission: '⚖️', candidate: '🏅' }

export default function Register() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('citizen')
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    if (!agreed) return
    register({ firstName, lastName, email, nationalId, phone, password, role })
    navigate('/dashboard')
  }

  return (
    <div className={styles.viewport}>
      <div className={styles.brand} aria-hidden>
        <span className={styles.brandIcon}>🏛️</span>
        <span className={styles.brandWord}>Agora</span>
      </div>

      <div className={`${styles.card} ${styles.cardScroll}`}>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.lead}>
          Already registered? <Link to="/login">Sign in</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="reg-first">First name</label>
              <input id="reg-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
            </div>
            <div className={styles.field}>
              <label htmlFor="reg-last">Last name</label>
              <input id="reg-last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Mukasa" />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="reg-email">Email address</label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="reg-nid">National ID number</label>
            <input id="reg-nid" value={nationalId} onChange={(e) => setNationalId(e.target.value)} placeholder="CM-1234567890" />
          </div>
          <div className={styles.field}>
            <label htmlFor="reg-phone">Phone number</label>
            <input id="reg-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+256 700 000 000" />
          </div>

          <span className={styles.sectionLabel}>Select your role</span>
          <div className={styles.roleGrid} style={{ marginBottom: 22 }}>
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                className={`${styles.roleTile} ${role === r ? styles.roleTileActive : ''}`}
                onClick={() => setRole(r)}
              >
                <span className={styles.roleIcon}>{ROLE_ICONS[r]}</span>
                <span className={styles.roleLabel}>{r}</span>
              </button>
            ))}
          </div>

          <div className={styles.field}>
            <label htmlFor="reg-pass">Password</label>
            <input
              id="reg-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
          </div>

          <label className={styles.checkRow}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>
              I agree to Agora&apos;s Terms of Service. My identity will be verified before full access is granted.
            </span>
          </label>

          <button type="submit" className={styles.submit} disabled={!agreed}>
            Create account
          </button>
        </form>
      </div>
    </div>
  )
}
