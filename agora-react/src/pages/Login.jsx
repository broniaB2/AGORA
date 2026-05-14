import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from '../components/AuthShell.module.css'

const ROLE_ICONS = { citizen: '🗳️', commission: '⚖️', candidate: '🏅' }

export default function Login() {
  const { login, switchRole, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    login(email, password)
    navigate('/dashboard')
  }

  function handleDemo(role) {
    login('demo@agora.test', 'demo')
    switchRole(role)
    navigate('/dashboard')
  }

  return (
    <div className={styles.viewport}>
      <div className={styles.brand} aria-hidden>
        <span className={styles.brandIcon}>🏛️</span>
        <span className={styles.brandWord}>Agora</span>
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.lead}>
          No account yet? <Link to="/register">Register here</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.optionsRow}>
            <label className={styles.remember}>
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <button type="button" className={styles.linkMuted}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className={styles.submit}>
            Sign in to Agora
          </button>
        </form>

        <div className={styles.divider}>or try a demo role</div>

        <div className={styles.roleGrid}>
          {(['citizen', 'commission', 'candidate']).map((role) => (
            <button
              key={role}
              type="button"
              className={styles.roleTile}
              onClick={() => handleDemo(role)}
            >
              <span className={styles.roleIcon}>{ROLE_ICONS[role]}</span>
              <span className={styles.roleLabel}>{role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
