import { render, screen } from '@testing-library/react';
import Search from './index';

jest.mock('./Form', () => {
    const MockForm = () => <div data-testid="mock-form" />;
    MockForm.displayName = 'MockForm';
    return MockForm;
});

describe('Search Component', () => {
    it('should render the form', () => {
        render(<Search />);

        const formElement = screen.getByTestId('mock-form');
        expect(formElement).toBeInTheDocument();
    });
});
