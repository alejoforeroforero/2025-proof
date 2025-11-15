'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Modal from '@/app/components/Modal'
import VerifyHumanity from '@/app/components/VerifyHumanity'
import ConnectWallet from '@/app/components/ConnectWallet'
import ConnectingWallet from '@/app/components/ConnectingWallet'
import SolvePuzzle from '@/app/components/SolvePuzzle'
import BlockchainVerifying from '@/app/components/BlockchainVerifying'
import SuccessScreen from '@/app/components/SuccessScreen'
import FailureScreen from '@/app/components/FailureScreen'

type Screen = 'verify' | 'connect' | 'connecting' | 'puzzle' | 'blockchain' | 'success' | 'failure'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<Screen>('verify')

  const handleStart = () => {
    setCurrentScreen('connect')
  }

  const handleConnect = () => {
    setCurrentScreen('connecting')
    
    // Simulate wallet connection delay
    setTimeout(() => {
      setCurrentScreen('puzzle')
    }, 2000)
  }

  const handlePuzzleSubmit = () => {
    setCurrentScreen('blockchain')
    
    // Simulate blockchain verification delay
    setTimeout(() => {
      // Randomly show success or failure (70% success rate)
      const isSuccess = Math.random() > 0.3
      setCurrentScreen(isSuccess ? 'success' : 'failure')
    }, 3000)
  }

  const handleRetry = () => {
    setCurrentScreen('puzzle')
  }

  const handleUploadSong = () => {
    alert('Redirecting to upload page...')
    setIsModalOpen(false)
    setCurrentScreen('verify')
    // TODO: Navigate to actual upload page
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setCurrentScreen('verify')
  }

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg"
      >
        Open Verification Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        {currentScreen === 'verify' && <VerifyHumanity onStart={handleStart} />}
        {currentScreen === 'connect' && <ConnectWallet onConnect={handleConnect} />}
        {currentScreen === 'connecting' && <ConnectingWallet />}
        {currentScreen === 'puzzle' && <SolvePuzzle onSubmit={handlePuzzleSubmit} />}
        {currentScreen === 'blockchain' && <BlockchainVerifying />}
        {currentScreen === 'success' && <SuccessScreen onUploadSong={handleUploadSong} />}
        {currentScreen === 'failure' && <FailureScreen onRetry={handleRetry} />}
      </Modal>
    </main>
  )
}