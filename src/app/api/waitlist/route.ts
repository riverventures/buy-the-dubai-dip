import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json')

async function getWaitlist(): Promise<string[]> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveWaitlist(emails: string[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
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
      return NextResponse.json({ message: 'You\'re already on the list.' })
    }

    waitlist.push(email)
    await saveWaitlist(waitlist)

    return NextResponse.json({ message: `You're in. #${waitlist.length} on the list.` })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}

export async function GET() {
  const waitlist = await getWaitlist()
  return NextResponse.json({ count: waitlist.length })
}
