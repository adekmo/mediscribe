'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {

    const router = useRouter()
    const [form, setForm] = useState({
        name: '', email: '', password: '', clinicName: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error)
            setLoading(false)
            return
        }

        router.push('/login?registered=true')
    }

    const inputStyle: React.CSSProperties = {
      width: '100%', padding: '11px 14px',
      background: 'var(--bg-base)', border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
      fontSize: '14px', outline: 'none', transition: 'border-color .2s, box-shadow .2s'
    }

    const fields = [
      { label: 'Nama lengkap', key: 'name', type: 'text', placeholder: 'dr. Budi Santoso', required: true },
      { label: 'Email', key: 'email', type: 'email', placeholder: 'dokter@klinik.com', required: true },
      { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••', required: true },
      { label: 'Nama klinik', key: 'clinicName', type: 'text', placeholder: 'Klinik Sehat Abadi (opsional)', required: false },
    ]
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-base)',
      display: 'grid', gridTemplateColumns: '1fr 1fr'
    }}>
      {/* Left panel */}
      <div style={{
        background: 'linear-gradient(160deg, #1a1500 0%, #3d3200 50%, #5a4a00 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px', position: 'relative', overflow: 'hidden'
      }}>
        {[
          { w: 280, h: 280, top: '-60px', right: '-60px', opacity: 0.07 },
          { w: 180, h: 180, bottom: '80px', left: '-30px', opacity: 0.08 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', width: c.w, height: c.h,
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            borderRadius: '50%', background: 'white', opacity: c.opacity, pointerEvents: 'none'
          }} />
        ))}
        <div style={{ position: 'relative', color: 'white', maxWidth: '320px', textAlign: 'center' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px'
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" fill="white" opacity=".9"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 19v3M9 22h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '32px', fontWeight: 400, lineHeight: 1.2, marginBottom: '16px' }}>
            Bergabung dengan<br /><em>MediScribe AI</em>
          </h1>
          <p style={{ opacity: 0.75, fontSize: '14px', lineHeight: 1.7 }}>
            Ribuan dokter sudah memakai MediScribe untuk menghemat waktu pencatatan medis mereka.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px' }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '26px', fontWeight: 400, marginBottom: '8px' }}>
              Buat akun dokter
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Mulai uji coba gratis 14 hari, tidak perlu kartu kredit.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {fields.map(f => (
              <div key={f.key}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '7px' }}>
                  {f.label}
                </label>
                <input type={f.type} required={f.required} placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
            ))}

            {error && (
              <div style={{ padding: '10px 14px', background: 'var(--danger-soft)', border: '1px solid #c0392b20', borderRadius: 'var(--radius-sm)', color: 'var(--danger)', fontSize: '13px' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              padding: '12px', marginTop: '4px',
              background: loading ? 'var(--bg-elevated)' : 'var(--accent)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              color: loading ? 'var(--text-muted)' : 'var(--accent-text)',
              fontSize: '14px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all .2s', boxShadow: loading ? 'none' : 'var(--shadow-md)'
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-hover)' }}
            onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)' }}
            >
              {loading ? 'Membuat akun...' : 'Daftar sekarang'}
            </button>
          </form>

          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Sudah punya akun?{' '}
              <a href="/login" style={{ color: 'var(--accent-text)', fontWeight: 600, borderBottom: '1.5px solid var(--accent)' }}>Masuk di sini</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage