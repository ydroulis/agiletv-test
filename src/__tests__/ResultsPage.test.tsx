import { render, screen } from '@testing-library/react'
import ResultsPage from '../app/results/page'

jest.mock('next/navigation', () => ({
    useSearchParams: () => ({
        get: () => 'cat',
    }),
}))

jest.mock('@/data/animals', () => ({
    getAnimals: jest.fn(),
}))

jest.mock('@/hooks/useSearch', () => ({
    useSearch: jest.fn(),
}))

import { useSearch } from '@/hooks/useSearch'

describe('ResultsPage', () => {
    it('mostra mensagem de carregando', () => {
        (useSearch as jest.Mock).mockReturnValue({
            results: [],
            loading: true,
            error: null,
            search: jest.fn(),
        })

        render(<ResultsPage />)
        expect(screen.getByText(/carregando/i)).toBeInTheDocument()
    })
})
