'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

type Patient = {
  id: string
  name: string
  dateOfBirth: string | null
  gender: string | null
  phone: string | null
  allergies: string | null
  visits: Visit[]
}

type Visit = {
  id: string
  diagnosis: string | null
  soapNote: string | null
  createdAt: string
}

const PatientDetailPage = () => {

    const router = useRouter()
    const params = useParams()
    const [patient, setPatient] = useState<Patient | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [form, setForm] = useState({
        name: '', dateOfBirth: '', gender: '', phone: '', allergies: ''
    })

    useEffect(() => {
        fetch(`/api/patients/${params.id}`)
        .then(r => r.json())
        .then(data => {
            setPatient(data)
            setForm({
            name: data.name || '',
            dateOfBirth: data.dateOfBirth
                ? new Date(data.dateOfBirth).toISOString().split('T')[0]
                : '',
            gender: data.gender || '',
            phone: data.phone || '',
            allergies: data.allergies || ''
            })
            setLoading(false)
        })
    }, [params.id])

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch(`/api/patients/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
        })
        setIsEditing(false)
        // Refresh data
        fetch(`/api/patients/${params.id}`)
        .then(r => r.json())
        .then(data => setPatient(data))
    }

    const handleDelete = async () => {
        const confirm = window.confirm(
        `Hapus pasien "${patient?.name}"? Data tidak bisa dikembalikan.`
        )
        if (!confirm) return

        setDeleting(true)
        await fetch(`/api/patients/${params.id}`, { method: 'DELETE' })
        router.push('/patients')
    }

    if (loading) return (
        <div className="max-w-2xl mx-auto p-6">
        <p className="text-gray-400 text-sm">Memuat data pasien...</p>
        </div>
    )

    if (!patient) return (
        <div className="max-w-2xl mx-auto p-6">
        <p className="text-red-400 text-sm">Pasien tidak ditemukan.</p>
        </div>
    )
  return (
    <div className="max-w-2xl mx-auto p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push('/patients')}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          ← Kembali
        </button>
      </div>

      {/* Info pasien */}
      {!isEditing ? (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-medium">{patient.name}</h1>
              <p className="text-sm text-gray-400 mt-1">
                {patient.gender === 'L' ? 'Laki-laki' : 'Perempuan'} ·{' '}
                {patient.dateOfBirth
                  ? new Date(patient.dateOfBirth).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })
                  : 'Tgl lahir belum diisi'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm px-3 py-1.5 border rounded-lg hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-sm px-3 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 disabled:opacity-50"
              >
                {deleting ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">No. Telepon</p>
              <p className="mt-0.5">{patient.phone || '-'}</p>
            </div>
            <div>
              <p className="text-gray-400">Riwayat Alergi</p>
              <p className={`mt-0.5 ${patient.allergies ? 'text-red-500 font-medium' : ''}`}>
                {patient.allergies || 'Tidak ada'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Form edit
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="font-medium mb-4">Edit data pasien</h2>
          <form onSubmit={handleEdit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Nama lengkap</label>
              <input required type="text"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Tanggal lahir</label>
              <input type="date"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                value={form.dateOfBirth}
                onChange={e => setForm({ ...form, dateOfBirth: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Jenis kelamin</label>
              <select
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value })}
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">No. telepon</label>
              <input type="tel"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Riwayat alergi</label>
              <textarea rows={2}
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                value={form.allergies}
                onChange={e => setForm({ ...form, allergies: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
              >
                Simpan perubahan
              </button>
              <button type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 border py-2 rounded-lg text-sm"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Riwayat kunjungan */}
      <div>
        <h2 className="font-medium mb-3">
          Riwayat Kunjungan ({patient.visits.length})
        </h2>
        {patient.visits.length === 0 ? (
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">Belum ada riwayat kunjungan</p>
            <p className="text-gray-300 text-xs mt-1">
              Kunjungan akan muncul setelah konsultasi pertama
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {patient.visits.map(visit => (
              <div key={visit.id} className="bg-white border rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">
                    {visit.diagnosis || 'Diagnosis belum diisi'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(visit.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                </div>
                {visit.soapNote && (
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {visit.soapNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default PatientDetailPage