'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Patient = {
  id: string; name: string; gender: string
  phone: string; _count: { visits: number }
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
  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', fontWeight: 400, margin: '0 0 4px', color: 'var(--text-primary)' }}>
            Data Pasien
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            {loading ? '...' : `${patients.length} pasien terdaftar`}
          </p>
        </div>
        <button
          onClick={() => router.push('/patients/new')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 18px',
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
            border: 'none', borderRadius: 'var(--radius-sm)',
            color: 'white', fontSize: '14px', fontWeight: 500,
            cursor: 'pointer', boxShadow: '0 4px 20px #0ea5e930'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Tambah Pasien
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text" placeholder="Cari nama pasien..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '10px 14px 10px 42px',
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
            fontSize: '14px', outline: 'none'
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      {/* List */}
      {loading ? (
        <div style={{ color: 'var(--text-muted)', fontSize: '14px', padding: '40px 0', textAlign: 'center' }}>
          Memuat data pasien...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 16px', opacity: 0.3 }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="var(--text-secondary)" strokeWidth="1.5"/>
            <circle cx="9" cy="7" r="4" stroke="var(--text-secondary)" strokeWidth="1.5"/>
          </svg>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 4px' }}>
            {search ? 'Pasien tidak ditemukan' : 'Belum ada pasien'}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
            {search ? 'Coba kata kunci lain' : 'Klik tombol Tambah Pasien untuk mulai'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(p => (
            <div key={p.id}
              onClick={() => router.push(`/patients/${p.id}`)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', cursor: 'pointer', transition: 'all .15s'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)'
                ;(e.currentTarget as HTMLDivElement).style.background = 'var(--bg-elevated)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLDivElement).style.background = 'var(--bg-surface)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Avatar */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: p.gender === 'P'
                    ? 'linear-gradient(135deg, #f472b6, #ec4899)'
                    : 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 600, color: 'white', flexShrink: 0
                }}>
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {p.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                    {p.gender === 'L' ? 'Laki-laki' : p.gender === 'P' ? 'Perempuan' : '-'} · {p.phone || 'No. telp belum diisi'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '12px', padding: '3px 10px',
                  background: 'var(--bg-elevated)', borderRadius: '20px',
                  color: 'var(--text-muted)', border: '1px solid var(--border-light)'
                }}>
                  {p._count.visits} kunjungan
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)' }}>
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