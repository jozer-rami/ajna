'use client'

import { useState } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'
import { Button, Input } from '@worldcoin/mini-apps-ui-kit-react'
import { useSession, signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export const NFT_CONTRACT_ADDRESS = '0xYourNFTContractAddressHere'

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

  const [cardId, setCardId] = useState(searchParams.get('card') || '')
  const [birthHash, setBirthHash] = useState(searchParams.get('birthHash') || '')
  const [messageCID, setMessageCID] = useState(searchParams.get('cid') || '')
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
        <p className="text-green-600 break-all">
          Transaction sent! TxHash{' '}
          <a
            href={`https://worldscan.io/tx/${successTxHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {successTxHash}
          </a>
        </p>
      )}
    </div>
  )
}
