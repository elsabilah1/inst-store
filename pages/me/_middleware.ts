import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!session || session.role !== 0)
    return NextResponse.redirect('http://localhost:3000/login')

  return NextResponse.next()
}
