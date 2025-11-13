'use client'

import { useAnimalStore } from '@/store/useAnimalStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const { setIsShowingResults } = useAnimalStore()

  const router = useRouter()
  const [term, setTerm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/results?search=${term}`)
  }

  useEffect(() => {
    setIsShowingResults(false)
  }, [])

  return (
    <main className="container" style={{ padding: 32 }}>
      <header><h1>Animal Finder</h1></header>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Buscar animais..."
        />
        <button type="submit">Buscar</button>
      </form>

      <footer><small>© 2025 Animal Finder</small></footer>
    </main>
  )
}