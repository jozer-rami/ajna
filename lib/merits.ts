export async function awardMerits(address: string, amount: string, description: string) {
  try {
    const res = await fetch('/api/merits/partner/distribute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: `award_${address}_${Date.now()}`,
        description,
        distributions: [{ address, amount }],
        create_missing_accounts: true,
        expected_total: amount,
      }),
    })
    if (!res.ok) {
      const txt = await res.text()
      throw new Error(txt)
    }
    return await res.json()
  } catch (err) {
    console.error('Merits error:', err)
    return null
  }
}
