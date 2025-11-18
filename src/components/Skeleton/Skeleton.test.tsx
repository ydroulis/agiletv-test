import { render, screen } from '@testing-library/react';
import Skeleton from './index';

describe('Skeleton Component', () => {
    it('should render 1 skeleton', () => {
        render(<Skeleton />);

        const items = screen.getAllByRole('status');
        expect(items).toHaveLength(1);
    });

    it('should render 3 skeletons', () => {
        render(<Skeleton count={3} />);

        const items = screen.getAllByRole('status');
        expect(items).toHaveLength(3);
    });

    it('should render 0 skeletons', () => {
        render(<Skeleton count={0} />);

        const items = screen.getAllByRole('status');
        expect(items).toHaveLength(1);
    });

    it('should have aria-busy and aria-label', () => {
        render(<Skeleton count={2} />);

        const items = screen.getAllByRole('status');

        items.forEach((item) => {
            expect(item).toHaveAttribute('aria-busy', 'true');
            expect(item).toHaveAttribute('aria-label', 'Loading content');
        });
    });
});
