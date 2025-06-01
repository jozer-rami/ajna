import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, context: { params: { address: string } }) {
  const { address } = context.params

  if (!address) {
    return NextResponse.json({ error: 'Address is required in path' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://merits-staging.blockscout.com/api/v1/auth/user/${address}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
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
