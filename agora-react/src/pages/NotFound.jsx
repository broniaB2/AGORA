/**
 * FILE: src/pages/NotFound.jsx
 *
 * HOW TO POPULATE:
 *   1. Open NotFound.html (already downloaded in this project).
 *   2. Copy everything inside <body> into the return() below as JSX.
 *   3. Move <style> block into NotFound.module.css and import it.
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

export default function NotFound() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="page fade-in">
      {/* TODO: paste JSX from NotFound.html here */}
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--gray-800)' }}>
        NotFound
      </h1>
      <p style={{ color: 'var(--gray-500)', marginTop: 8 }}>
        Paste content from NotFound.html — see file header for instructions.
      </p>
    </div>
  )
}
