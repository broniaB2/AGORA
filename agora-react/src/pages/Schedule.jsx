import React from 'react'
import { elections } from '../data/electionsData.js'

export default function Schedule() {
  return (
    <div className="page fade-in">
      <h1 className="page-title">Election schedule</h1>
      <p className="page-subtitle" style={{ marginBottom: 28 }}>
        Key milestones from demo elections — replace with commission calendar feed later.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {elections.map((e) => (
          <div key={e.id} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{e.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{e.title}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{e.region}</div>
              </div>
            </div>
            <div style={{ borderLeft: '2px solid var(--gray-200)', paddingLeft: 16 }}>
              {e.roadmap.map((step, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    {step.state === 'done' ? 'Done' : step.state === 'active' ? 'In progress' : 'Upcoming'}
                  </div>
                  <div style={{ fontWeight: 500 }}>{step.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>{step.date}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
