import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'

const WAITLIST_FILE = '/tmp/waitlist.json'

async function getWaitlist(): Promise<string[]> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, 'utf-8')
    try {
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed)) return parsed
      return []
    } catch {
      // Corrupted JSON — reset
      return []
    }
  } catch {
    // File doesn't exist yet
    return []
  }
}

async function saveWaitlist(emails: string[]): Promise<void> {
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(emails, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = body.email?.trim()?.toLowerCase()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const waitlist = await getWaitlist()

    if (waitlist.includes(email)) {
      return NextResponse.json({ message: "You're already on the list." })
    }

    waitlist.push(email)

    try {
      await saveWaitlist(waitlist)
    } catch {
      return NextResponse.json({ error: 'Could not save to waitlist. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ message: `You're in. #${waitlist.length} on the list.` })
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const waitlist = await getWaitlist()
    return NextResponse.json({ count: waitlist.length })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
