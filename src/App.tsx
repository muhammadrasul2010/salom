import { useState, useEffect } from 'react'

function App() {
  const [greeting, setGreeting] = useState('Salom!')
  const [fadeIn, setFadeIn] = useState(false)
  const [time, setTime] = useState(new Date())

  const greetings = [
    { text: "Salom!", lang: "O'zbekcha" },
    { text: "Hello!", lang: "English" },
    { text: "Привет!", lang: "Русский" },
    { text: "مرحبا!", lang: "العربية" },
    { text: "你好!", lang: "中文" },
    { text: "Bonjour!", lang: "Français" },
    { text: "Hola!", lang: "Español" },
    { text: "こんにちは!", lang: "日本語" },
    { text: "Hallo!", lang: "Deutsch" },
    { text: "Ciao!", lang: "Italiano" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setFadeIn(true)
    const interval = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % greetings.length)
        setFadeIn(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setGreeting(greetings[currentIndex].text)
  }, [currentIndex])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getTimeOfDay = () => {
    const hour = time.getHours()
    if (hour < 6) return { text: "Xayrli tun", emoji: "🌙" }
    if (hour < 12) return { text: "Xayrli tong", emoji: "🌅" }
    if (hour < 18) return { text: "Xayrli kun", emoji: "☀️" }
    return { text: "Xayrli oqshom", emoji: "🌆" }
  }

  const timeOfDay = getTimeOfDay()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Time of day greeting */}
        <div className="mb-6 text-white/80 text-xl md:text-2xl font-light">
          {timeOfDay.emoji} {timeOfDay.text}
        </div>

        {/* Main greeting */}
        <h1
          className={`text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 transition-all duration-500 ${
            fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {greeting}
        </h1>

        {/* Language indicator */}
        <p className="text-white/60 text-lg md:text-xl mb-8 transition-all duration-500">
          {greetings[currentIndex].lang}
        </p>

        {/* Time display */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 max-w-md mx-auto shadow-2xl">
          <div className="text-white/90 text-3xl md:text-4xl font-mono font-bold mb-2">
            {time.toLocaleTimeString('uz-UZ', { hour12: false })}
          </div>
          <div className="text-white/60 text-sm">
            {time.toLocaleDateString('uz-UZ', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Welcome message */}
        <div className="mt-8 max-w-2xl mx-auto">
          <p className="text-white/70 text-lg md:text-xl leading-relaxed">
            Dunyo bo'ylab {greetings.length} tilda salomlashamiz. 
            Har bir salom — bu do'stlik boshlanishi! 🤝
          </p>
        </div>

        {/* Interactive buttons */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {greetings.map((g, i) => (
            <button
              key={i}
              onClick={() => {
                setFadeIn(false)
                setTimeout(() => {
                  setCurrentIndex(i)
                  setFadeIn(true)
                }, 300)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-white text-purple-900 shadow-lg shadow-white/20 scale-110'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:scale-105 border border-white/20'
              }`}
            >
              {g.text}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-white/40 text-sm">
        Made with ❤️ | {new Date().getFullYear()}
      </div>
    </div>
  )
}

export default App
