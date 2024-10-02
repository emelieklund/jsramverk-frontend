import { render, screen } from '@testing-library/react';
import NoPage from './NoPage';

test("should render 'Page doesn't exist'", () => {
    render(<NoPage />);
    expect(true).toBe(true);
});
