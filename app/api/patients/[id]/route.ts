import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params  // ← await params dulu
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const patient = await prisma.patient.findFirst({
    where: { id, doctorId: session.user.id },
    include: { visits: { orderBy: { createdAt: 'desc' } } }
  })

  if (!patient) {
    return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 })
  }

  return NextResponse.json(patient)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params  // ← await params dulu
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, dateOfBirth, gender, phone, allergies } = await req.json()

  const patient = await prisma.patient.updateMany({
    where: { id, doctorId: session.user.id },
    data: {
      name,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      gender,
      phone,
      allergies
    }
  })

  return NextResponse.json(patient)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params  // ← await params dulu
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.patient.deleteMany({
    where: { id, doctorId: session.user.id }
  })

  return NextResponse.json({ message: 'Pasien dihapus' })
}