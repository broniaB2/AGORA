/**
 * FILE: src/context/AuthContext.jsx
 *
 * PURPOSE: Global authentication state for Agora.
 *   - Stores the logged-in user, their role, and whether they are authenticated.
 *   - All pages read from this context instead of managing their own user state.
 *   - login() / logout() are called by the Login and Register pages.
 *   - switchRole() is the demo helper used by the role switcher widget.
 *
 * WHEN CONNECTING A REAL BACKEND:
 *   Replace the login() function body with a real API call:
 *     const res = await fetch('/api/auth/login', { method:'POST', body: JSON.stringify({email,password}) })
 *     const data = await res.json()
 *     setUser(data.user)
 *   Store the JWT token in localStorage and attach it to all future fetch() calls.
 */

import React, { createContext, useContext, useState } from 'react'

/* ── Shape of a user object ───────────────────────────────────────────────
   In production this comes from your backend (POST /api/auth/login response).
   role: 'citizen' | 'commission' | 'candidate'
   A user starts as 'citizen'. They become 'candidate' after applying for a post
   and being approved by the commission.
──────────────────────────────────────────────────────────────────────────── */
const DEMO_USERS = {
  citizen: {
    id: 'u-001',
    name: 'John Mukasa',
    initials: 'JM',
    email: 'john.mukasa@gmail.com',
    role: 'citizen',
    nationalId: 'CM-9087654321',
    avatarColor: 'linear-gradient(135deg, #3a9ef5, #1362b0)',
  },
  commission: {
    id: 'u-002',
    name: 'Grace Namukasa',
    initials: 'GN',
    email: 'g.namukasa@iec.go.ug',
    role: 'commission',
    nationalId: 'CM-2087654321',
    avatarColor: 'linear-gradient(135deg, #4caf70, #2d7a4f)',
  },
  candidate: {
    id: 'u-003',
    name: 'David Ssemanda',
    initials: 'DS',
    email: 'd.ssemanda@gmail.com',
    role: 'candidate',
    nationalId: 'CM-3087654321',
    avatarColor: 'linear-gradient(135deg, #f5b84a, #8a5200)',
  },
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Start logged out — Login page sets this
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  /**
   * login(email, password)
   * Demo: accepts any email/password and logs in as citizen.
   * Real backend: POST /api/auth/login → { user, token }
   */
  function login(email, password) {
    // TODO: replace with real API call
    const demoUser = DEMO_USERS.citizen
    setUser(demoUser)
    setIsAuthenticated(true)
  }

  /**
   * register(formData)
   * Demo: registers and logs in immediately as citizen.
   * Real backend: POST /api/auth/register → { user, token }
   */
  function register(formData) {
    // TODO: replace with real API call
    const newUser = {
      ...DEMO_USERS.citizen,
      name: `${formData.firstName} ${formData.lastName}`,
      initials: `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase(),
      email: formData.email,
      role: formData.role || 'citizen',
    }
    setUser(newUser)
    setIsAuthenticated(true)
  }

  /**
   * logout()
   * Clears user state and redirects to login.
   * Real backend: POST /api/auth/logout + clear JWT from localStorage
   */
  function logout() {
    setUser(null)
    setIsAuthenticated(false)
  }

  /**
   * switchRole(role)  ← DEMO ONLY
   * Lets you preview all three role views without separate accounts.
   * Remove this from production — roles are server-assigned.
   */
  function switchRole(role) {
    setUser(DEMO_USERS[role] || DEMO_USERS.citizen)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

/** Convenience hook — import this in any page/component */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
