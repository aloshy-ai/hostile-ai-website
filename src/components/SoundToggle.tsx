import React from 'react'
import { Volume2, VolumeX } from 'lucide-react'

interface SoundToggleProps {
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
}

const SoundToggle: React.FC<SoundToggleProps> = ({ soundEnabled, setSoundEnabled }) => {
  return (
    <button 
      onClick={() => setSoundEnabled(!soundEnabled)}
      className="absolute top-4 right-4 p-2 hover:bg-gray-800/30 transition-colors"
    >
      {soundEnabled ? <Volume2 size={24} className="text-gray-500" /> : <VolumeX size={24} className="text-gray-500" />}
    </button>
  )
}

export default SoundToggle

