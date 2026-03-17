import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

const WAITLIST_KEY = 'waitlist:emails'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = body.email?.trim()?.toLowerCase()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    // Check if already registered
    const isMember = await kv.sismember(WAITLIST_KEY, email)
    if (isMember) {
      return NextResponse.json({ message: "You're already on the list." })
    }

    // Add to set
    await kv.sadd(WAITLIST_KEY, email)
    const count = await kv.scard(WAITLIST_KEY)

    return NextResponse.json({ message: `You're in. #${count} on the list.` })
  } catch (err) {
    console.error('Waitlist POST error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const count = await kv.scard(WAITLIST_KEY)
    const emails = await kv.smembers(WAITLIST_KEY)
    return NextResponse.json({ count, emails })
  } catch (err) {
    console.error('Waitlist GET error:', err)
    return NextResponse.json({ count: 0, emails: [] })
  }
}
