import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

const WAITLIST_KEY = 'waitlist_emails'

async function getEmails(): Promise<string[]> {
  try {
    const data = await kv.get<string[]>(WAITLIST_KEY)
    return data || []
  } catch {
    return []
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = body.email?.trim()?.toLowerCase()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const emails = await getEmails()

    if (emails.includes(email)) {
      return NextResponse.json({ message: "You're already on the list." })
    }

    emails.push(email)
    await kv.set(WAITLIST_KEY, emails)

    return NextResponse.json({ message: `You're in. #${emails.length} on the list.` })
  } catch (err) {
    console.error('Waitlist POST error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const emails = await getEmails()
    return NextResponse.json({ count: emails.length, emails })
  } catch (err) {
    console.error('Waitlist GET error:', err)
    return NextResponse.json({ count: 0, emails: [] })
  }
}
