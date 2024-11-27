import React from 'react'

interface CountdownTimerProps {
  timeLeft: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft }) => {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-4 border-t border-red-500/30">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 font-light text-sm">NEXT AI INTERACTION IN</span>
        <span className="text-white/60 text-xl font-medium">{formatTime(timeLeft)}</span>
      </div>
    </div>
  )
}

export default CountdownTimer

