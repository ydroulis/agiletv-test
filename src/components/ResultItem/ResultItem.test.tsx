import { render, screen, fireEvent } from '@testing-library/react';
import ResultItem from './index';
import { useAnimalStore } from '@/store/useAnimalStore';

jest.mock('@/store/useAnimalStore', () => ({
    useAnimalStore: jest.fn(),
}));

describe('ResultItem Component', () => {
    const mockSelectAnimal = jest.fn();
    const mockSetIsShowingPreview = jest.fn();
    const mockSetRemoveScrolled = jest.fn();

    const mockAnimal = {
        id: 1,
        type: 'lion',
        title: 'Lion',
        description: 'The king of the jungle',
        url: 'https://example.com',
        image: 'https://example.com/image.jpg',
    };

    beforeEach(() => {
        (useAnimalStore as unknown as jest.Mock).mockReturnValue({
            selectAnimal: mockSelectAnimal,
        });

        jest.clearAllMocks();
    });

    const setup = () => {
        return render(
            <ResultItem
                data={mockAnimal}
                setIsShowingPreview={mockSetIsShowingPreview}
                setRemoveScrolled={mockSetRemoveScrolled}
            />
        );
    };

    it('should render', () => {
        setup();

        expect(screen.getByText(mockAnimal.title)).toBeInTheDocument();
        expect(screen.getByText(mockAnimal.url)).toBeInTheDocument();
        expect(screen.getByText(mockAnimal.description)).toBeInTheDocument();
    });

    it('should call selectAnimal', () => {
        setup();

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockSelectAnimal).toHaveBeenCalledWith(mockAnimal);
        expect(mockSetIsShowingPreview).toHaveBeenCalledWith(true);
    });

    it('should call setRemoveScrolled', () => {
        Object.defineProperty(window, 'innerWidth', {
            value: 1300,
            writable: true,
        });

        document.body.scrollTop = 20;

        setup();
        fireEvent.click(screen.getByRole('button'));

        expect(mockSetRemoveScrolled).toHaveBeenCalledWith(false);
    });

    it('should not call setRemoveScrolled in mobile', () => {
        Object.defineProperty(window, 'innerWidth', {
            value: 500,
            writable: true,
        });

        setup();
        fireEvent.click(screen.getByRole('button'));

        expect(mockSetRemoveScrolled).not.toHaveBeenCalled();
    });
});
