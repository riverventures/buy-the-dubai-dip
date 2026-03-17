import { NextRequest, NextResponse } from 'next/server'
import Redis from 'ioredis'

const WAITLIST_KEY = 'waitlist_emails'

function getRedis() {
  const url = process.env.REDIS_URL
  if (!url) throw new Error('REDIS_URL not set')
  return new Redis(url, { lazyConnect: true, connectTimeout: 5000 })
}

export async function POST(request: NextRequest) {
  const redis = getRedis()
  try {
    await redis.connect()
    const body = await request.json()
    const email = body.email?.trim()?.toLowerCase()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    // Use a Redis Set for dedup
    const added = await redis.sadd(WAITLIST_KEY, email)
    const count = await redis.scard(WAITLIST_KEY)

    if (added === 0) {
      return NextResponse.json({ message: "You're already on the list." })
    }

    return NextResponse.json({ message: `You're in. #${count} on the list.` })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Waitlist POST error:', msg)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  } finally {
    redis.disconnect()
  }
}

export async function GET() {
  const redis = getRedis()
  try {
    await redis.connect()
    const count = await redis.scard(WAITLIST_KEY)
    return NextResponse.json({ count })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Waitlist GET error:', msg)
    return NextResponse.json({ count: 0 })
  } finally {
    redis.disconnect()
  }
}
