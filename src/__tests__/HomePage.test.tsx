import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';

jest.mock('@/components/SearchSection', () => {
    const MockSearchSection = () => <div data-testid="search-section">Search Section</div>;
    MockSearchSection.displayName = 'MockSearchSection';
    return MockSearchSection;
});

describe('HomePage', () => {
    it('should render the main element', () => {
        render(<HomePage />);

        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
    });

    it('should render the SearchSection', () => {
        render(<HomePage />);

        const section = screen.getByTestId('search-section');
        expect(section).toBeInTheDocument();
    });
});
