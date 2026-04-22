/**
 * FILE: src/pages/Polls.jsx
 *
 * HOW TO POPULATE:
 *   1. Open Polls.html (already downloaded in this project).
 *   2. Copy everything inside <body> into the return() below as JSX.
 *   3. Move <style> block into Polls.module.css and import it.
 *   4. Move <script> logic into useState / useEffect hooks here.
 *
 * JSX CHEATSHEET:
 *   class=""        →  className=""
 *   onclick="fn()"  →  onClick={() => fn()}
 *   for="id"        →  htmlFor="id"
 *   style="k:v"     →  style={{ k: 'v' }}
 *   <br>            →  <br />
 *   user role check →  const { user } = useAuth(); user?.role
 */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Polls() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="page fade-in">
      {/* TODO: paste JSX from Polls.html here */}
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--gray-800)' }}>
        Polls
      </h1>
      <p style={{ color: 'var(--gray-500)', marginTop: 8 }}>
        Paste content from Polls.html — see file header for instructions.
      </p>
    </div>
  )
}
