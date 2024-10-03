import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import Doc from './Doc';

afterEach(() => {
    cleanup();
});

test('expect label element "title" to be in document', () => {
    render(<Doc />);

    const labelElement = screen.getByLabelText(/title/i);

    expect(labelElement).toBeInTheDocument();
});

test('title field is empty after update since no element is fetched', async () => {
    render(<Doc />);

    const inputValue = "An updated title";
    const user = userEvent.setup();
    const inputNode = screen.getByLabelText(/title/i)

    await act(async () => {
        await user.type(inputNode, inputValue);
    })

    const title = screen.getByTestId("title-input");

    expect(title).toHaveTextContent("");
});
