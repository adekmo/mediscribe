import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const patients = await prisma.patient.findMany({
    where: { doctorId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { visits: true } }
    }
  })

  return NextResponse.json(patients)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, dateOfBirth, gender, phone, allergies } = await req.json()

  const patient = await prisma.patient.create({
    data: {
      doctorId: session.user.id,
      name,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      gender,
      phone,
      allergies
    }
  })

  return NextResponse.json(patient)
}