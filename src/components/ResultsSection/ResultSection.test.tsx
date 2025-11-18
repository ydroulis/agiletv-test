import { render, screen, waitFor } from '@testing-library/react';
import ResultsSection from './index';
import { useAnimalStore } from '@/store/useAnimalStore';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';

jest.mock('@/store/useAnimalStore', () => ({
    useAnimalStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

jest.mock('@/hooks/useSearch', () => ({
    useSearch: jest.fn(),
}));

jest.mock('../Skeleton', () => {
    const MockSkeleton = () => <div data-testid="skeleton">Loading...</div>;
    MockSkeleton.displayName = "MockSkeleton";
    return MockSkeleton;
});

jest.mock('../ResultItem', () => {
    const MockResultItem = () => <div data-testid="result-item">Item</div>;
    MockResultItem.displayName = "MockResultItem";
    return MockResultItem;
});

jest.mock('../Preview', () => {
    const MockPreview = () => <div data-testid="preview">Preview</div>;
    MockPreview.displayName = "MockPreview";
    return MockPreview;
});

describe('ResultsSection Component', () => {
    const mockSetAnimals = jest.fn();
    const mockSetIsShowingResults = jest.fn();

    const mockAnimals = [
        { id: 1, title: 'Lion', url: 'https://x.com', description: 'desc' },
        { id: 2, title: 'Tiger', url: 'https://y.com', description: 'desc' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();

        (useAnimalStore as unknown as jest.Mock).mockReturnValue({
            animals: mockAnimals,
            setAnimals: mockSetAnimals,
            setIsShowingResults: mockSetIsShowingResults,
        });

        (useSearchParams as unknown as jest.Mock).mockReturnValue({
            get: () => 'lion',
        });
    });

    it('should render Skeleton when loading', () => {
        (useSearch as unknown as jest.Mock).mockReturnValue({
            loading: true,
            error: null,
            search: jest.fn(),
        });

        render(<ResultsSection />);

        expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('should render "Try looking for" when invalid error', () => {
        (useSearch as unknown as jest.Mock).mockReturnValue({
            loading: false,
            error: { status: 'empty' },
            search: jest.fn(),
        });

        render(<ResultsSection />);

        expect(
            screen.getByText(/Try looking for/i)
        ).toBeInTheDocument();
    });

    it('should render "No results for" when empty error', () => {
        (useSearch as unknown as jest.Mock).mockReturnValue({
            loading: false,
            error: { status: 'invalid' },
            search: jest.fn(),
        });

        render(<ResultsSection />);

        expect(
            screen.getByText(/No results for/i)
        ).toBeInTheDocument();
    });

    it('should render ResultItem', () => {
        (useSearch as unknown as jest.Mock).mockReturnValue({
            loading: false,
            error: null,
            search: jest.fn(),
        });

        render(<ResultsSection />);

        expect(screen.getAllByTestId('result-item')).toHaveLength(2);
    });

    it('should call useSearch', async () => {
        const mockSearch = jest.fn().mockResolvedValue(mockAnimals);

        (useSearch as unknown as jest.Mock).mockReturnValue({
            loading: false,
            error: null,
            search: mockSearch,
        });

        render(<ResultsSection />);

        await waitFor(() => {
            expect(mockSearch).toHaveBeenCalledWith('lion');
            expect(mockSetAnimals).toHaveBeenCalledWith(mockAnimals);
        });
    });

    it('should render Preview', () => {
        (useSearch as unknown as jest.Mock).mockReturnValue({
            loading: false,
            error: null,
            search: jest.fn(),
        });

        render(<ResultsSection />);

        expect(screen.queryByTestId('preview')).not.toBeInTheDocument();
    });
});
