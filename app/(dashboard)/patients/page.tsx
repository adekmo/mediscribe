'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Patient = {
  id: string; name: string; gender: string | null
  phone: string | null; allergies: string | null
  _count: { visits: number }; createdAt: string
}

const PatientsPage = () => {
    const router = useRouter()
    const [patients, setPatients] = useState<Patient[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/patients')
        .then(r => r.json())
        .then(data => { setPatients(data); setLoading(false) })
    }, [])

    const filtered = patients.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    const avatarColor = (name: string, gender: string | null) => {
      const palettes = [
        'linear-gradient(135deg, #2d6a4f, #40916c)',
        'linear-gradient(135deg, #c77b3b, #e09450)',
        'linear-gradient(135deg, #1a6b8a, #2196b0)',
        'linear-gradient(135deg, #7b4f9e, #9b6fc0)',
      ]
      const idx = name.charCodeAt(0) % palettes.length
      return gender === 'P'
        ? 'linear-gradient(135deg, #c77b3b, #e09450)'
        : palettes[idx]
    }
  return (
    <div style={{ maxWidth: '820px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: '30px', fontWeight: 400,
            color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.2
          }}>Data Pasien</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            {loading ? 'Memuat...' : `${patients.length} pasien terdaftar`}
          </p>
        </div>
        <button onClick={() => router.push('/patients/new')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px',
          background: 'var(--accent)', border: 'none',
          borderRadius: 'var(--radius-sm)', color: 'var(--accent-text)',
          fontSize: '14px', fontWeight: 500, cursor: 'pointer',
          boxShadow: '0 4px 20px #ffed6140', transition: 'all .2s'
        }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-hover)'}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--accent-text)">
            <path d="M12 5v14M5 12h14" stroke="var(--accent-text)" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          Tambah Pasien
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-hint)' }}>
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input type="text" placeholder="Cari nama pasien..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '10px 14px 10px 40px',
            background: 'var(--bg-surface)', border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-sm)', fontSize: '14px',
            color: 'var(--text-primary)', outline: 'none', transition: 'border-color .2s, box-shadow .2s'
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ height: '76px', background: 'var(--bg-surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', opacity: 0.6 }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '72px 20px',
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.4 }}>👤</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '6px', fontWeight: 500 }}>
            {search ? 'Pasien tidak ditemukan' : 'Belum ada pasien'}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            {search ? `Tidak ada pasien dengan nama "${search}"` : 'Klik tombol Tambah Pasien untuk mulai'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => router.push(`/patients/${p.id}`)}
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', padding: '14px 18px',
                background: 'var(--bg-surface)', border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius)', cursor: 'pointer', transition: 'all .15s'
              }}
              onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = 'var(--accent)'; d.style.background = '#fafffe'; d.style.boxShadow = 'var(--shadow-sm)' }}
              onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = 'var(--border)'; d.style.background = 'var(--bg-surface)'; d.style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: avatarColor(p.name, p.gender),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 600, color: 'white', flexShrink: 0,
                  boxShadow: '0 2px 8px #00000015'
                }}>
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {p.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{p.gender === 'L' ? 'Laki-laki' : p.gender === 'P' ? 'Perempuan' : '-'}</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{p.phone || 'No. telp belum diisi'}</span>
                    {p.allergies && (
                      <>
                        <span style={{ opacity: 0.4 }}>·</span>
                        <span style={{ color: 'var(--danger)', fontWeight: 500 }}>⚠ Alergi</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '12px', padding: '3px 10px',
                  background: p._count.visits > 0 ? 'var(--accent-soft)' : 'var(--bg-elevated)',
                  color: p._count.visits > 0 ? 'var(--accent-text)' : 'var(--text-muted)',
                  borderRadius: '20px', fontWeight: p._count.visits > 0 ? 500 : 400
                }}>
                  {p._count.visits} kunjungan
                </span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-hint)' }}>
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PatientsPage