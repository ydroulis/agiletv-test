import { useState } from 'react'
import { getAnimals } from '@/data/animals'
import { useAnimalStore } from '@/store/useAnimalStore'

export const useSearch = () => {
    const { setAnimals } = useAnimalStore()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<{ status: 'empty' | 'invalid' | null; message: string | null } | null>({
        status: null,
        message: null,
    })

    const search = async (term: string) => {
        setLoading(true)
        setError(null)
        try {
            const animals = await getAnimals()
            if (!term) {
                setError({
                    status: 'empty',
                    message: 'Try looking for something.',
                })
                setAnimals([])
                return []
            }

            const filtered = animals.filter(
                (a) =>
                    a.title.toLowerCase().includes(term.toLowerCase()) ||
                    a.type.toLowerCase().includes(term.toLowerCase())
            )

            if (filtered.length === 0) {
                setError({
                    status: 'invalid',
                    message: 'Try looking for something else.',
                })
            }

            setAnimals(filtered)
            return filtered
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, search }
}
