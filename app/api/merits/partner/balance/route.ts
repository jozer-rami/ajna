import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const apiKey = process.env.MERITS_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is misconfigured: missing MERITS_API_KEY' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch('https://merits-staging.blockscout.com/partner/api/v1/balance', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    })
    if (!response.ok) {
      const text = await response.text()
      return NextResponse.json({ error: text }, { status: response.status })
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
