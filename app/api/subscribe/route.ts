import { cosmic } from '@/lib/cosmic'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, firstName, postId } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
    }

    await cosmic.objects.insertOne({
      title: email,
      type: 'subscribers',
      status: 'published',
      metadata: {
        email,
        first_name: firstName || '',
        source_post: postId || '',
        subscribed_at: new Date().toISOString().split('T')[0],
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const error = err as { message?: string; status?: number }

    // Handle duplicate email — unique constraint on the email field
    if (
      error?.message?.toLowerCase().includes('unique') ||
      error?.status === 409
    ) {
      return NextResponse.json(
        { error: 'You\'re already subscribed!' },
        { status: 409 }
      )
    }

    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
