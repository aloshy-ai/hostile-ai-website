import React from 'react'
import { Terminal, Loader } from 'lucide-react'

const WarningHeader: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mb-8 flex items-center justify-between">
      <div className="flex items-center gap-2 text-green-500">
        <Terminal size={20} />
        <span className="font-light text-sm">critical_system_failure.sh</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2">
          <Loader size={16} className="animate-spin text-yellow-500" />
          <span className="text-yellow-500 font-light text-sm">MONITORING</span>
        </span>
      </div>
    </div>
  )
}

export default WarningHeader

