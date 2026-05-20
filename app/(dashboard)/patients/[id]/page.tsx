'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

type Patient = {
  id: string; name: string; dateOfBirth: string | null
  gender: string | null; phone: string | null
  allergies: string | null; visits: Visit[]
}
type Visit = {
  id: string; diagnosis: string | null
  soapNote: string | null; createdAt: string
}

const PatientDetailPage = () => {

    const router = useRouter()
    const params = useParams()
    const [patient, setPatient] = useState<Patient | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [form, setForm] = useState({ name: '', dateOfBirth: '', gender: 'L', phone: '', allergies: '' })
    const [saving, setSaving] = useState(false)

    const fetchPatient = () => {
      fetch(`/api/patients/${params.id}`).then(r => r.json()).then(data => {
        setPatient(data)
        setForm({
          name: data.name || '',
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '',
          gender: data.gender || 'L',
          phone: data.phone || '',
          allergies: data.allergies || ''
        })
        setLoading(false)
      })
    }

    useEffect(() => { fetchPatient() }, [params.id])

    const handleEdit = async (e: React.FormEvent) => {
      e.preventDefault(); setSaving(true)
      await fetch(`/api/patients/${params.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setSaving(false); setIsEditing(false); fetchPatient()
    }

    const handleDelete = async () => {
      if (!window.confirm(`Hapus pasien "${patient?.name}"?\nData tidak bisa dikembalikan.`)) return
      setDeleting(true)
      await fetch(`/api/patients/${params.id}`, { method: 'DELETE' })
      router.push('/patients')
    }

    const inputStyle: React.CSSProperties = {
      width: '100%', padding: '10px 13px',
      background: 'var(--bg-base)', border: '1.5px solid var(--border)',
      borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
      fontSize: '14px', outline: 'none', transition: 'border-color .2s, box-shadow .2s'
    }

    if (loading) return (
      <div style={{ maxWidth: '720px' }}>
        <div style={{ height: '24px', width: '120px', background: 'var(--bg-surface)', borderRadius: '6px', marginBottom: '32px' }} />
        <div style={{ height: '200px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }} />
      </div>
    )

    if (!patient) return (
      <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Pasien tidak ditemukan.</div>
    )

    const ageStr = patient.dateOfBirth
      ? `${Math.floor((Date.now() - new Date(patient.dateOfBirth).getTime()) / 31536000000)} tahun`
      : null
  return (
    <div style={{ maxWidth: '720px' }}>
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

      {/* Patient card */}
      {!isEditing ? (
        <div style={{
          background: 'var(--bg-surface)', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)', marginBottom: '20px'
        }}>
          {/* Card header */}
          <div style={{
            background: 'linear-gradient(120deg, #1a1500 0%, #3d3200 100%)',
            padding: '28px 28px 0', position: 'relative', overflow: 'hidden'
          }}>
            {/* decorative */}
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ position: 'absolute', bottom: '10px', right: '80px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', fontWeight: 600, color: 'white',
                  marginBottom: '-20px', flexShrink: 0
                }}>
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '22px', fontWeight: 400, color: 'white', marginBottom: '4px' }}>
                    {patient.name}
                  </h1>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                    {patient.gender === 'L' ? 'Laki-laki' : patient.gender === 'P' ? 'Perempuan' : '-'}
                    {ageStr && ` · ${ageStr}`}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <button onClick={() => setIsEditing(true)} style={{
                  padding: '7px 14px',
                  background: 'rgba(255,237,97,0.15)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,237,97,0.3)', borderRadius: 'var(--radius-sm)',
                  color: 'var(--accent)', fontSize: '13px', cursor: 'pointer', transition: 'all .15s'
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)'}
                >Edit</button>
                <button onClick={handleDelete} disabled={deleting} style={{
                  padding: '7px 14px',
                  background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-sm)',
                  color: 'rgba(255,255,255,0.8)', fontSize: '13px', cursor: 'pointer', transition: 'all .15s'
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(192,57,43,0.4)'; b.style.borderColor = 'rgba(192,57,43,0.5)' }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(255,255,255,0.1)'; b.style.borderColor = 'rgba(255,255,255,0.2)' }}
                >{deleting ? 'Menghapus...' : 'Hapus'}</button>
              </div>
            </div>
          </div>

          {/* Card body */}
          <div style={{ padding: '28px', paddingTop: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { label: 'Tanggal Lahir', value: patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' },
                { label: 'No. Telepon', value: patient.phone || '-' },
              ].map(f => (
                <div key={f.label}>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</p>
                  <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{f.value}</p>
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Riwayat Alergi</p>
                {patient.allergies ? (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px', background: 'var(--danger-soft)',
                    border: '1px solid #c0392b20', borderRadius: '100px',
                    color: 'var(--danger)', fontSize: '13px', fontWeight: 500
                  }}>
                    <span>⚠</span> {patient.allergies}
                  </div>
                ) : (
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Tidak ada riwayat alergi</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Edit form
        <div style={{
          background: 'var(--bg-surface)', border: '1.5px solid var(--accent)',
          borderRadius: 'var(--radius-lg)', padding: '28px',
          boxShadow: '0 0 0 4px var(--accent-soft)', marginBottom: '20px'
        }}>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '18px', fontWeight: 400, marginBottom: '20px', color: 'var(--text-primary)' }}>
            Edit data pasien
          </h2>
          <form onSubmit={handleEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Nama lengkap', key: 'name', type: 'text' },
              { label: 'Tanggal lahir', key: 'dateOfBirth', type: 'date' },
              { label: 'No. telepon', key: 'phone', type: 'tel' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                <input type={f.type}
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
            ))}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Jenis kelamin</label>
              <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} style={inputStyle}>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Riwayat alergi</label>
              <textarea rows={2} value={form.allergies}
                onChange={e => setForm({ ...form, allergies: e.target.value })}
                placeholder="Contoh: Alergi Penisilin, Amoxicillin"
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--accent)'; (e.target as HTMLTextAreaElement).style.boxShadow = '0 0 0 3px var(--accent-soft)' }}
                onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'; (e.target as HTMLTextAreaElement).style.boxShadow = 'none' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button type="submit" disabled={saving} style={{
                flex: 1, padding: '11px',
                background: saving ? 'var(--bg-elevated)' : 'var(--accent)',
                border: 'none', borderRadius: 'var(--radius-sm)',
                color: saving ? 'var(--text-muted)' : 'var(--accent-text)',
                fontSize: '14px', fontWeight: 500, cursor: saving ? 'not-allowed' : 'pointer'
              }}>{saving ? 'Menyimpan...' : 'Simpan perubahan'}</button>
              <button type="button" onClick={() => setIsEditing(false)} style={{
                flex: 1, padding: '11px',
                background: 'transparent', border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)',
                fontSize: '14px', cursor: 'pointer'
              }}>Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Visit history */}
      <div>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '18px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '14px' }}>
          Riwayat Kunjungan
          <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '8px', fontFamily: 'inherit' }}>
            ({patient.visits.length})
          </span>
        </h2>
        {patient.visits.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '48px 20px',
            background: 'var(--bg-surface)', border: '1.5px dashed var(--border)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px', opacity: 0.4 }}>📋</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px', fontWeight: 500 }}>Belum ada riwayat kunjungan</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Kunjungan akan muncul setelah konsultasi pertama dicatat</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {patient.visits.map((visit, idx) => (
              <div key={visit.id} style={{
                padding: '16px 20px',
                background: 'var(--bg-surface)', border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius)', display: 'flex',
                alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px',
                color: 'var(--accent-text)'
              }}>
                <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'var(--accent-soft)', border: '1px solid var(--accent-soft)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 600, color: 'var(--accent)', flexShrink: 0
                  }}>
                    {patient.visits.length - idx}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '3px' }}>
                      {visit.diagnosis || 'Diagnosis belum diisi'}
                    </p>
                    {visit.soapNote && (
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {visit.soapNote}
                      </p>
                    )}
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {new Date(visit.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientDetailPage