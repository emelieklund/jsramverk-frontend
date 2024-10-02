import { render, screen } from '@testing-library/react';
import NoPage from './NoPage';

test("should render 'Page doesn't exist'", () => {
    render(<NoPage />);
    const pElement = screen.getByText(/Site doesn't exist/i);

    expect(pElement).toBeInTheDocument();
});
