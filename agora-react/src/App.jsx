/**
 * FILE: src/App.jsx
 *
 * PURPOSE: Root of the Agora React app.
 *   - Wraps everything in AuthProvider so every page has access to user state.
 *   - Defines all routes using react-router-dom v6.
 *   - ProtectedRoute redirects unauthenticated users to /login.
 *   - AppLayout wraps authenticated pages in the shared Navbar.
 *
 * ROUTE MAP:
 *   /               → redirects to /login
 *   /login          → Login page (public)
 *   /register       → Register page (public)
 *   /dashboard      → Dashboard (protected)
 *   /elections      → Elections list (protected)
 *   /elections/:id  → Election detail — future page
 *   /applications   → Applications viewer — commission (protected)
 *   /apply          → Application form — citizen (protected)
 *   /screening      → Screening panel (protected)
 *   /voting         → Live voting (protected)
 *   /results        → Results (protected)
 *   /polls          → Polls & group voting (protected)
 *   /schedule       → Election schedule (protected)
 */

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'

/* ── Pages ── */
import Login      from './pages/Login.jsx'
import Register   from './pages/Register.jsx'
import Dashboard  from './pages/Dashboard.jsx'
import Elections  from './pages/Elections.jsx'
import Applications from './pages/Applications.jsx'
import Apply      from './pages/Apply.jsx'
import Screening  from './pages/Screening.jsx'
import Voting     from './pages/Voting.jsx'
import Results    from './pages/Results.jsx'
import Polls      from './pages/Polls.jsx'
import Schedule   from './pages/Schedule.jsx'
import NotFound   from './pages/NotFound.jsx'

/* ─────────────────────────────────────────────────────────────
   ProtectedRoute
   Redirects to /login if the user is not authenticated.
   Wrap any route you want to protect inside this component.
───────────────────────────────────────────────────────────── */
function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

/* ─────────────────────────────────────────────────────────────
   AppLayout
   Renders the shared Navbar above all protected pages.
   The <Outlet /> renders the matched child route below the nav.
───────────────────────────────────────────────────────────── */
function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   App
   Top-level router. AuthProvider wraps everything so every
   child component can call useAuth() without prop-drilling.
───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Public routes (no login required) ── */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── Protected routes (login required) ── */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard"    element={<Dashboard />} />
              <Route path="/elections"    element={<Elections />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/apply"        element={<Apply />} />
              <Route path="/screening"    element={<Screening />} />
              <Route path="/voting"       element={<Voting />} />
              <Route path="/results"      element={<Results />} />
              <Route path="/polls"        element={<Polls />} />
              <Route path="/schedule"     element={<Schedule />} />
            </Route>
          </Route>

          {/* ── Root redirect ── */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
