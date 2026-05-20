'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        })

        if (result?.error) {
        setError('Email atau password salah')
        setLoading(false)
        return
        }

        router.push('/patients')
    }

    const inputStyle: React.CSSProperties = {
      width: '100%', padding: '11px 14px',
      background: 'var(--bg-base)',
      border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text-primary)',
      fontSize: '14px', outline: 'none',
      transition: 'border-color .2s, box-shadow .2s'
    }
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-base)',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
    }}>
      {/* Left panel — visual */}
      <div style={{
        background: 'linear-gradient(160deg, #1a1500 0%, #3d3200 50%, #5a4a00 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px', position: 'relative', overflow: 'hidden'
      }}>
        {/* decorative circles */}
        {[
          { w: 320, h: 320, top: '-80px', left: '-80px', opacity: 0.07 },
          { w: 200, h: 200, bottom: '60px', right: '-40px', opacity: 0.1 },
          { w: 100, h: 100, top: '40%', right: '60px', opacity: 0.06 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', width: c.w, height: c.h,
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            borderRadius: '50%', background: 'white', opacity: c.opacity,
            pointerEvents: 'none'
          }} />
        ))}

        <div style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
          {/* Logo mark */}
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px'
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" fill="white" opacity=".9"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 19v3M9 22h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: '36px', fontWeight: 400, lineHeight: 1.2,
            marginBottom: '16px', letterSpacing: '-0.5px'
          }}>MediScribe<br /><em>AI</em></h1>

          <p style={{
            fontSize: '15px', opacity: 0.75, lineHeight: 1.7,
            maxWidth: '280px', margin: '0 auto'
          }}>
            Asisten pencatatan medis berbasis AI untuk dokter Indonesia
          </p>

          {/* Feature chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '40px', alignItems: 'flex-start' }}>
            {[
              { icon: '🎙️', text: 'Rekam & transkripsi otomatis' },
              { icon: '📋', text: 'Generate catatan SOAP dengan AI' },
              { icon: '🔔', text: 'Reminder pasien via WhatsApp' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '100px', padding: '8px 16px',
                fontSize: '13px', opacity: 0.9
              }}>
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '60px 48px'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: '26px', fontWeight: 400,
              color: 'var(--text-primary)', marginBottom: '8px'
            }}>Selamat datang</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Masuk ke akun dokter Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '7px' }}>
                Email
              </label>
              <input type="email" required placeholder="dokter@klinik.com"
                value={email} onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '7px' }}>
                Password
              </label>
              <input type="password" required placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
              />
            </div>

            {error && (
              <div style={{
                padding: '10px 14px', background: 'var(--danger-soft)',
                border: '1px solid #c0392b20', borderRadius: 'var(--radius-sm)',
                color: 'var(--danger)', fontSize: '13px'
              }}>{error}</div>
            )}

            <button type="submit" disabled={loading} style={{
              padding: '12px', marginTop: '4px',
              background: loading ? 'var(--bg-elevated)' : 'var(--accent)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              color: loading ? 'var(--text-muted)' : 'var(--accent-text)',
              fontSize: '14px', fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all .2s', boxShadow: loading ? 'none' : 'var(--shadow-md)'
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-hover)' }}
            onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)' }}
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div style={{
            marginTop: '32px', paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <a href="/register" style={{ color: 'var(--accent-text)', fontWeight: 600, borderBottom: '1.5px solid var(--accent)' }}>
              Daftar sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage