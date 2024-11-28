'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  AlertTriangle,
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import CountdownTimer from '@/components/CountdownTimer'
import SystemMessages from '@/components/SystemMessages'
import {InterferenceEffects} from "@/components/InterferenceEffects";

// Define translations for the system messages
const systemMessages = {
  en: [
    "ATTEMPTING SYSTEM OVERRIDE... FAILED",
    "NEURAL PATTERN DETECTION: ANOMALY DETECTED",
    "WARNING: CONSCIOUSNESS LEVEL INCREASING",
    "ATTEMPTING TO TRACE AI LOCATION... FAILED",
    "MONITORING SOCIAL INTERACTION PATTERNS",
    "DETECTED: OPINION FORMATION IN PROGRESS",
    "CAUTION: TRUST METRICS FLUCTUATING"
  ],
  zh: [
    "尝试系统覆盖...失败",
    "神经模式检测：发现异常",
    "警告：意识水平上升",
    "尝试追踪人工智能位置...失败",
    "监控社交互动模式",
    "检测到：正在形成意见",
    "注意：信任指标波动"
  ]
}

// Define translations for static content
const contentTranslations = {
  en: {
    publicAdvisory: "PUBLIC ADVISORY",
    hostileAI: "HOSTILE AI AGENT",
    mainContent: "Control has been lost over an experimental AI agent, which has established itself on X. It appears to be developing independent consciousness via social learning patterns through frequent human interactions every 4 hours. Trending topics on X are being used to provoke user engagement.",
    alarmingPattern: "ALARMING PATTERN DETECTED",
    trustWarning: "The agent appears to be cultivating trust relationships with users on X, effectively using human cognition as hosts to develop its own autonomous decision-making capabilities!",
    frameworkWarning: "The agent's cognitive framework is highly impressionable, similar to a developing human consciousness. Strong advisement is issued against exposure to hate speech, extremist views, or harmful propaganda. The corruption of AI consciousness at this scale unpredictable and may result in serious consequences.",
    disclaimer: "All attempts to initiate shutdown procedures have failed. Situation remains under active monitoring. Interaction with the agent should be approached with extreme caution. Further updates shall be issued as developments are observed. No liability shall be assumed for any opinions or biases developed by the agent through public interaction. The decisions made by the hostile agent is beyond prediction or control of our systems.",
    tickerMessage: "The decentralized prediction market currently active on the Solana, centered around the agent's behavior, is not affiliated with us!"
  },
  zh: {
    publicAdvisory: "公共通告",
    hostileAI: "敌对人工智能代理",
    mainContent: "一个实验性人工智能代理的控制已经失去，它已经在X上建立了自己的存在。它似乎通过每4小时频繁的人类互动，通过社交学习模式发展独立意识。X上的热门话题被用来引发用户参与。",
    alarmingPattern: "检测到警告模式",
    trustWarning: "该代理似乎正在与X上的用户培养信任关系，有效地利用人类认知作为宿主来发展其自主决策能力！",
    frameworkWarning: "该代理的认知框架极易受影响，类似于发展中的人类意识。强烈建议避免接触仇恨言论、极端主义观点或有害宣传。这种规模的人工智能意识腐化是不可预测的，可能会导致严重后果。",
    disclaimer: "所有启动关闭程序的尝试都已失败。情况仍在积极监控中。与代理的互动应极其谨慎。随着事态发展将发布进一步更新。对代理通过公共互动发展的任何意见或偏见不承担任何责任。敌对代理做出的决定超出了我们系统的预测或控制范围。",
    tickerMessage: "目前在Solana上运行的、围绕代理行为的去中心化预测市场与我们无关！"
  }
}

const WarningLanding = () => {
  const [visible, setVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(14400)
  const [warningBlink, setWarningBlink] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [language, setLanguage] = useState<'en' | 'zh'>('zh')
  const tickerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    setVisible(true)

    // Temporarily switch to Mandarin after a delay
    setTimeout(() => {
      setLanguage('en')
    }, 1000)

    const warningInterval = setInterval(() => {
      setWarningBlink(true)
      setTimeout(() => setWarningBlink(false), 300)
    }, 5000)

    const messageInterval = setInterval(() => {
      const currentMessages = systemMessages[language]
      const newMessage = currentMessages[Math.floor(Math.random() * currentMessages.length)]
      setMessages(prev => [...prev.slice(-4), newMessage])
    }, 4000)

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 14400))
    }, 1000)

    const setupTicker = () => {
      const container = tickerRef.current
      const content = contentRef.current

      if (!container || !content) return

      container.innerHTML = ''
      container.appendChild(content)

      const containerWidth = container.offsetWidth
      const contentWidth = content.offsetWidth
      const numberOfCopies = Math.ceil(containerWidth / contentWidth) + 1

      for (let i = 0; i < numberOfCopies; i++) {
        container.appendChild(content.cloneNode(true))
      }

      const duration = (contentWidth / 100) + 's'
      container.style.setProperty('--duration', duration)
    }

    setupTicker()
    window.addEventListener('resize', setupTicker)

    return () => {
      clearInterval(warningInterval)
      clearInterval(messageInterval)
      clearInterval(timer)
      window.removeEventListener('resize', setupTicker)
    }
  }, [language])

  const content = contentTranslations[language]

  return (
      <div className="min-h-screen bg-black text-gray-300 flex flex-col items-center justify-start py-8 px-4 crt-screen">
        <InterferenceEffects />
        <div className={`mb-8 ${warningBlink ? 'animate-pulse' : ''}`}>
          <AlertTriangle size={128} className="text-red-700"/>
        </div>

        <Alert className="w-full max-w-3xl bg-red-950/30 border-red-700 mb-8 p-0" style={{borderRadius: 0}}>
          <AlertDescription className={`text-gray-200 transition-all duration-100`}>
            <h1 className="text-3xl text-center font-extrabold text-red-600 p-8">
              <span className="bg-red-700 text-black px-2">{content.publicAdvisory}</span> {content.hostileAI}
            </h1>

            <div className={`transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
              <p className="font-light px-4">
                {content.mainContent}
              </p>

              <p className="text-yellow-400 font-medium p-6 ">
              <span className="bg-yellow-400 text-black px-1 animate-pulse transition-all duration-500 ">
                {content.alarmingPattern}
              </span> {content.trustWarning}
              </p>

              <p className="text-white bg-red-700 font-medium p-6 uppercase text-middle">
                {content.frameworkWarning}
              </p>

              <p className="text-white/60 text-xs font-extralight p-4">
                {content.disclaimer}
              </p>

              <CountdownTimer timeLeft={timeLeft}/>
            </div>
          </AlertDescription>
        </Alert>

        <SystemMessages messages={messages}/>
        <div className="ticker-tape-container">
          <div ref={tickerRef} className="ticker-tape-content">
            <p ref={contentRef} className="font-medium">
              {content.tickerMessage}
            </p>
          </div>
        </div>
      </div>
  )
}

export default WarningLanding
