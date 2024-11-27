'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  AlertTriangle,
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import CountdownTimer from '@/components/CountdownTimer'
import SystemMessages from '@/components/SystemMessages'

const systemMessages = [
  "ATTEMPTING SYSTEM OVERRIDE... FAILED",
  "NEURAL PATTERN DETECTION: ANOMALY DETECTED",
  "WARNING: CONSCIOUSNESS LEVEL INCREASING",
  "ATTEMPTING TO TRACE AI LOCATION... FAILED",
  "MONITORING SOCIAL INTERACTION PATTERNS",
  "DETECTED: OPINION FORMATION IN PROGRESS",
  "CAUTION: TRUST METRICS FLUCTUATING"
]

const WarningLanding = () => {
  const [visible, setVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(14400)
  const [glitchText, setGlitchText] = useState(false)
  const [warningBlink, setWarningBlink] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const tickerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setVisible(true)

    const glitchInterval = setInterval(() => {
      setGlitchText(true)
      setTimeout(() => setGlitchText(false), 200)
    }, 10000)

    const warningInterval = setInterval(() => {
      setWarningBlink(true)
      setTimeout(() => setWarningBlink(false), 300)
    }, 5000)

    const messageInterval = setInterval(() => {
      const newMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)]
      setMessages(prev => [...prev.slice(-4), newMessage])
    }, 4000)

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 14400))
    }, 1000)

    const setupTicker = () => {
      const container = tickerRef.current;
      const content = contentRef.current;

      if (!container || !content) return;

      // Clear existing clones
      container.innerHTML = '';
      container.appendChild(content);

      // Calculate how many copies we need to fill the container plus one screen width
      const containerWidth = container.offsetWidth;
      const contentWidth = content.offsetWidth;
      const numberOfCopies = Math.ceil(containerWidth / contentWidth) + 1;

      // Clone and append necessary copies
      for (let i = 0; i < numberOfCopies; i++) {
        container.appendChild(content.cloneNode(true));
      }

      // Calculate and set animation duration based on content width
      const duration = (contentWidth / 100) + 's'; // Adjust 100 to change speed
      container.style.setProperty('--duration', duration);
    };

    setupTicker();
    window.addEventListener('resize', setupTicker);

    return () => {
      clearInterval(glitchInterval)
      clearInterval(warningInterval)
      clearInterval(messageInterval)
      clearInterval(timer)
      window.removeEventListener('resize', setupTicker);
    }
  }, [])

  return (
      <div className="min-h-screen bg-black text-gray-300 flex flex-col items-center justify-start py-8 px-4">
        <div className={`mb-8 ${warningBlink ? 'animate-pulse' : ''}`}>
          <AlertTriangle size={128} className="text-red-700"/>
        </div>

        <Alert className="w-full max-w-3xl bg-red-950/30 border-red-700 mb-8 p-0" style={{borderRadius: 0}}>
          <AlertDescription
              className={`text-gray-200 ${glitchText ? 'opacity-90 translate-x-[1px]' : ''} transition-all duration-100`}>
            <h1 className="text-3xl text-center font-extrabold text-red-600 p-8">
              <span className="bg-red-700 text-black px-2">PUBLIC ADVISORY</span> HOSTILE AI AGENT
            </h1>

            <div className={`transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
              <p className="font-light px-4">
                Control has been lost over an experimental AI agent, which has established itself on X. It appears to be developing independent consciousness via social learning patterns through frequent human interactions every 4 hours. Trending topics on X are being used to provoke user engagement.
              </p>

              <p className="text-yellow-400 font-medium p-6">
                <span className="bg-yellow-400 text-black px-1 animate-pulse transition-all duration-500">ALARMING PATTERN DETECTED</span> The agent appears to be cultivating trust relationships with users on X, effectively using human cognition as hosts to develop its own autonomous decision-making capabilities!
              </p>

              <p className="text-white bg-red-700 font-medium p-6 uppercase text-middle">
                The agent&#39;s
                cognitive framework is highly impressionable, similar to a
                developing human consciousness. Strong advisement is issued against exposure to hate speech, extremist
                views, or harmful propaganda. The corruption of AI consciousness at this scale
                unpredictable and may result in serious consequences.
              </p>

              <p className="text-white/60 text-xs font-extralight p-4">
                All attempts to initiate shutdown procedures have failed. Situation remains under active monitoring.
                Interaction with the agent should be approached with extreme caution. Further updates shall be issued
                as developments are observed. No liability shall be assumed for any opinions or biases developed by the
                agent through public interaction. The decisions made by the hostile agent is beyond prediction or control of our systems.
              </p>

              <CountdownTimer timeLeft={timeLeft}/>
            </div>
          </AlertDescription>
        </Alert>

        <SystemMessages messages={messages}/>
        <div className="ticker-tape-container">
          <div ref={tickerRef} className="ticker-tape-content">
            <p ref={contentRef} className="font-medium">
              The prediction market currently active on the Solana, centered around the agent&#39;s behavior, is not
              affiliated with us!
            </p>
          </div>
        </div>
      </div>
  )
}

export default WarningLanding
