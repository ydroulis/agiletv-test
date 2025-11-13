import { useState } from 'react'
import { getAnimals } from '@/data/animals'
import { Animal } from '@/types/animal'

export const useSearch = () => {
    const [results, setResults] = useState<Animal[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const search = async (term: string) => {
        setLoading(true)
        setError(null)
        try {
            const animals = await getAnimals()
            if (!term) {
                setError('Digite um termo para buscar.')
                setResults([])
                return []
            }

            const filtered = animals.filter(
                (a) =>
                    a.title.toLowerCase().includes(term.toLowerCase()) ||
                    a.type.toLowerCase().includes(term.toLowerCase())
            )

            if (filtered.length === 0) {
                setError('Nenhum resultado encontrado.')
            }

            setResults(filtered)
            return filtered
        } finally {
            setLoading(false)
        }
    }

    return { results, loading, error, search }
}
