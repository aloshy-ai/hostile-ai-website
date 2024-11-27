import React from 'react'

interface SystemMessagesProps {
  messages: string[]
}

const SystemMessages: React.FC<SystemMessagesProps> = ({ messages }) => {
  return (
    <div className="w-full max-w-3xl font-light text-xs">
      {messages.map((msg, idx) => (
        <div key={idx} className="text-green-500 opacity-75 hover:opacity-100 transition-opacity">
          {`>[${new Date().toLocaleTimeString()}] ${msg}`}
        </div>
      ))}
    </div>
  )
}

export default SystemMessages

