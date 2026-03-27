'use client'
// app/test-db/page.tsx
// DELETE THIS FILE BEFORE GOING TO PRODUCTION

import { useState } from 'react'

type Result = {
  ok: boolean
  message: string
  user?: any
  error?: string
  code?: string
}

export default function TestDbPage() {
  const [name, setName]       = useState('')
  const [result, setResult]   = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)

  async function runTest() {
    if (!name.trim()) return
    setLoading(true)
    setResult(null)

    try {
      const res  = await fetch('/api/test-db', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setResult({ ok: false, message: 'Fetch failed', error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight:       '100vh',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      background:      '#0a0a0a',
      fontFamily:      'monospace',
      padding:         '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display:        'inline-block',
            fontSize:       '11px',
            letterSpacing:  '0.1em',
            color:          '#666',
            textTransform:  'uppercase',
            marginBottom:   '8px',
          }}>
            DB Connection Test
          </div>
          <h1 style={{
            fontSize:    '22px',
            fontWeight:  '500',
            color:       '#e8e8e8',
            margin:      0,
            lineHeight:  1.2,
          }}>
            Write a row to your database
          </h1>
          <p style={{ color: '#555', fontSize: '13px', marginTop: '8px', lineHeight: 1.6 }}>
            Hits <code style={{ color: '#888', background: '#1a1a1a', padding: '2px 6px', borderRadius: '4px' }}>/api/test-db</code> → Prisma → Neon.
            If this works and your webhook doesn't, the problem is in the webhook handler.
          </p>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="Enter any name..."
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && runTest()}
            style={{
              width:           '100%',
              padding:         '12px 16px',
              background:      '#111',
              border:          '1px solid #222',
              borderRadius:    '8px',
              color:           '#e8e8e8',
              fontSize:        '14px',
              outline:         'none',
              boxSizing:       'border-box',
              fontFamily:      'monospace',
              transition:      'border-color 0.15s',
            }}
            onFocus={e  => e.target.style.borderColor = '#444'}
            onBlur={e   => e.target.style.borderColor = '#222'}
          />
        </div>

        {/* Button */}
        <button
          onClick={runTest}
          disabled={loading || !name.trim()}
          style={{
            width:           '100%',
            padding:         '12px',
            background:      loading || !name.trim() ? '#1a1a1a' : '#e8e8e8',
            color:           loading || !name.trim() ? '#444'    : '#0a0a0a',
            border:          'none',
            borderRadius:    '8px',
            fontSize:        '13px',
            fontWeight:      '500',
            cursor:          loading || !name.trim() ? 'not-allowed' : 'pointer',
            fontFamily:      'monospace',
            letterSpacing:   '0.05em',
            transition:      'all 0.15s',
            marginBottom:    '1.5rem',
          }}
        >
          {loading ? 'Writing to DB...' : 'Run test →'}
        </button>

        {/* Result */}
        {result && (
          <div style={{
            border:       `1px solid ${result.ok ? '#1a3a1a' : '#3a1a1a'}`,
            borderRadius: '8px',
            overflow:     'hidden',
          }}>
            {/* Status bar */}
            <div style={{
              padding:    '10px 16px',
              background: result.ok ? '#0d1f0d' : '#1f0d0d',
              display:    'flex',
              alignItems: 'center',
              gap:        '8px',
            }}>
              <div style={{
                width:        '8px',
                height:       '8px',
                borderRadius: '50%',
                background:   result.ok ? '#22c55e' : '#ef4444',
                flexShrink:   0,
              }} />
              <span style={{
                fontSize:  '13px',
                fontWeight: '500',
                color:     result.ok ? '#22c55e' : '#ef4444',
              }}>
                {result.ok ? 'Success — DB write confirmed' : 'Failed — DB write error'}
              </span>
            </div>

            {/* Payload */}
            <div style={{ padding: '14px 16px', background: '#0f0f0f' }}>
              {result.ok ? (
                <>
                  <div style={{ color: '#555', fontSize: '11px', marginBottom: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Row created
                  </div>
                  {[
                    ['id',        result.user?.id],
                    ['clerkId',   result.user?.clerkId],
                    ['fullName',  result.user?.fullName],
                    ['email',     result.user?.email],
                    ['username',  result.user?.username],
                    ['createdAt', result.user?.createdAt],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '12px', marginBottom: '4px', fontSize: '12px' }}>
                      <span style={{ color: '#555', minWidth: '80px' }}>{k}</span>
                      <span style={{ color: '#a0a0a0', wordBreak: 'break-all' }}>{String(v)}</span>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div style={{ color: '#555', fontSize: '11px', marginBottom: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Error detail
                  </div>
                  <div style={{ fontSize: '12px', color: '#ef4444', marginBottom: '6px', lineHeight: 1.6 }}>
                    {result.error}
                  </div>
                  {result.code && (
                    <div style={{ fontSize: '12px', color: '#555' }}>
                      Prisma code: <span style={{ color: '#888' }}>{result.code}</span>
                    </div>
                  )}
                  <div style={{ marginTop: '12px', padding: '10px', background: '#1a1a1a', borderRadius: '6px', fontSize: '11px', color: '#555', lineHeight: 1.8 }}>
                    Common causes:<br/>
                    <span style={{ color: '#666' }}>
                      P2002 → unique constraint (clerkId/email already exists)<br/>
                      P1001 → can't reach DB — check DATABASE_URL in env vars<br/>
                      P1000 → auth failed — check DB credentials<br/>
                      undefined → Prisma client not initialised
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Reminder */}
        <p style={{ marginTop: '1.5rem', fontSize: '11px', color: '#333', textAlign: 'center', lineHeight: 1.6 }}>
          Delete <code style={{ color: '#444' }}>app/api/test-db</code> and <code style={{ color: '#444' }}>app/test-db</code> before going to production
        </p>

      </div>
    </div>
  )
}