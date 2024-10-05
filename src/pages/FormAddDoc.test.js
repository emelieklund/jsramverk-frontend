import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react';
import FormAddDoc from './FormAddDoc.js';

afterEach(() => {
    cleanup();
});

test('expect label element "title" to be in document', () => {
    render(<FormAddDoc />);

    const labelElement = screen.getByLabelText(/title/i);

    expect(labelElement).toBeInTheDocument();
});

test('title variable gets value', async () => {
    render(<FormAddDoc />);

    const inputValue = "A nice title";
    const user = userEvent.setup();
    const inputNode = screen.getByLabelText(/title/i)

    await act(async () => {
        await user.type(inputNode, inputValue);
    })
    const title = screen.getByDisplayValue(inputValue);

    expect(title).toHaveValue(inputValue);
});

test('content variable gets value', async () => {
    render(<FormAddDoc />);

    const inputValue = "Some interesting content";
    const user = userEvent.setup();
    const inputNode = screen.getByLabelText(/content/i);

    await act(async () => {
        await user.type(inputNode, inputValue);
    })

    const content = screen.getByDisplayValue(inputValue);

    expect(content).toHaveValue(inputValue);
});
