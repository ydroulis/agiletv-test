import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsPage from '../app/results/page';

jest.mock('@/components/ResultsSection', () => {
    const MockResultsSection = () => (
        <div data-testid="results-section">Mock Results Section</div>
    );
    MockResultsSection.displayName = 'MockResultsSection';
    return MockResultsSection;
});

describe('ResultsPage', () => {
    it('should render the main element', () => {
        render(<ResultsPage />);

        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
    });

    it('should render the ResultsSection', () => {
        render(<ResultsPage />);

        const results = screen.getByTestId('results-section');
        expect(results).toBeInTheDocument();
    });
});
