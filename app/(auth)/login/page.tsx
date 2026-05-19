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
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-base)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, #0ea5e912 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse, #10b98108 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
            marginBottom: '16px',
            boxShadow: '0 0 30px #0ea5e930'
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '26px', fontWeight: 400,
            color: 'var(--text-primary)', margin: '0 0 6px'
          }}>MediScribe AI</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Asisten dokumentasi medis untuk dokter
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: '0 24px 60px #00000040'
        }}>
          <h2 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '24px', color: 'var(--text-primary)' }}>
            Masuk ke akun Anda
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Email
              </label>
              <input type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="dokter@klinik.com"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
                  fontSize: '14px', outline: 'none', transition: 'border-color .2s'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Password
              </label>
              <input type="password" required value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
                  fontSize: '14px', outline: 'none', transition: 'border-color .2s'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
              />
            </div>

            {error && (
              <div style={{
                padding: '10px 14px', background: 'var(--danger-soft)',
                border: '1px solid #f43f5e30', borderRadius: 'var(--radius-sm)',
                color: 'var(--danger)', fontSize: '13px'
              }}>{error}</div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '11px',
              background: loading ? 'var(--bg-elevated)' : 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              color: loading ? 'var(--text-muted)' : 'white',
              fontSize: '14px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all .2s', boxShadow: loading ? 'none' : '0 4px 20px #0ea5e930'
            }}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px' }}>
            Belum punya akun?{' '}
            <a href="/register" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Daftar di sini</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage