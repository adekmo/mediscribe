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

    const inputStyle = {
        width: '100%', padding: '10px 14px',
        background: 'var(--bg-elevated)', border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
        fontSize: '14px', outline: 'none', transition: 'border-color .2s'
    }
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-base)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, #0ea5e910 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
            marginBottom: '16px', boxShadow: '0 0 30px #0ea5e930'
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '26px', fontWeight: 400, color: 'var(--text-primary)', margin: '0 0 6px' }}>
            MediScribe AI
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Buat akun dokter baru</p>
        </div>

        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '32px',
          boxShadow: '0 24px 60px #00000040'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Nama lengkap', key: 'name', type: 'text', placeholder: 'dr. Budi Santoso' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'dokter@klinik.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Nama klinik (opsional)', key: 'clinicName', type: 'text', placeholder: 'Klinik Sehat Abadi' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required={field.key !== 'clinicName'}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                />
              </div>
            ))}

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
              boxShadow: loading ? 'none' : '0 4px 20px #0ea5e930'
            }}>
              {loading ? 'Memproses...' : 'Daftar sekarang'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px' }}>
            Sudah punya akun?{' '}
            <a href="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Masuk di sini</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage