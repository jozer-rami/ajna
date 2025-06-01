'use client'

import { useState, useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'
import { Button, Input } from '@worldcoin/mini-apps-ui-kit-react'
import { useSession, signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export const NFT_CONTRACT_ADDRESS = '0xC72F8B1148D0d67397F543b37bedE31cf167D71D'

const NFT_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'cardId', type: 'uint256' },
      { internalType: 'string', name: 'birthHash', type: 'string' },
      { internalType: 'string', name: 'messageCID', type: 'string' },
    ],
    name: 'mintWhitelisted',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export const MintNFT = () => {
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const [cardId, setCardId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedCard') || searchParams.get('card') || ''
    }
    return searchParams.get('card') || ''
  })

  const [birthHash, setBirthHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('birthHash') || searchParams.get('birthHash') || ''
    }
    return searchParams.get('birthHash') || ''
  })

  const [messageCID, setMessageCID] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('messageCID') || searchParams.get('cid') || ''
    }
    return searchParams.get('cid') || ''
  })

  useEffect(() => {
    if (cardId) localStorage.setItem('selectedCard', cardId)
  }, [cardId])

  useEffect(() => {
    if (birthHash) localStorage.setItem('birthHash', birthHash)
  }, [birthHash])

  useEffect(() => {
    if (messageCID) localStorage.setItem('messageCID', messageCID)
  }, [messageCID])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successTxHash, setSuccessTxHash] = useState<string | null>(null)

  if (!session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p>You must be signed in to mint an NFT</p>
        <Button onClick={() => signIn()} variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    )
  }

  const handleMintNFT = async () => {
    setLoading(true)
    setError(null)
    setSuccessTxHash(null)

    try {
      const fromAddress = MiniKit.user?.address
      if (!fromAddress) {
        throw new Error('Unable to detect your wallet address')
      }
      if (!cardId || !birthHash || !messageCID) {
        throw new Error('All fields are required')
      }

      const txPayload = {
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_ABI,
        functionName: 'mintWhitelisted' as const,
        args: [cardId, birthHash, messageCID],
      }

      const response = await MiniKit.commandsAsync.sendTransaction({
        transaction: [txPayload],
      })

      const txHash = (response.finalPayload as any)?.txHash ||
        (response.finalPayload as any)?.transaction_id

      if (txHash) {
        setSuccessTxHash(txHash)
        if (typeof window !== 'undefined') {
          localStorage.setItem('mintTxHash', txHash)
        }
      } else if ((response.finalPayload as any)?.error_code) {
        throw new Error('Transaction failed')
      }
    } catch (e: any) {
      console.error(e)
      setError(e?.message || 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm w-full">
      <Input
        label="Card ID"
        variant="floating-label"
        value={cardId}
        onChange={(e) => setCardId(e.target.value)}
        placeholder="e.g. 1"
      />
      <Input
        label="Birth Hash"
        variant="floating-label"
        value={birthHash}
        onChange={(e) => setBirthHash(e.target.value)}
        placeholder="0x..."
      />
      <Input
        label="Message CID"
        variant="floating-label"
        value={messageCID}
        onChange={(e) => setMessageCID(e.target.value)}
        placeholder="e.g. ipfs://..."
      />
      <Button onClick={handleMintNFT} disabled={loading} variant="primary" size="lg">
        {loading ? 'Minting…' : 'Mint NFT'}
      </Button>
      {error && <p className="text-red-600">{error}</p>}
      {successTxHash && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-green-600 break-all">Transaction sent!</p>
          <Button asChild variant="primary" size="lg">
            <a
              href={`https://blockscout.com/tx/${successTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Blockscout
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
