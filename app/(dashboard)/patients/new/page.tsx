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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
        })
        router.push('/patients')
    }
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-medium mb-6">Tambah pasien baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Nama lengkap *</label>
          <input required type="text"
            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div>
          <label className="text-sm text-gray-600">Tanggal lahir</label>
          <input type="date"
            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            value={form.dateOfBirth}
            onChange={e => setForm({...form, dateOfBirth: e.target.value})} />
        </div>
        <div>
          <label className="text-sm text-gray-600">Jenis kelamin</label>
          <select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            value={form.gender}
            onChange={e => setForm({...form, gender: e.target.value})}>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">No. telepon</label>
          <input type="tel"
            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})} />
        </div>
        <div>
          <label className="text-sm text-gray-600">Riwayat alergi</label>
          <textarea rows={2}
            placeholder="Contoh: Alergi Penisilin, Amoxicillin"
            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            value={form.allergies}
            onChange={e => setForm({...form, allergies: e.target.value})} />
        </div>
        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
          Simpan pasien
        </button>
      </form>
    </div>
  )
}

export default NewPatientPage