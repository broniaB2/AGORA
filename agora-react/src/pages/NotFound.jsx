import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page fade-in" style={{ textAlign: 'center', paddingTop: 48 }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🔎</div>
      <h1 className="page-title">Page not found</h1>
      <p className="page-subtitle" style={{ marginBottom: 24 }}>
        The route you opened does not exist in this demo build.
      </p>
      <Link className="btn btn-primary" to="/dashboard">
        Back to dashboard
      </Link>
    </div>
  )
}
