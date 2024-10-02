import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react';
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

    await act(async () => {
        await user.type(inputNode, inputValue);
    })
    const title = screen.getByDisplayValue(inputValue);

    expect(title).toHaveValue(inputValue);
});

test('content variable gets value', async () => {
    const inputValue = "Some interesting content";
    const user = userEvent.setup();
    const inputNode = screen.getByLabelText(/content/i);

    await act(async () => {
        await user.type(inputNode, inputValue);
    })

    const content = screen.getByDisplayValue(inputValue);

    expect(content).toHaveValue(inputValue);
});

test('content variable gets value', async () => {
    const titleValue = "A nice title";
    const contentValue = "Some interesting content";
    const user = userEvent.setup();
    const inputTitle = screen.getByLabelText(/title/i)
    const inputContent = screen.getByLabelText(/content/i);
    const submitButton = screen.getByDisplayValue(/submit/i);

    await act(async () => {
        await user.type(inputTitle, titleValue);
        await user.type(inputContent, contentValue);

        await user.click(submitButton);
    })

    const content = screen.getByDisplayValue(contentValue);

    expect(content).toHaveTextContent("");
});
