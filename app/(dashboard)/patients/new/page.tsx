'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const NewPatientPage = () => {

    const router = useRouter()
    const [form, setForm] = useState({
        name: '', 
        dateOfBirth: '', 
        gender: 'L',
        phone: '', 
        allergies: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); setLoading(true)
      await fetch('/api/patients', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      router.push('/patients')
    }

    const inputStyle: React.CSSProperties = {
      width: '100%', padding: '10px 13px',
      background: 'var(--bg-base)', border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
      fontSize: '14px', outline: 'none', transition: 'border-color .2s, box-shadow .2s'
    }
  return (
    <div style={{ maxWidth: '560px' }}>
      {/* Breadcrumb */}
      <button onClick={() => router.push('/patients')} style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px', padding: 0
      }}
      onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)'}
      onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Kembali ke daftar pasien
      </button>

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '28px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Tambah Pasien Baru
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Isi data dasar pasien. Data bisa dilengkapi nanti.
        </p>
      </div>

      <div style={{
        background: 'var(--bg-surface)', border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '7px' }}>
              Nama lengkap <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input type="text" required placeholder="dr. Budi Santoso / Budi Santoso"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '7px' }}>
                Jenis kelamin
              </label>
              <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} style={inputStyle}>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '7px' }}>
                Tanggal lahir
              </label>
              <input type="date" value={form.dateOfBirth}
                onChange={e => setForm({ ...form, dateOfBirth: e.target.value })}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '7px' }}>
              No. telepon
            </label>
            <input type="tel" placeholder="08xx-xxxx-xxxx"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '7px' }}>
              Riwayat alergi
            </label>
            <textarea rows={2}
              placeholder="Contoh: Alergi Penisilin, Amoxicillin, Aspirin"
              value={form.allergies}
              onChange={e => setForm({ ...form, allergies: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--accent)'; (e.target as HTMLTextAreaElement).style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
              onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'; (e.target as HTMLTextAreaElement).style.boxShadow = 'none' }}
            />
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '5px' }}>
              Kosongkan jika tidak ada riwayat alergi
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
            <button type="submit" disabled={loading} style={{
              flex: 1, padding: '12px',
              background: loading ? 'var(--bg-elevated)' : 'var(--accent)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              color: loading ? 'var(--text-muted)' : 'var(--accent-text)',
              fontSize: '14px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 16px #ffed6140', transition: 'all .2s'
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-hover)' }}
            onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)' }}
            >
              {loading ? 'Menyimpan...' : 'Simpan pasien'}
            </button>
            <button type="button" onClick={() => router.push('/patients')} style={{
              padding: '12px 20px',
              background: 'transparent', border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)',
              fontSize: '14px', cursor: 'pointer', transition: 'all .15s'
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--text-muted)'; b.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--border)'; b.style.color = 'var(--text-secondary)' }}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPatientPage