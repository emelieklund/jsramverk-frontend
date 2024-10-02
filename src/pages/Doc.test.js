import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Doc from './Doc';

beforeEach(() => {
    render(<Doc />);
});

afterEach(() => {
    cleanup();
});

test('expect label element "title-input" to be in document', () => {
    const labelElement = screen.getByLabelText(/title/i);

    expect(labelElement).toBeInTheDocument();
});
