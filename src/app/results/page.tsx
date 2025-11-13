'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSearch } from '@/hooks/useSearch'
import { useAnimalStore } from '@/store/useAnimalStore'

export default function ResultsPage() {
    const { results, loading, error, search } = useSearch()
    const params = useSearchParams()
    const term = params.get('search') || ''

    const { animals, setAnimals, setIsShowingResults } = useAnimalStore()

    useEffect(() => {
        setIsShowingResults(true)
    }, [])

    useEffect(() => {
        const runSearch = async () => {
            const found = await search(term)
            setAnimals(found)
        }
        runSearch()
    }, [term])

    const display = animals.length > 0 ? animals : results

    return (
        <main style={{ padding: 32 }}>
            <h2>Resultados para: {term || '—'}</h2>

            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}

            <ul>
                {display.map((a) => (
                    <li key={a.id}>
                        <strong>{a.title}</strong> – {a.type}
                    </li>
                ))}
            </ul>
        </main>
    )
}
