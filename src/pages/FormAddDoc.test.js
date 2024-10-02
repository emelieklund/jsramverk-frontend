import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FormAddDoc from './FormAddDoc.js';

beforeEach(() => {
    render(<FormAddDoc />);
});

afterEach(() => {
    cleanup();
});

test('expect label element "title-input" to be in document', () => {
    const labelElement = screen.getByLabelText(/title/i);

    expect(labelElement).toBeInTheDocument();
});

test('title variable gets value', async () => {
    const inputValue = "A nice title";
    const user = userEvent.setup();
    const inputNode = screen.getByLabelText(/title/i)

    await user.type(inputNode, inputValue);

    const title = screen.getByDisplayValue(inputValue);

    expect(title).toHaveValue(inputValue);
});

test('content variable gets value', async () => {
    const inputValue = "Some interesting content";
    const user = userEvent.setup();
    const inputNode = screen.getByLabelText(/content/i);

    await user.type(inputNode, inputValue);

    const content = screen.getByDisplayValue(inputValue);

    expect(content).toHaveValue(inputValue);
});
