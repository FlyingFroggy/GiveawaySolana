import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [countdown, setCountdown] = useState(900) // 15 min
  const [pot, setPot] = useState(1.23) // starting pot (fake for now)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => (prev <= 0 ? 900 : prev - 1))
      setPot(prev => +(prev + 0.001).toFixed(3)) // simulate growth
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec < 10 ? '0' : ''}${sec}`
  }

  const copyCA = () => {
    navigator.clipboard.writeText("YOUR_CONTRACT_ADDRESS_HERE")
  }

  return (
    <>
      <Head>
        <title>Giveaway Coin ($GIVE)</title>
      </Head>
      <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12 font-sans">
        <h1 className="text-4xl font-bold mb-2">🚀 Giveaway Coin ($GIVE)</h1>
        <p className="text-lg mb-6 text-gray-400">Win free SOL every 15 minutes. Just hold.</p>

        <div className="flex items-center space-x-2 mb-6">
          <code className="bg-gray-800 px-4 py-2 rounded text-sm">
            YOUR_CONTRACT_ADDRESS_HERE
          </code>
          <button onClick={copyCA} className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm">
            Copy
          </button>
        </div>

        <div className="text-xl mb-2">Next Giveaway In:</div>
        <div className="text-4xl font-mono mb-4">{formatTime(countdown)}</div>

        <div className="text-lg">Current Pot:</div>
        <div className="text-3xl font-bold mb-6">{pot} ◎</div>

        <div className="w-full max-w-2xl text-left mb-12">
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Hold at least <strong>100,000 $GIVE</strong> in your wallet</li>
            <li>Every 15 minutes, 1 random wallet gets the pot</li>
            <li>Pot is funded by 4% transaction tax</li>
            <li>All draws are logged below for full transparency</li>
          </ul>
        </div>

        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-2">🧾 Recent Winners</h2>
          <ul className="text-sm text-gray-400 font-mono space-y-1">
            <li>Draw #4 – Winner: 4f8a...k91Z – 0.48 ◎</li>
            <li>Draw #3 – Winner: 9bc2...Xz0p – 0.37 ◎</li>
            <li>Draw #2 – Winner: 1ae9...pQnM – 0.42 ◎</li>
            <li>Draw #1 – Winner: 7c0d...LmQ4 – 0.39 ◎</li>
          </ul>
        </div>

        <footer className="mt-16 text-sm text-gray-600">
          <p>🔗 <a href="https://twitter.com/GiveSolAway" className="underline" target="_blank">Follow on X</a></p>
          <p className="mt-1">🌐 giveitaway.online</p>
        </footer>
      </main>
    </>
  )
}
