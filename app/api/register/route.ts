import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { name, email, password, clinicName } = await req.json()

  // Cek email sudah terdaftar
  const existing = await prisma.doctor.findUnique({
    where: { email }
  })
  if (existing) {
    return NextResponse.json(
      { error: 'Email sudah terdaftar' },
      { status: 400 }
    )
  }

  // Hash password sebelum disimpan — JANGAN simpan plain text
  const hashedPassword = await bcrypt.hash(password, 12)

  const doctor = await prisma.doctor.create({
    data: { name, email, password: hashedPassword, clinicName }
  })

  return NextResponse.json({
    message: 'Registrasi berhasil',
    doctorId: doctor.id
  })
}