/* eslint-disable @next/next/no-server-import-in-page */
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (path.startsWith('/admin')) {
    if (!session || session.role !== 1)
      return NextResponse.redirect('http://localhost:3000/login')
  }

  if (path.startsWith('/me')) {
    if (!session || session.role !== 0)
      return NextResponse.redirect('http://localhost:3000/login')
  }

  return NextResponse.next()
}
