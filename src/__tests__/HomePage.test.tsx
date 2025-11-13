import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from '../app/page'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('HomePage', () => {
    it('renderiza o input de busca e envia corretamente', () => {
        const push = jest.fn()
            ; (useRouter as jest.Mock).mockReturnValue({ push })

        render(<HomePage />)

        const input = screen.getByPlaceholderText(/buscar animais/i)
        const button = screen.getByText(/buscar/i)

        fireEvent.change(input, { target: { value: 'dog' } })
        fireEvent.click(button)

        expect(push).toHaveBeenCalledWith('/results?search=dog')
    })
})