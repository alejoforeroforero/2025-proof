'use client'

import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-2xl p-10 max-w-3xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-transparent border-2 border-gray-600 hover:border-gray-500 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-2xl font-light p-0"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}