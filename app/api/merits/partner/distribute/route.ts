import { NextRequest, NextResponse } from 'next/server'

type DistributionItem = {
  address: string
  amount: string
}

type RequestBody = {
  id: string
  description: string
  distributions: DistributionItem[]
  create_missing_accounts: boolean
  expected_total: string
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.MERITS_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is misconfigured: missing MERITS_API_KEY' },
      { status: 500 }
    )
  }

  const body = (await req.json()) as RequestBody
  const { id, description, distributions, create_missing_accounts, expected_total } = body

  if (!id || !description || !Array.isArray(distributions) || distributions.length === 0 || !expected_total) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  try {
    const response = await fetch('https://merits-staging.blockscout.com/partner/api/v1/distribute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        id,
        description,
        distributions,
        create_missing_accounts,
        expected_total,
      }),
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
