import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchSection from './index';

jest.mock('next/image', () => {
    const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img {...props} />
    );
    MockImage.displayName = 'MockNextImage';
    return MockImage;
});

jest.mock('../Search', () => {
    const MockSearch = () => <div data-testid="mock-search" />;
    MockSearch.displayName = 'MockSearch';
    return MockSearch;
});

const mockSetAnimals = jest.fn();
jest.mock('@/store/useAnimalStore', () => ({
    useAnimalStore: () => ({
        setAnimals: mockSetAnimals,
    }),
}));

const mockSetTerm = jest.fn();
jest.mock('@/store/useSearchStore', () => ({
    useSearchStore: () => ({
        setTerm: mockSetTerm,
    }),
}));

describe('SearchSection Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the component', () => {
        render(<SearchSection />);

        expect(mockSetAnimals).toHaveBeenCalledTimes(1);
        expect(mockSetAnimals).toHaveBeenCalledWith([]);

        expect(mockSetTerm).toHaveBeenCalledTimes(1);
        expect(mockSetTerm).toHaveBeenCalledWith('');
    });

    it('should render the logo', () => {
        render(<SearchSection />);

        const logo = screen.getByAltText('Google logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/logo.png');
    });

    it('should render the search', () => {
        render(<SearchSection />);

        const search = screen.getByTestId('mock-search');
        expect(search).toBeInTheDocument();
    });

    it('should render the section', () => {
        render(<SearchSection />);

        const section = screen.getByRole('region');
        expect(section).toHaveAttribute('aria-labelledby', 'search-section-title');
    });
});
